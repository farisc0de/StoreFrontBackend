CREATE TABLE users (
    id serial NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    username VARCHAR(100),
    password varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO users (
    'faris',
    'mohammed',
    '$2a$12$9g5Z7JTppRhzVPZI3NzDAeF4CJD42rO/gz9CmBjuUmADFmN0X.dMe'
)