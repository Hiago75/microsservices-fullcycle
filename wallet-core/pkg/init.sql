USE wallet;

cCREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at DATE
);

CREATE TABLE IF NOT EXISTS accounts (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255),
    balance DECIMAL(10,2),
    created_at DATE,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(255) PRIMARY KEY,
    account_id_from VARCHAR(255),
    account_id_to VARCHAR(255),
    amount DECIMAL(10,2),
    created_at DATE,
    FOREIGN KEY (account_id_from) REFERENCES accounts(id),
    FOREIGN KEY (account_id_to) REFERENCES accounts(id)
);

INSERT INTO clients (id, name, email, created_at) VALUES 
('client1', 'John Doe', 'john@email.com', CURRENT_DATE),
('client2', 'Jane Doe', 'jane@email.com', CURRENT_DATE);

INSERT INTO accounts (id, client_id, balance, created_at) VALUES 
('account1', 'client1', 1000.00, CURRENT_DATE),
('account2', 'client2', 500.00, CURRENT_DATE);