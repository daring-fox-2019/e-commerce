# ST-R-EAM

Simple digital distribution platform for purchasing and playing video games.

## Dependencies

* Node.js
* MongoDB

## Environtment Variables

```
JWT_SECRET
```

## Project Setup

```
$ npm install
$ npm start
```

## REST API Routes

### Home Route

- URL:
  - `GET` `/`
  - Response: `200` OK
  ```json
    {
      "page": "Home",
      "project": "E-commerce"
    }
  ```

### Authentication Routes

#### Registration
  - Description:
    - Creates a new user
  - URL:
    - `POST` `/register`
  - Body:
    - `name`: `String` (**required**)
    - `email`: `String` (**required**)
    - `password`: `String` (**required**)
  - Success response: `201` Created
  ```json
    {
      "_id": "...",
      "name": "...",
      "email": "...",
      "password": "<hashed password>"
    }
  ```
  - Fail response(s):
    - `400` Bad request
    - `500` Internal Server Error

#### Login
  - Description:
    - Logs a user in
  - URL:
    - `POST` `/login`
  - Body:
    - `email`: `String` (**required**)
    - `password`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "token": "...",
      "id": "...",
      "email": "...",
    }
  ```
  - Fail response(s):
    - `400` Bad request
    - `500` Internal Server Error

### Product Routes

#### Create Product
  - Description:
    - Create a product
  - URL:
    - `POST` `/products`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `name`: `String` (**required**)
    - `description`: `String` (**required**)
    - `price`: `Number` (**required**)
    - `featuredImg`: `String`
    - `stock`: `Number`
    - `tags`: `Array`
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Product List
  - Description:
    - Get list of all products
  - URL:
    - `GET` `/products`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    [
      {
        "_id": "...",
        "name": "...",
        "description": "...",
        "featuredImg": "...",
        "stock": "...",
        "tags": "...",
        "price": "...",
      }
    ]
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Find one product
  - Description:
    - Find one product
  - URL:
    - `get` `/products/:productId`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Update one product
  - Description:
    - Update one product
  - URL:
    - `PUT` `/products/:productId`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `name`: `String` (**required**)
    - `description`: `String` (**required**)
    - `price`: `Number` (**required**)
    - `featuredImg`: `String`
    - `stock`: `Number`
    - `tags`: `Array`
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "featuredImg": "...",
      "stock": "...",
      "tags": "...",
      "price": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Delete one product
  - Description:
    - Delete one product
  - URL:
    - `DELETE` `/products/:productId`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "message": "Successfully deleted product.",
      "id": "<productId>",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

### Cart Routes

#### Create Cart
  - Description:
    - Adds one product into a cart model
  - URL:
    - `POST` `/carts`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `product`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "user": "<userId>",
      "product": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Cart List
  - Description:
    - Get list of all carts
  - URL:
    - `GET` `/carts`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "user": "<userId>",
      "product": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### User's Cart List
  - Description:
    - Get list of all user's carts
  - URL:
    - `GET` `/carts/myCart`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "user": "<userId>",
      "product": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Delete One Cart
  - Description:
    - Remove one product from user's cart
  - URL:
    - `DELETE` `/carts/:cartId`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    {
      "message": "Successfully deleted cart.",
      "id": "<cartId>",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

### Transaction Routes

#### Create Transaction
  - Description:
    - Adds one product into a cart model
  - URL:
    - `POST` `/transactions`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `total`: `Number` (**required**)
    - `products`: `Array`
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "user": "<userId>",
      "total": "...",
      "products": "...",
      "deliveryStatus": false,
      "createdAt": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Transaction List
  - Description:
    - Get list of all transactions
  - URL:
    - `GET` `/transactions`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    [
      {
        "_id": "...",
        "user": "<userId>",
        "total": "...",
        "products": "...",
        "deliveryStatus": false,
        "createdAt": "...",
      }
    ]
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### User's Transaction List
  - Description:
    - Get list of all user's transactions
  - URL:
    - `GET` `/transactions/myTransaction`
  - Headers:
    - `token`: `String` (**required**)
  - Success response: `200` OK
  ```json
    [
      {
        "_id": "...",
        "user": "<userId>",
        "total": "...",
        "products": "...",
        "deliveryStatus": false,
        "createdAt": "...",
      }
    ]
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error

#### Claim The Game (Delivery Confirmation)
  - Description:
    - Change delivery status purchsed products
  - URL:
    - `PUT` `/transactions/:transactionId`
  - Headers:
    - `token`: `String` (**required**)
  - Body:
    - `deliveryStatus`: `Boolean` (**required**)
  - Success response: `200` OK
  ```json
    {
      "_id": "...",
      "user": "<userId>",
      "total": "...",
      "products": "...",
      "deliveryStatus": false,
      "createdAt": "...",
    }
  ```
  - Fail response(s):
    - `401` Unauthorized
    - `500` Internal Server Error


### Error statuses

```json
  {
    "message": "<error message>"
  }
```
  - `400` Bad Request
  <div style="text-align: justify"> The request cannot be fulfilled due to bad syntax. General error when fulfilling the request would cause an invalid state. Domain validation errors, missing data, etc. are some examples. </div>
  - `401` Unauthorized
  <div style="text-align: justify"> The request requires user authentication. If the request already included Authorization credentials, then this response indicates that authorization has been refused for those credentials. This happens when authentication is possible but has failed or not yet been provided. </div>
  - `404` Not Found 😥
  <div style="text-align: justify"> The server has not found anything matching the Request-URI or the requested resource is not found. </div>
  - `500` Internal Server Error
  <div style="text-align: justify"> The server encountered an unexpected condition which prevented it from fulfilling the request. </div>
