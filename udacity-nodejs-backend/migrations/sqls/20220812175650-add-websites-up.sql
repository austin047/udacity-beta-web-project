CREATE TABLE websites (
    id SERIAL PRIMARY KEY,
    created_by bigint REFERENCES users(id) NOT NULL,
    name VARCHAR,
    category VARCHAR,
    description text,
    url VARCHAR UNIQUE ,
    created_at date DEFAULT (now())
);
