# e-commerce

## REST API Documentation

### Resource Endpoints

- Auth
    - [Register](#register): `POST /auth/register`
    - [Login](#login): `POST /auth/login`
- Item
    - [Fetch Items](#fetch-items): `GET /items`
    - [Fetch an Item](#fetch-an-item): `GET /items/:item_id`
    - [Create an Item](#create-an-item): `POST /items`
    - [Update an Item](#update-an-item): `PUT /items/:item_id`
- Cart
    - [Fetch Cart](#fetch-cart): `GET /cart`
    - [Add Item into Cart](#add-item-into-cart): `PUT /cart/:item_id`
    - [Remove an Item from Cart](#remove-an-item-from-cart): `DELETE /cart/:item_id`
    - [Clear Cart](#clear-cart): `DELETE /cart`
    - [Checkout Cart](#checkout-cart): `POST /cart`
- Transaction
    - [Fetch Transactions](#fetch-transaction): `GET /transactions`
    - [Fetch Transaction](#fetch-transaction): `GET /transactions/:transaction_id`



#### Register

<hr>

**Method**: `POST`

**URL**: `/auth/register`

**Request Body**:
```javascript
{
    email: "your@email.com",
    password: "yourpassword"
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: ObjectId,
        email: "your@email.com"
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `422`

**Body**:
```javascript
{
    message: "User with this email is already registered, try another email"
}
```

**Status**: `422`

**Body**:
```javascript
{
    message: "Email can't be empty"
}
```

**Status**: `422`

**Body**:
```javascript
{
    message: "Password can't be empty"
}
```


**Status**: `422`

**Body**:
```javascript
{
    message: "Invalid Email"
}
```



#### Login

<hr>

**Method**: `POST`

**URL**: `/auth/login`

**Request Body**:
```javascript
{
    email: "your@email.com",
    password: "yourpassword"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    user: {
        _id: ObjectId,
        email: "your@email.com"
    },
    jwtToken: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Bad Credential"
}
```



#### Fetch Items

<hr>

**Method**: `GET`

**URL**: `/items`

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    items: [
        {
            _id: ObjectId,
            name: "Fancy Product",
            imageUrl: "http://external-url-or-local-static-url.jpg",
            stock: 56,
            price: 3100300400,
            seller: {
                _id: ObjectId,
                email: "seller@email.com"
            }
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Fetch an Item

<hr>

**Method**: `GET`

**URL**: `/items/:item_id`

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    item: {
        _id: ObjectId,
        name: "Fancy Product",
        imageUrl: "http://external-url-or-local-static-url.jpg",
        stock: 56,
        price: 3100300400,
        seller: {
            _id: ObjectId,
            email: "seller@email.com"
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Create an Item

<hr>

**Method**: `POST`

**URL**: `/items`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Request Body**:
```javascript
{
    name: "Fancy Product",
    stock: 56,
    price: 3100300400,
}
```

**Request File**:
```javascipt
{
    image: ImageFile
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    item: {
        name: "Fancy Product",
        imageUrl: "http://external-url-or-static-url.jpg",
        stock: 56,
        price: 3100300400,
        seller: {
            _id: ObjectId,
            email: "seller@email.com"
        }
    }
}
```

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `422`

**Body**:
```javascript
{
    message: "Item name can\'t be empty"
}
```



#### Update an Item

<hr>

**Method**: `PUT`

**URL**: `/items/:item_id`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Request Body**:
```javascript
{
    name: "Fancy Product",
    stock: 56,
    price: 3100300400,
}
```

**Request File**:
```javascript
{
    image: ImageFile
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    item: {
        name: "Fancy Product",
        imageUrl: "http://external-url-or-static-url.jpg",
        stock: 56,
        price: 3100300400,
        seller: {
            _id: ObjectId,
            email: "seller@email.com"
        }
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `401`

**Body**:
```javascript
{
    message: "Unauthorized Access"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Item Not Found"
}
```

**Status**: `422`

**Body**:
```javascript
{
    message: "Item name can\'t be empty"
}
```



#### Fetch Cart

<hr>

**Method**: `GET`

**URL**: `/cart`

**Request Headers**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    cart: [
        {
            _id: ObjectId
            name: "Fancy Product",
            imageUrl: "http://external-url-or-static-url.jpg",
            stock: 56,
            price: 3100300400,
            seller: {
                _id: ObjectId,
                email: "seller@email.com"
            }
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```



#### Add Item into Cart

<hr>

**Method**: `PUT`

**URL**: `/cart/:item_id`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    cart: [
        {
            _id: ObjectId,
            name: "Fancy Product",
            imageUrl: "http://external-url-or-static-url.jpg",
            stock: 56,
            price: 3100300400,
            seller: {
                _id: ObjectId
                email: "seller@email.com"
            }
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: 'Can\'t add your own item'
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Item Not Found"
}
```



#### Remove an Item from Cart

<hr>

**Method**: `PUT`

**URL**: `/cart/:item_id`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    cart: [
        {
            _id: ObjectId,
            name: "Fancy Product",
            imageUrl: "http://external-url-or-static-url.jpg",
            stock: 56,
            price: 3100300400,
            seller: {
                _id: ObjectId
                email: "seller@email.com"
            }
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Item Not Found"
}
```



#### Clear Cart

<hr>

**Method**: `DELETE`

**URL**: `/cart`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `204`

**Body**: `none`

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```


#### Checkout Cart

<hr>

**Method**: `POST`

**URL**: `/cart`

**Request Headers**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**:

**Status**: `201`

**Body**:
```javascript
{
    transaction: {
        _id: ObjectId,
        owner: {
            _id: ObjectId,
            email: "your@email.com
        }
        cart: [
            {
                item: {
                    _id: ObjectId,
                    name: "Fancy Product",
                    imageUrl: "http://external-url-or-static-url.jpg",
                    stock: 56,
                    price: 3100300400,
                    seller: {
                        _id: ObjectId
                        email: "seller@email.com"
                    }
                }
                count: 3
                status: 'waiting_payment'
            },
            ...
        ]
        paid: 0
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Can't checkout empty cart"
}
```



#### Fetch Transactions

<hr>

**Method**: `GET`

**URL**: `/transactions`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    transactions: [
        {
            _id: ObjectId,
            owner: {
                _id: ObjectId,
                email: "your@email.com
            }
            cart: [
                {
                    item: {
                        _id: ObjectId,
                        name: "Fancy Product",
                        imageUrl: "http://external-url-or-static-url.jpg",
                        stock: 56,
                        price: 3100300400,
                        seller: {
                            _id: ObjectId
                            email: "seller@email.com"
                        }
                    }
                    count: 3
                    status: 'waiting_payment'
                },
                ...
            ]
            paid: 0
        },
        ...
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: 'Missing Token'
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: 'Invalid Token'
}
```



#### Fetch Transaction

<hr>

**Method**: `GET`

**URL**: `/transactions/:transaction_id`

**Request Header**:
```javascript
{
    Authorization: "eyJhbGciOiJIU...<jwt token>"
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    transactions: {
        _id: ObjectId,
        cart: [
            {
                item: {
                    name: "Fancy Product",
                    imageUrl: "http://external-url-or-static-url.jpg",
                    stock: 56,
                    price: 3100300400,
                    seller: {
                        _id: ObjectId
                        email: "seller@email.com"
                    }
                },
                count: 1,
                status: 'waiting for payment
            },
            {
                item: {
                    name: "Fancy Product",
                    imageUrl: "http://external-url-or-static-url.jpg",
                    stock: 56,
                    price: 3100300400,
                    seller: {
                        _id: ObjectId
                        email: "seller@email.com"
                    }
                },
                count: 4,
                status: 'sending'
            },
            ...
        ]
    },
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: 'Missing Token'
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: 'Invalid Token'
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Transaction Not Found"
}
```
