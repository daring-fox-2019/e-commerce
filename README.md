# e-commerce-alvinchristian7

## Endpoint

### User (doesn't require token)
| Routes              | Method | HTML Body             | Description                                          |
|---------------------|--------|-----------------------|------------------------------------------------------|
| /users/register     | POST   | name, email, password | Sign Up with new user info                           |
| /users/signingoogle | POST   | id_token from google  | Sign Up with Google and add new user info            |
| /users/login        | POST   | email, password       | Sign in and get an access token based on credentials |

### Products (require token)
| Routes                | Method | HTML Body                               | Description                                                                         |
|-----------------------|--------|-----------------------------------------|-------------------------------------------------------------------------------------|
| /products/read        | GET    | -                                       | Get all the user's products (Authenticated user only)                               |
| /products/read/search | GET    | Query: (name='text')                    | Get all the user's products that matches the query string (Authenticated user only) |
| /products/            | POST   | new FormData(name, image, price, stock) | Create a product (Authenticated user only)                                          |
| /products/read/:id    | GET    | -                                       | Get a single product (Owners only)                                                  |
| /products/update/:id  | PUT    | new FormData(name, image, price, stock) | Update a product with a new info (Owners only)                                      |
| /products/delete/:id  | DELETE | -                                       | Delete a single product (Owners only)                                               |

### Cart (require token)
| Routes           | Method | HTML Body | Description                                       |  |
|------------------|--------|-----------|---------------------------------------------------|--|
| /cart            | GET    | -         | Get all the user's cart (Authenticated user only) |  |
| /cart/upsert/:id | PUT    | count     | Update a product with a new info (Owners only)    |  |
| /cart/delete/:id | DELETE | count     | Delete a single product (Owners only)             |  |