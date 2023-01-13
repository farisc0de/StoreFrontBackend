# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `/products` (GET)
- Show `/produt/:id` (GET)
- Create [token required] `/produts` (POST)
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category) `/products/:category_id` (GET)

#### Users

- Index [token required] `/users` (GET)
- Show [token required] `/user` (GET)
- Create N[token required] `/users` (POST)
- Login `/login` (POST)
- Register `/register` (POST)

#### Orders

- Current Order by user (args: user id)[token required] `/orders/:user_id/active` (GET)
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `/orders/:user_id/completed` (GET)

## Database ER Digram

![](https://i.ibb.co/6FjRg84/image.png)

## Database Scheme

![](https://i.ibb.co/LSC0Z3h/Untitled.png)

#### Product

- id: number
- name: string
- price: number
- [OPTIONAL] category: number

#### User

- id: number
- firstName: string
- lastName: string
- password: string

#### Orders

- id: number
- id of each product in the order
- quantity of each product in the order: string
- user_id: number
- status of order (active or complete): string

### Categories

- id: number
- name: string

### OrderProducts

- id: number
- product_id: number
- order_id: number
