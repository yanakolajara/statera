DROP DATABASE IF EXISTS statera;
CREATE DATABASE statera;

\c statera;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS transactions;

CREATE TABLE users(
    id TEXT PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL, 
    gender TEXT,
    email TEXT UNIQUE, 
    phone TEXT UNIQUE
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    date TIMESTAMP NOT NULL
);