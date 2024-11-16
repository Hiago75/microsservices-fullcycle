package handler

import (
	"fmt"
	"sync"

	"github.com.br/hiago75/fc-ms-wallet/pkg/events"
	"github.com.br/hiago75/fc-ms-wallet/pkg/kafka"
)

type BalanceUpdateKafkaHandler struct {
	Kafka *kafka.Producer
}

func NewBalanceUpdateKafkaHandler(kafka *kafka.Producer) *BalanceUpdateKafkaHandler {
	return &BalanceUpdateKafkaHandler{
		Kafka: kafka,
	}
}

func (h *BalanceUpdateKafkaHandler) Handle(msg events.EventInterface, wg *sync.WaitGroup) {
	defer wg.Done()

	h.Kafka.Publish(msg, nil, "balances")
	fmt.Println("Update Balance Kafka Handler: ", msg.GetPayload())
}
