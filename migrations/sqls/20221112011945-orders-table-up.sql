CREATE TABLE orders (
    id serial,
    prod_id varchar(255),
    quantity int,
    user_id int,
    status varchar(255),
    PRIMARY KEY(id)
);
