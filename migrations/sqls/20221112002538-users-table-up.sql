CREATE TABLE users (
    id serial NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    username VARCHAR(100),
    password varchar(255) NOT NULL,
    PRIMARY KEY(id)
);