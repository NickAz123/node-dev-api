--SCHEMA

--users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

--USER TABLE INSERTS
INSERT INTO users (first_name, last_name, user_name, password, email, is_deleted) VALUES
('Jane', 'Foster', 'jdfoster', '', 'jane.foster@example.com', false),
('Richard', 'Miller', 'richardm19', '', 'richard.miller@example.com', true),
('Barrys', 'Bonds', 'thebarrybb88', '', 'barrys.bonds@example.com', false),
('Harold', 'Foster', 'hryfoster', '', 'harold.foster@example.com', false);