-- table with accounts with primary key
-- table with users/pw with foreign key

--------------------------------------------------------
DROP DATABASE IF EXISTS accounts_db;
CREATE DATABASE accounts_db;

USE accounts_db;

CREATE TABLE accounts(
    id INTEGER AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    account_name VARCHAR(100),
    interest DECIMAL,
    term_months INTEGER,
    active BOOLEAN NOT NULL
);