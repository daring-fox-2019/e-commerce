# e-commerce

## User route
### User Register
```sh
POST /users/register
```
* Headers : none
* Body    : {email, name, password}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : email is unique, register will return token

Example Output
```javascript
{
    "_id": "5ce016ffc07e47377880c344",
    "email": "michael@yahoo.com",
    "name": "michael ryan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UwMTZmZmMwN2U0NzM3Nzg4MGMzNDQiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1ODE4OTgyM30.50r03ZbYzpkndB6JYdVWhUAXGjXS13LKHatS-uZrY-U"
}
```


Error Example
```javascript
{
    "error": {
        "errors": {
            "email": {
                "message": "Email is registered",
                "name": "ValidatorError",
                "properties": {
                    "message": "Email is registered",
                    "type": "user defined",
                    "path": "email",
                    "value": "michael@yahoo.com"
                },
                "kind": "user defined",
                "path": "email",
                "value": "michael@yahoo.com"
            }
        },
        "_message": "User validation failed",
        "message": "User validation failed: email: Email is registered",
        "name": "ValidationError"
    },
    "message": "Email is registered"
}
```
### Register as Admin
```sh
POST /users/register
```
* Headers : none
* Body    : {email, name, password, role:"admin"}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : email is unique, register will return token

Example Output
```javascript
{
    "_id": "5ce016ffc07e47377880c344",
    "email": "michael_admin@yahoo.com",
    "name": "michael ryan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UwMTZmZmMwN2U0NzM3Nzg4MGMzNDQiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1ODE4OTgyM30.50r03ZbYzpkndB6JYdVWhUAXGjXS13LKHatS-uZrY-U"
}
```
### User Login
```sh
POST /users/login
```
* Headers : none
* Body    : {email, password}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UwMTZmZmMwN2U0NzM3Nzg4MGMzNDQiLCJlbWFpbCI6Im1pY2hhZWxAeWFob28uY29tIiwibmFtZSI6Im1pY2hhZWwgcnlhbiIsImlhdCI6MTU1ODE4OTk0OH0.XqvjpbC3iTTbBfKL92RPRHanY_0AJMSUOa6zdXLmTm4",
    "_id": "5ce016ffc07e47377880c344",
    "name": "michael ryan",
    "email": "michael@yahoo.com"
}
```
Error Example
```javascript
{
    "message": "Invalid email/password"
}
```
### Add item to cart
```sh
PATCH /users/cart
```
* Headers : {token}
* Body    : {add_item_to_cart: product_id, quantity}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "role": "$2a$10$ggaa0Cg2GpHjDuMF6zSIR.D2hHc4l71hblQlc5rFexhTNsrehANqa",
    "cart": [
        "5ce024f2ef3c893c416731f8" //cart_id --> input for remove from cart
    ],
    "_id": "5ce016ffc07e47377880c344",
    "email": "michael@yahoo.com",
    "name": "michael ryan",
    "password": "$2a$10$EdRPnk/XVZaLtYtO0I0JzObcP4HPBFfIOX4bi2RfjmsuM2t/jsIEC",
    "__v": 0
}
```
Error Example
```javascript
{
    "message": "Invalid email/password"
}
```
### Remove item from cart
```sh
PATCH /users/cart
```
* Headers : {token}
* Body    : {remove_item_from_cart: cart_id}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    {
        "role": "$2a$10$ggaa0Cg2GpHjDuMF6zSIR.D2hHc4l71hblQlc5rFexhTNsrehANqa",
        "cart": [], // --> cart_id removed
        "_id": "5ce016ffc07e47377880c344",
        "email": "michael@yahoo.com",
        "name": "michael ryan",
        "password": "$2a$10$EdRPnk/XVZaLtYtO0I0JzObcP4HPBFfIOX4bi2RfjmsuM2t/jsIEC",
        "__v": 0
    }
}
```
Error Example
```javascript
{
    {
        "message": "please input cart_id that is going to be removed."
    }
}
```



## Product Route
### Create/ Register new item
```sh
POST /products
```
* Headers : {token: admin_token} (only admin can register product)
* Body    : {name, image_url,}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    {
        "_id": "5ce020f975608d3afde47097",
        "name": "obat obatan",
        "stock": 100,
        "price": 10000,
        "createdAt": "2019-05-18T15:12:57.235Z",
        "updatedAt": "2019-05-18T15:12:57.235Z",
        "__v": 0
    }
}
```
Error Example
```javascript
{
    "message" : "not authorized"
}
```
### Find All Product
```sh
GET /products
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
[
    {
        "_id": "5ce020f975608d3afde47097",
        "name": "obat obatan",
        "stock": 100,
        "price": 10000,
        "createdAt": "2019-05-18T15:12:57.235Z",
        "updatedAt": "2019-05-18T15:12:57.235Z",
        "__v": 0
    }
]
```
### Find Specific Product
```sh
GET /products/:product_id
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "_id": "5ce020f975608d3afde47097",
    "name": "obat obatan",
    "stock": 100,
    "price": 10000,
    "createdAt": "2019-05-18T15:12:57.235Z",
    "updatedAt": "2019-05-18T15:12:57.235Z",
    "__v": 0
}
```
### Update Product Information
```sh
PATCH /products
```
* Headers : {token: admin_token} (only admin can edit product information)
* Body    : {...fieldToBeUpdated}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "_id": "5ce020f975608d3afde47097",
    "name": "obat obatan updated",
    "stock": 150,
    "price": 100000,
    "createdAt": "2019-05-18T15:12:57.235Z",
    "updatedAt": "2019-05-18T16:14:41.908Z",
    "__v": 0
}
```
Error Example
```javascript
{
    "message": "Not authorized"
}
```
### Update Cart Stock (add stock or subtract stock)
```sh
PATCH /products/:product_id/cart
```
* Headers : {token: user_token}
* Body    : {add_stock: quantity} or {subtract_stock: quantity}
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}
* Description : this route is called when making transactions

Before
```javascript
{
    "_id": "5ce020f975608d3afde47097",
    "name": "obat obatan updated",
    "stock": 150,
    "price": 100000,
    "createdAt": "2019-05-18T15:12:57.235Z",
    "updatedAt": "2019-05-18T16:38:02.574Z",
    "__v": 0
}
```

Example Input
```javascript
{ "add_stock": 10 }
```

Example Output
```javascript
{
    "_id": "5ce020f975608d3afde47097",
    "name": "obat obatan updated",
    "stock": 160, //--> updated
    "price": 100000,
    "createdAt": "2019-05-18T15:12:57.235Z",
    "updatedAt": "2019-05-18T16:38:02.574Z",
    "__v": 0
}
```
### Delete Product Data (whole)
```sh
DELETE /products/:product_id
```
* Headers : {token: admin_token}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "_id": "5ce020f975608d3afde47097",
    "name": "obat obatan updated",
    "stock": 160,
    "price": 100000,
    "createdAt": "2019-05-18T15:12:57.235Z",
    "updatedAt": "2019-05-18T16:38:02.574Z",
    "__v": 0
}
```

