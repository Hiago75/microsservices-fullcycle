package main

import (
	"context"
	"database/sql"
	"fmt"

	"github.com.br/hiago75/fc-ms-wallet/internal/database"
	"github.com.br/hiago75/fc-ms-wallet/internal/event"
	"github.com.br/hiago75/fc-ms-wallet/internal/event/handler"
	"github.com.br/hiago75/fc-ms-wallet/internal/usecase/create_account"
	"github.com.br/hiago75/fc-ms-wallet/internal/usecase/create_client"
	"github.com.br/hiago75/fc-ms-wallet/internal/usecase/create_transaction"
	"github.com.br/hiago75/fc-ms-wallet/internal/web"
	"github.com.br/hiago75/fc-ms-wallet/internal/web/webserver"
	"github.com.br/hiago75/fc-ms-wallet/pkg/events"
	"github.com.br/hiago75/fc-ms-wallet/pkg/kafka"
	"github.com.br/hiago75/fc-ms-wallet/pkg/uow"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", "root", "root", "mysql-wallet", "3306", "wallet"))

	if err != nil {
		panic(err)
	}

	defer db.Close()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "wallet",
	}

	kafkaProducer := kafka.NewKafkaProducer(&configMap)

	eventDispatcher := events.NewEventDispatcher()
	eventDispatcher.Register("TransactionCreated", &handler.TransactionCreatedKafkaHandler{Kafka: kafkaProducer})
	eventDispatcher.Register("BalanceUpdated", &handler.BalanceUpdateKafkaHandler{Kafka: kafkaProducer})
	transactionCreatedEvent := event.NewTransactionCreated()
	balanceUpdatedEvent := event.NewBalanceUpdated()

	clientDb := database.NewClientDB(db)
	accountDb := database.NewAccountDB(db)

	ctx := context.Background()
	uow := uow.NewUow(ctx, db)

	uow.Register("AccountDB", func(tx *sql.Tx) interface{} {
		return database.NewAccountDB(db)
	})

	uow.Register("TransactionDB", func(tx *sql.Tx) interface{} {
		return database.NewTransactionDB(db)
	})

	createClientUseCase := create_client.NewCreateClientUseCase(clientDb)
	createAccountUseCase := create_account.NewCreateAccountUseCase(accountDb, clientDb)
	createTransactionUseCase := create_transaction.NewCreateTransactionUsecase(uow, eventDispatcher, transactionCreatedEvent, balanceUpdatedEvent)

	webserver := webserver.NewWebServer(":8080")

	clientHandler := web.NewWebClientHandler(*createClientUseCase)
	accountHandler := web.NewWebAccountHandler(*createAccountUseCase)
	transactionHandler := web.NewWebTransactionHandler(*createTransactionUseCase)

	webserver.AddHandler("/clients", clientHandler.CreateClient)
	webserver.AddHandler("/accounts", accountHandler.CreateAccount)
	webserver.AddHandler("/transactions", transactionHandler.CreateTransaction)

	fmt.Println("Wallet core server running")
	webserver.Start()
}
