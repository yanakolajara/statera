DROP DATABASE IF EXISTS statera;
CREATE DATABASE statera;

\c statera;

-- Drop tables if they already exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS pending_users;

-- Create the `users` table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL, 
    gender TEXT,
    email TEXT UNIQUE NOT NULL, 
    phone TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

-- Create the `transactions` table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create the `pending_users` table
CREATE TABLE pending_users (
    temp_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    hashed_password TEXT NOT NULL,
    verification_code VARCHAR(6) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL, 
    gender TEXT, 
    phone TEXT UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL
);