## Transaction Route
### Checkout User Cart
```sh
POST /transactions
```
* Headers : {token: user_token}
* Body    : { items: [ cart_id, ..., ... ] }
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "items": [
        "5ce020f975608d3afde47097" // --> cart id
    ],
    "status": "waiting for payment",
    "_id": "5ce038f287efec3ed3975a29",
    "user": "5ce016ffc07e47377880c344",
    "created_at": "2019-05-18T16:55:14.055Z",
    "updatedAt": "2019-05-18T16:55:14.055Z",
    "__v": 0
}
```
### Get all user's transaction history
```sh
GET /transactions
```
* Headers : {token: user_token}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
[
    {
        "items": [
            "5ce020f975608d3afde47097"
        ],
        "status": "waiting for payment",
        "_id": "5ce038f287efec3ed3975a29",
        "user": "5ce016ffc07e47377880c344",
        "created_at": "2019-05-18T16:55:14.055Z",
        "updatedAt": "2019-05-18T16:55:14.055Z",
        "__v": 0
    }
]
```
Error Example
```javascript
{
    "message" : "please include valid access token"
}
```

### Get all transaction (admin)
```sh
GET /transactions
```
* Headers : {token: token_admin}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
[
    {
        "items": [
            "5ce020f975608d3afde47097"
        ],
        "status": "waiting for payment",
        "_id": "5ce038f287efec3ed3975a29",
        "user": "5ce016ffc07e47377880c344",
        "created_at": "2019-05-18T16:55:14.055Z",
        "updatedAt": "2019-05-18T16:55:14.055Z",
        "__v": 0
    }
]
```
Error Example
```javascript
{
    "message" : "please include valid access token"
}
```

### Find Specific Transaction
```sh
GET /transactions/:transaction_id
```
* Headers : {token:token_user}
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "items": [
        "5ce020f975608d3afde47097"
    ],
    "status": "waiting for payment",
    "_id": "5ce038f287efec3ed3975a29",
    "user": "5ce016ffc07e47377880c344",
    "created_at": "2019-05-18T16:55:14.055Z",
    "updatedAt": "2019-05-18T16:55:14.055Z",
    "__v": 0
}
```

### Find All Product
```sh
GET /products
```
* Headers : none
* Body    : none
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    [
        {
            "_id": "5ce020f975608d3afde47097",
            "name": "obat obatan",
            "stock": 100,
            "price": 10000,
            "createdAt": "2019-05-18T15:12:57.235Z",
            "updatedAt": "2019-05-18T15:12:57.235Z",
            "__v": 0
        }
    ]
}
```
Error Example
```javascript
{
}
```

## Image Route
### Upload image

```sh
POST /images
```
* Headers : {token: token_admin}
* Body    : formData -> {"image": image.jpeg}
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example Output
```javascript
{
    "_id": "5ce0ed37e0eb2221303699fd",
    "image": "https://storage.googleapis.com/greens.michaelryans.club/1558244657972corgi.jpeg",
    "user": "5ce020e275608d3afde47096",
    "__v": 0
}
```
Error Example
```javascript
{
    "message" : "not authorized"
}
```


