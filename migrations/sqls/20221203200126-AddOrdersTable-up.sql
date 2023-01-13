CREATE TABLE orders (
    id serial,
    user_id int,
    status varchar(255),
    PRIMARY KEY(id)
);