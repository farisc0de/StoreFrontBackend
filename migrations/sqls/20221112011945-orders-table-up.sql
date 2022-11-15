CREATE TABLE orders (
    id serial NOT NULL,
    prod_id varchar(255) NOT NULL,
    quantity int NOT NULL,
    user_id int NOT NULL,
    status varchar(255) NOT NULL,
    PRIMARY KEY(id)
);
