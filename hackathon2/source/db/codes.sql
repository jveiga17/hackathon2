-- just a file that holds the code used in pgadmin4

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  hashed_password VARCHAR(60) NOT NULL
);
