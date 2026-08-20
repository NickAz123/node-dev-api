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
('Jane', 'Foster', 'jdfoster', '$2b$10$Q9XJ4wU5z0YT9Vus5KIt6u7FPq57wkUPhvQEEkr2CzqjUd1voVina', 'jane.foster@example.com', false),
('Richard', 'Miller', 'richardm19', '$2a$10$8dPgQuB2vgqH4/UZqO/6k.DzN4v88t1yDjRAAlzFL5Gu0kd9k1CeG', 'richard.miller@example.com', true),
('Barrys', 'Bonds', 'thebarrybb88', '$2a$10$.h0zC6Sq8qISpkC5YFRWwexc/iKg90sJdMH6zyGhR0EDsaANlfg6.', 'barrys.bonds@example.com', false),
('Harold', 'Foster', 'hryfoster', '$2a$10$BOHxAKy.VQ37SQxp86cEBOJOiZLjYRyZ3Avgbxi4yPEYkgxfKFPDS', 'harold.foster@example.com', false);