# e-commerce(warung)

Link: [warung.emrido.site](http://warung.emrido.site/)

Server: [warung-server.emrido.site](http://warung-server.emrido.site/)

## Basic Routes

### Register New User

- Method
    - **POST**
- Route
    - `/register`
- Body
    ```JS
    {
        name: String,
        email: String,
        password: String
    }
    ```
- Response
    - `code: 201`
    ```JS
    {
        _id: "<ObjectId>",
        name: "<name>",
        email: "<email>",
        password: "<hashed password>",
        role: "Customer",
        cart: []
        _v: 0
    }
    ```

### Login

- Method
    - **POST**
- Route
    - `/login`
- Body
    ```JS
    {
        email: String,
        password: String
    }
    ```
- Response
    - `code: 200`
    ```JS
    {
        accesstoken: "<generated access token>"
    }
    ```

## Product Routes

### List of Product

- Method
    - **GET**
- Route
    - `/products`
- Response
    - `code: 200`
    ```JS
    [
        {
            "stock": Number,
            "_id": "<ObjectId>",
            "name": String,
            "price": Number,
            "image": "<Image URL>",
            "__v": 0
        },
        { "<Object Product>" }, ...
    ]
    ```
### Create Product

- Method
    - **POST**
- Route
    - `/products`
- Body
    - FormData
        - name: text(String)
        - stock: text(Number)
        - price: text(Number)
        - image: file
- Headers
    - `{ accesstoken: "<generated access token>"}`
- Response
    `code: 201`
    ```JS
    {
        "stock": "..",
        "_id": "...",
        "name": "..",
        "price": "..",
        "image": "...",
        "__v": 0
    }
    ```
### Update Product

- Method
    - **PATCH**
- Route
    - `/products/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body
    - FormData
        - name: text(String)
        - stock: text(Number)
        - price: text(Number)
        - image: file
- Response
    - `code: 200`
    ```JS
    {
        n: 1,
        nModified: 1,
        ok: 1
    }
    ```
### Delete Product

- Method
    - **DELETE**
- Route
    - `/products/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body
    - FormData
        - name: text(String)
        - stock: text(Number)
        - price: text(Number)
        - image: file
- Response
    - `code: 200`
    ```JS
    {
        n: 1,
        deletedCount: 1,
        ok: 1
    }
    ```
## Cart Route

### Get User Cart

- Method
    - **GET**
- Route
    - `/carts`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "cart": [],
        "_id": "<ObjectId>"
    }
    ```
### Add Product to User Cart

- Method
    - **PATCH**
- Route
    - `/carts/:productId`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "message": "Product added to your cart"
    }
    ```
### Remove Product from User Cart

- Method
    - **DELETE**
- Route
    - `/carts/:productId`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "message": "Product removed from your cart"
    }
    ```
    
## Transaction Route

### Checkout Product in Cart

- Method
    - **POST**
- Route
    - `/transactions`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "...",
            "t": 3
        },
        "electionId": "...",
        "ok": 1,
        "operationTime": "...",
        "$clusterTime": {
            "clusterTime": "...",
            "signature": {
                "hash": "...",
                "keyId": "..."
            }
        }
    }
    ```


### Get Transaction Detail

- Method
    - **GET**
- Route
    - `/transactions/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    [
        {
            "_id": "5ce7983a1cea620c25d1b4ab",
            "buyer": "5ce796951cea620c25d1b4aa",
            "products": [
                {
                    "status": "Pending",
                    "_id": "<ObjectId>",
                    "product": "<Product Object>"
                }
            ],
            "total_price": 500000,
            "created_at": "2019-05-24T07:07:38.583Z",
            "updated_at": "2019-05-24T07:07:38.583Z",
            "__v": 0
        }
    ]
    ```

## Usage

Run this command: 

Server:
```
$ npm install
$ npm run dev
```
Client:
 
```
$ npm install
$ npm run serve
```

## Access point:
Server: http://localhost:3000

Client: http://localhost:8080