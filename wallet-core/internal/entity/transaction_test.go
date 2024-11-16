package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("John Doe", "john.doe@example.com")
	account1 := NewAccount(client1)

	client2, _ := NewClient("Jane Doe", "jane.doe@example.com")
	account2 := NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 10)

	assert.Nil(t, err)
	assert.NotNil(t, transaction)
	assert.NotEmpty(t, transaction.ID)
	assert.Equal(t, 90.0, account1.Balance)
	assert.Equal(t, 110.0, account2.Balance)
}

func TestCreateTransactionWithInsuficientBalance(t *testing.T) {
	client1, _ := NewClient("John Doe", "john.doe@example.com")
	account1 := NewAccount(client1)

	client2, _ := NewClient("Jane Doe", "jane.doe@example.com")
	account2 := NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 200)

	assert.NotNil(t, err)
	assert.Error(t, err, "insufficient balance")
	assert.Nil(t, transaction)
	assert.Equal(t, 100.0, account1.Balance)
	assert.Equal(t, 100.0, account2.Balance)
}
