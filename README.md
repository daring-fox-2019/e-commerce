# e-commerce

## User Routes
### GET
1. GET /user/token
* Route

        POST http://localhost:3000/user/token

* Description

        Get user data using decoded file received from authentication

* Response (Status: 200)

        Returns object of curently logged in user
        {
            _id: ID,
            name: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error

2. GET /user/:id
* Route

        POST http://localhost:3000/user/:id

* Description

        Get user data using params.id

* Response (Status: 200)

        Returns object of curently logged in user
        {
            _id: ID,
            name: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error



### POST
1. POST /user/login
* Route

        POST http://localhost:3000/user/login

* Description

        Let user login

* Response (Status: 200)

        Returns token of logged in user
        {
            token: STRING,
            name: STRING,
            email: STRING,
            role: STRING
        }

* Reject (Status: 400)

        Wrong email / password

* Reject (Status: 500)

        Internal server error

2. POST /user/register
* Route

        POST http://localhost:3000/user/register

* Description

        Create a new user in database

* Response (Status: 201)

        Object of created user
        {
            _id: ID,
            name: STRING,
            email: STRING,
            password: STRING
        }

* Reject (Status: 500)

        Internal server error

## Product Routes
### GET
1. GET /product
* Route  

        GET http://localhost:3000/product
* Description

        Get all products

* Response (Status 200)

        Array of object of all products
        [
            { 
                _id: ID,
                name: STRING,
                description: STRING,
                price: STRING,
                stock: STRING,
                category: STRING,
                image: URL
            },
            OBJECTS
        ]

* Reject (Status: 500)

        Internal server error

2. GET /product/:id
* Route  

        GET http://localhost:3000/product/:id
* Description

        Get product according to id parameter

* Response (Status 200)

        Object of product
            { 
                _id: ID,
                name: STRING,
                description: STRING,
                price: STRING,
                stock: STRING,
                category: STRING,
                image: URL
            }

* Reject (Status: 500)

        Internal server error

###POST
1. POST /product
* Route
        
        POST http://localhost:3000/product

* Description

        Create a new product

* Response (Status: 201)

        Object of created product
        { 
            _id: ID,
            name: STRING,
            description: STRING,
            price: STRING,
            stock: STRING,
            category: STRING,
            image: URL
        }

* Reject (Status: 500)

        Internal server error

###PATCH
1. PATCH /product/:id
* Route

        PATCH http://localhost:3000/product/:id

* Description

        Edit or update a product

* Response (Status: 200)

        Object of updated product
        { 
            _id: ID,
            name: STRING,
            description: STRING,
            price: STRING,
            stock: STRING,
            category: STRING,
            image: URL
        }

* Reject (Status: 500)

        Internal server error

### DELETE
1. DELETE /product/:id
* Route

        DELETE http://localhost:3000/product/:id

* Description

        Delete a product

* Response (Status: 200)

        Object of deleted product
        { 
            _id: ID,
            name: STRING,
            description: STRING,
            price: STRING,
            stock: STRING,
            category: STRING,
            image: URL
        }

* Reject (Status: 500)

        Internal server error

## Cart Routes
### GET
1. GET /cart
* Route

        GET http://localhost:3000/cart

* Description

        Get all cart data 

* Response (Status: 200)

        Returns array of objects of carts
        [
            {
                _id: ID,
                user: ID,
                product: ID,
                amount: NUMBER
            },
            OBJECTS
        ]

* Reject (Status: 500)

        Internal server error

1. GET /cart/:id
* Route

        GET http://localhost:3000/cart/:id

* Description

        Get one cart data 

* Response (Status: 200)

        object of cart
        {
            _id: ID,
            user: ID,
            product: ID,
            amount: NUMBER
        }

* Reject (Status: 500)

        Internal server error

### POST
1. POST /cart
* Route
        
        POST http://localhost:3000/cart

* Description

        Create a new cart

* Response (Status: 201)

        Object of created cart
        {
            _id: ID,
            user: ID,
            product: ID,
            amount: NUMBER
        }

* Reject (Status: 500)

        Internal server error

### PATCH
1. PATCH /cart/:id
* Route

        PATCH http://localhost:3000/cart/:id

* Description

        Edit or update a cart

* Response (Status: 200)

        Object of updated cart
        {
            _id: ID,
            user: ID,
            product: ID,
            amount: NUMBER
        }

* Reject (Status: 500)

        Internal server error

### DELETE
1. DELETE /cart/:id
* Route

        DELETE http://localhost:3000/cart/:id

* Description

        Delete a cart

* Response (Status: 200)

        Object of deleted cart
        {
            _id: ID,
            user: ID,
            product: ID,
            amount: NUMBER
        }

* Reject (Status: 500)

        Internal server error