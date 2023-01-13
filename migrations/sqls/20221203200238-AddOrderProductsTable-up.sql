CREATE TABLE orderproducts (
    id serial,
    order_id int not null REFERENCES orders (id) ON UPDATE CASCADE ON DELETE CASCADE,
    product_id int not null REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id)
);