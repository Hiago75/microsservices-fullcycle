package database

import (
	"database/sql"
	"testing"

	"github.com.br/hiago75/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/suite"

	_ "github.com/mattn/go-sqlite3"
)

type ClientDbTestSuite struct {
	suite.Suite
	db       *sql.DB
	clientDb *ClientDB
}

func (s *ClientDbTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)

	s.db = db

	db.Exec("create table clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	s.clientDb = NewClientDB(db)
}

func (s *ClientDbTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE clients")
}

func TestClientDBTestSuite(t *testing.T) {
	suite.Run(t, new(ClientDbTestSuite))
}

func (s *ClientDbTestSuite) TestSave() {
	client := &entity.Client{
		ID:    "1",
		Name:  "Test",
		Email: "test@test.com",
	}

	err := s.clientDb.Save(client)

	s.Nil(err)
}

func (s *ClientDbTestSuite) TestGet() {
	client, _ := entity.NewClient("John Doe", "john.doe@example.com")
	s.clientDb.Save(client)

	savedClient, err := s.clientDb.Get(client.ID)

	s.Nil(err)
	s.Equal(client.ID, savedClient.ID)
	s.Equal(client.Name, savedClient.Name)
	s.Equal(client.Email, savedClient.Email)
}
