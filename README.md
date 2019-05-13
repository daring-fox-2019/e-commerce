# e-commerce
## Endpoint
### Basic (doesn't require token)
| Routes      | Method | HTML Body       | Description                                          |
|-------------|--------|-----------------|------------------------------------------------------|
| /users/register | POST   | name, email, password | Sign Up with new user info                           |
| /users/signingoogle | POST   | id_token from google | Sign Up with Google and add new user info                           |
| /users/login | POST   | email, password | Sign in and get an access token based on credentials |

### TODOS (require token)
| Routes         | Method | HTML Body          | Description                                        |
|----------------|--------|--------------------|----------------------------------------------------|
| /products/read     | GET    | -                  | Get all the user's products (Authenticated user only) |
| /products/read/search     | GET    | Query: (title='text')                  | Get all the user's products that matches the query string (Authenticated user only) |
| /products/     | POST   | title, content | Create a product (Authenticated user only)            |
| /products/read/:id | GET    | -                  | Get a single product (Owners only)                    |
| /products/update/:id | PUT    | title, content | Update a product with a new info (Owners only)        |
| /products/delete/:id | DELETE | -                  | Delete a single product (Owners only)                 |
