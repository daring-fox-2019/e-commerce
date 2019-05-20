# e-commerce

##  User Register
```
    URL : /users/register
    Method : POST
    Headers: None
    Authenticate = None
    Body : name=[string], password=[string], email=[string], address=[object]
    Params : None
    Success Response :
        Code 201
            {
                "_id": "5ccb24a09d738f4fd1011de0",
                "name": "komangmahendra",
                "email": "mail@mail.com",
                "password": "$2a$10$.HDPulTBd1.M0vTnU7oyDe4j8b3o68uj2FWAFJc.jhEgF4478rxna",
                "role": <role>,
                "address": {province=[string],city=[string],detail=[string]},
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
##  User Login
```
    URL : /users/login
    Method : POST
    Headers: None
    Authenticate = None
    Body : password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "token": <token> ,
                "id" : <id>,
                "name": <name>,
                "role": <role>
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  update address user
```
    URL : /users
    Method : PATCH
    Headers: None
    Authenticate = YES
    Body : address={province=[string],city=[string],detail=[string]}
    Params : None
    Success Response :
        Code 200
            {
                "_id": "5ccb24a09d738f4fd1011de0",
                "name": "komangmahendra",
                "email": "mail@mail.com",
                "password": "$2a$10$.HDPulTBd1.M0vTnU7oyDe4j8b3o68uj2FWAFJc.jhEgF4478rxna",
                "role": <role>,
                "address": {province=[string],city=[string],detail=[string]},
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
##  Google sign in
```
    URL : /oauth/google-sign-in
    Method : POST
    Headers: None
    Authenticate = None
    Body : id_token=[string]
    Params : None
    Success Response :
        Code 201
              {
                "token": <token> ,
                "id" : <id>,
                "name": <name>,
                "role": <role>,
                "address": {province=[string],city=[string],detail=[string]},
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## get shipping cost api rajaongkir
```
    URL : /shipping/cost
    Method : GET
    Headers: None
    Params: origin=[city_id], destination=[city_id], weight=[number], courier=[jne/pos/tiki]
    Authenticate = None
    Body : None
    Params : None
    Success Response :
        Code 200
              {
                "rajaongkir": {
                    "query": {
                        "origin": "501",
                        ...
                    },
                    "status": {
                        "code": 200,
                        "description": "OK"
                    },
                    "origin_details": {
                        "city_id": "501",
                        ...
                    },
                    "destination_details": {
                        "city_id": "114",
                        ...
                    },
                    "results": [
                        <object>
                    ]
                },
                "service": [
                    {
                        "text": "OKE | 4-5 days",
                        "value": 52000
                    },
                    ...
                ]
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## get all province in Indonesia
```
    URL : /shipping/province
    Method : GET
    Headers: None
    Params: None
    Authenticate = None
    Body : None
    Params : None
    Success Response :
        Code 200
              [
                {
                    "value": "1",
                    "text": "Bali"
                },
                {
                    "value": "2",
                    "text": "Bangka Belitung"
                },
                ...
            ]
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## get all city in Indonesia / city in specific province
```
    URL : /shipping/city
    Method : GET
    Headers: None
    Params: provice=[province_id]
    Authenticate = None
    Body : None
    Params : None
    Success Response :
        Code 200
              [
                {
                    "province_id": "21",
                    "province": "Nanggroe Aceh Darussalam (NAD)",
                    "postal_code": "23681",
                    "value": "1",
                    "text": "Aceh Barat"
                },
                {
                    "province_id": "21",
                    "province": "Nanggroe Aceh Darussalam (NAD)",
                    "postal_code": "23764",
                    "value": "2",
                    "text": "Aceh Barat Daya"
                },
                ...
              ]
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## get all city in Indonesia / city in specific province
```
    URL : /shipping/city
    Method : GET
    Headers: None
    Params: provice=[province_id]
    Authenticate = None
    Body : None
    Params : None
    Success Response :
        Code 200
              [
                {
                    "province_id": "21",
                    "province": "Nanggroe Aceh Darussalam (NAD)",
                    "postal_code": "23681",
                    "value": "1",
                    "text": "Aceh Barat"
                },
                {
                    "province_id": "21",
                    "province": "Nanggroe Aceh Darussalam (NAD)",
                    "postal_code": "23764",
                    "value": "2",
                    "text": "Aceh Barat Daya"
                },
                ...
              ]
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## create product
```
    URL : /products
    Method : POST
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : name=[string], stock=[number], price=[number], weight=[number], tags=[Array], image=[string], description=[string]
    Params : None
    Success Response :
        Code 201
        {
            "tags": [],
            "_id": "5ce182caabb223239314e1f9",
            "name": "coba",
            "stock": 10,
            "price": 10000,
            "seller_id": "5ce175fda3341d1822915e07",
            "weight": 1000,
            "createdAt": "2019-05-19T16:22:34.771Z",
            "updatedAt": "2019-05-19T16:22:34.771Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## update product
```
    URL : /products/:id
    Method : PATCH
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : name=[string], stock=[number], price=[number], weight=[number], tags=[Array], image=[string], description=[string]
    Params : None
    Success Response :
        Code 200
        {
            "tags": [],
            "_id": "5ce182caabb223239314e1f9",
            "name": "coba-coba",
            "stock": 10,
            "price": 10000,
            "seller_id": "5ce175fda3341d1822915e07",
            "weight": 1000,
            "createdAt": "2019-05-19T16:22:34.771Z",
            "updatedAt": "2019-05-19T16:25:44.980Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all product spesific user
```
    URL : /products/user
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        [
            {
                "tags": [
                    {
                        "text": "Cat",
                        "tiClasses": [
                            "ti-valid"
                        ]
                    },
                    ...
                ],
                "_id": "5ce1765da3341d1822915e08",
                "name": "kucing bagus",
                "description": "bagus sekali layak dipelihara",
                "stock": 20,
                "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558279734702.jpeg",
                "price": 100000,
                "seller_id": "5ce175fda3341d1822915e07",
                "weight": 5000,
                "createdAt": "2019-05-19T15:29:33.066Z",
                "updatedAt": "2019-05-19T15:29:33.066Z",
                "__v": 0
            },
            <object>
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all product 
```
    URL : /products
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        [
            {
                "tags": [
                    {
                        "text": "Cat",
                        "tiClasses": [
                            "ti-valid"
                        ]
                    },
                    ...
                ],
                "_id": "5ce1765da3341d1822915e08",
                "name": "kucing bagus",
                "description": "bagus sekali layak dipelihara",
                "stock": 20,
                "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558279734702.jpeg",
                "price": 100000,
                "seller_id": "5ce175fda3341d1822915e07",
                "weight": 5000,
                "createdAt": "2019-05-19T15:29:33.066Z",
                "updatedAt": "2019-05-19T15:29:33.066Z",
                "__v": 0
            },
            <object>
        ]
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
## get spesific product 
```
    URL : /products/:id
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        {
            "tags": [],
            "_id": "5ce182caabb223239314e1f9",
            "name": "coba-coba",
            "stock": 10,
            "price": 10000,
            "seller_id": {
                "_id": "5ce175fda3341d1822915e07",
                "email": "emahend@gmail.com",
                "password": "$2a$10$4Hf3XBF4O3lSWe.C28VtMu4R.dN8DnfzZjreXVB8vGrr5swUOL9be",
                "name": "Komang Mahendra",
                "role": "none",
                "__v": 0,
                "address": {
                    "city": "17",
                    "province": "1",
                    "detail": "jalan enak"
                }
            },
            "weight": 1000,
            "createdAt": "2019-05-19T16:22:34.771Z",
            "updatedAt": "2019-05-19T16:25:44.980Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## delete product
```
    URL : /products/:id
    Method : DELETE
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization: YES
    Body : None
    Success Response :
        Code 200
        {
            "tags": [],
            "_id": "5ce182caabb223239314e1f9",
            "name": "coba-coba",
            "stock": 10,
            "price": 10000,
            "seller_id": "5ce175fda3341d1822915e07",
            "weight": 1000,
            "createdAt": "2019-05-19T16:22:34.771Z",
            "updatedAt": "2019-05-19T16:25:44.980Z",
            "__v": 0
        },
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## upload photo
```
    URL : /upload
    Method : POST
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : file=[file]
    Success Response :
        Code 200
        {
            "labels": [
                {
                    "text": "Cat",
                    "tiClasses": [
                        "ti-valid"
                    ]
                },
            ...
            ],
            "url": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558283772408.jpeg"
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all carts
```
    URL : /carts
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        [
            {
                "_id": "5ce17908a3341d1822915e10",
                "product_id": {
                    "tags": [
                        {
                            "text": "Gadget",
                            "tiClasses": [
                                "ti-valid"
                            ]
                        },
                        ...
                    ],
                    "_id": "5ce1776ea3341d1822915e0a",
                    "name": "PS terbaru 2020",
                    "description": "ps classic oke punya uhuy",
                    "stock": 8,
                    "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558280018204.jpg",
                    "price": 900000,
                    "seller_id": {
                        "_id": "5ce1772aa3341d1822915e09",
                        "email": "komangwp.mahendra@gmail.com",
                        "name": "I Komang Wahyudi Putra Mahendra",
                        "address": {
                            "city": "153",
                            "province": "6",
                            "detail": "jalan pancoran"
                        }
                    },
                    "weight": 10000,
                    "createdAt": "2019-05-19T15:34:06.795Z",
                    "updatedAt": "2019-05-19T15:41:21.011Z",
                    "__v": 0
                },
                "user_id": {
                    "_id": "5ce175fda3341d1822915e07",
                    "email": "emahend@gmail.com",
                    "name": "Komang Mahendra",
                    "address": {
                        "city": "17",
                        "province": "1",
                        "detail": "jalan enak"
                    }
                },
                "qty": 1,
                "createdAt": "2019-05-19T15:40:56.568Z",
                "updatedAt": "2019-05-19T15:40:56.568Z",
                "__v": 0
            }
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all carts specisfic user
```
    URL : /carts/user
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        [
            {
                "_id": "5ce17908a3341d1822915e10",
                "product_id": {
                    "tags": [
                        {
                            "text": "Gadget",
                            "tiClasses": [
                                "ti-valid"
                            ]
                        },
                        ...
                    ],
                    "_id": "5ce1776ea3341d1822915e0a",
                    "name": "PS terbaru 2020",
                    "description": "ps classic oke punya uhuy",
                    "stock": 8,
                    "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558280018204.jpg",
                    "price": 900000,
                    "seller_id": {
                        "_id": "5ce1772aa3341d1822915e09",
                        "email": "komangwp.mahendra@gmail.com",
                        "name": "I Komang Wahyudi Putra Mahendra",
                        "address": {
                            "city": "153",
                            "province": "6",
                            "detail": "jalan pancoran"
                        }
                    },
                    "weight": 10000,
                    "createdAt": "2019-05-19T15:34:06.795Z",
                    "updatedAt": "2019-05-19T15:41:21.011Z",
                    "__v": 0
                },
                "user_id": {
                    "_id": "5ce175fda3341d1822915e07",
                    "email": "emahend@gmail.com",
                    "name": "Komang Mahendra",
                    "address": {
                        "city": "17",
                        "province": "1",
                        "detail": "jalan enak"
                    }
                },
                "qty": 1,
                "createdAt": "2019-05-19T15:40:56.568Z",
                "updatedAt": "2019-05-19T15:40:56.568Z",
                "__v": 0
            }
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all carts specisfic user
```
    URL : /carts/user
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        [
            {
                "_id": "5ce17908a3341d1822915e10",
                "product_id": {
                    "tags": [
                        {
                            "text": "Gadget",
                            "tiClasses": [
                                "ti-valid"
                            ]
                        },
                        ...
                    ],
                    "_id": "5ce1776ea3341d1822915e0a",
                    "name": "PS terbaru 2020",
                    "description": "ps classic oke punya uhuy",
                    "stock": 8,
                    "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558280018204.jpg",
                    "price": 900000,
                    "seller_id": {
                        "_id": "5ce1772aa3341d1822915e09",
                        "email": "komangwp.mahendra@gmail.com",
                        "name": "I Komang Wahyudi Putra Mahendra",
                        "address": {
                            "city": "153",
                            "province": "6",
                            "detail": "jalan pancoran"
                        }
                    },
                    "weight": 10000,
                    "createdAt": "2019-05-19T15:34:06.795Z",
                    "updatedAt": "2019-05-19T15:41:21.011Z",
                    "__v": 0
                },
                "user_id": {
                    "_id": "5ce175fda3341d1822915e07",
                    "email": "emahend@gmail.com",
                    "name": "Komang Mahendra",
                    "address": {
                        "city": "17",
                        "province": "1",
                        "detail": "jalan enak"
                    }
                },
                "qty": 1,
                "createdAt": "2019-05-19T15:40:56.568Z",
                "updatedAt": "2019-05-19T15:40:56.568Z",
                "__v": 0
            }
        ]
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get specific cart
```
    URL : /carts/:id
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : None
    Success Response :
        Code 200
        {
            "_id": "5ce17908a3341d1822915e10",
            "product_id": {
                "tags": [
                    {
                        "text": "Gadget",
                        "tiClasses": [
                                "ti-valid"
                            ]
                        },
                        ...
                        ],
                        "_id": "5ce1776ea3341d1822915e0a",
                        "name": "PS terbaru 2020",
                        "description": "ps classic oke punya uhuy",
                        "stock": 8,
                        "image": "https://storage.googleapis.com/e-commerce.komangmahendra.me/upload/1558280018204.jpg",
                        "price": 900000,
                        "seller_id": {
                            "_id": "5ce1772aa3341d1822915e09",
                            "email": "komangwp.mahendra@gmail.com",
                            "name": "I Komang Wahyudi Putra Mahendra",
                            "address": {
                                "city": "153",
                                "province": "6",
                                "detail": "jalan pancoran"
                            }
                        },
                        "weight": 10000,
                        "createdAt": "2019-05-19T15:34:06.795Z",
                        "updatedAt": "2019-05-19T15:41:21.011Z",
                        "__v": 0
                    },
                    "user_id": "5ce175fda3341d1822915e07",
                    "qty": 1,
                    "createdAt": "2019-05-19T15:40:56.568Z",
                    "updatedAt": "2019-05-19T15:40:56.568Z",
                    "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## create cart
```
    URL : /carts
    Method : POST
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : qty=[number], product_id=[string]
    Success Response :
        Code 201
        {
            "_id": "5ce188aea1e07a25953e5de6",
            "product_id": "5ce1888aa1e07a25953e5de4",
            "user_id": "5ce175fda3341d1822915e07",
            "qty": 2,
            "createdAt": "2019-05-19T16:47:42.138Z",
            "updatedAt": "2019-05-19T16:47:42.138Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## delete cart
```
    URL : /carts
    Method : DELETE
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization : YES
    Body : None
    Success Response :
        Code 200
        {
            "_id": "5ce188aea1e07a25953e5de6",
            "product_id": "5ce1888aa1e07a25953e5de4",
            "user_id": "5ce175fda3341d1822915e07",
            "qty": 2,
            "createdAt": "2019-05-19T16:47:42.138Z",
            "updatedAt": "2019-05-19T16:47:42.138Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## update cart
```
    URL : /carts/:id
    Method : PATCH
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization : YES
    Body : qty=[number]
    Success Response :
        Code 200
        {
            "_id": "5ce188aea1e07a25953e5de6",
            "product_id": "5ce1888aa1e07a25953e5de4",
            "user_id": "5ce175fda3341d1822915e07",
            "qty": 2,
            "createdAt": "2019-05-19T16:47:42.138Z",
            "updatedAt": "2019-05-19T16:47:42.138Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## create transactions
```
    URL : /transactions
    Method : POST
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Body : qty=[number], seller_id=[string], buyer_id=[string],total=[number], resi=[string], shipping=[object]
    Success Response :
        Code 200
        {
            "_id": "5ce18acf09e1d229169be4a3",
            "buyer_id": "5ce175fda3341d1822915e07",
            "qty": 2,
            "product_id": "5ce189e7a1e07a25953e5de7",
            "status": "pay",
            "seller_id": "5ce175fda3341d1822915e07",
            "createdAt": "2019-05-19T16:56:47.042Z",
            "updatedAt": "2019-05-19T16:56:47.042Z",
            "__v": 0
        }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## update transactions
```
    URL : /transactions/:id
    Method : PATCH
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization: YES
    Body : status=[string], resi=[string]
    Success Response :
        Code 200
        
            {
                "_id": "5ce18acf09e1d229169be4a3",
                "buyer_id": "5ce175fda3341d1822915e07",
                "qty": 2,
                "product_id": "5ce189e7a1e07a25953e5de7",
                "status": "done",
                "seller_id": "5ce175fda3341d1822915e07",
                "createdAt": "2019-05-19T16:56:47.042Z",
                "updatedAt": "2019-05-19T17:00:02.101Z",
                "__v": 0
            }
        
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## delete transactions
```
    URL : /transactions/:id
    Method : DELETE
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization: YES
    Body : status=[string], resi=[string]
    Success Response :
        Code 200
        
            {
                "_id": "5ce18acf09e1d229169be4a3",
                "buyer_id": "5ce175fda3341d1822915e07",
                "qty": 2,
                "product_id": "5ce189e7a1e07a25953e5de7",
                "status": "done",
                "seller_id": "5ce175fda3341d1822915e07",
                "createdAt": "2019-05-19T16:56:47.042Z",
                "updatedAt": "2019-05-19T17:00:02.101Z",
                "__v": 0
            }
        
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
## get all transaction transactions
```
    URL : /transactions
    Method : GET
    Headers: token=[string]
    Params: None
    Authenticate : YES
    Authorization: None
    Body : None
    Success Response :
        Code 200
            [
                <object>,
                {
                    "_id": "5ce18acf09e1d229169be4a3",
                    "buyer_id": {
                        "_id": "5ce175fda3341d1822915e07",
                        "email": "emahend@gmail.com",
                        "name": "Komang Mahendra",
                        "address": {
                            "city": "17",
                            "province": "1",
                            "detail": "jalan enak"
                        }
                    },
                    "qty": 2,
                    "product_id": {
                        "tags": [],
                        "_id": "5ce189e7a1e07a25953e5de7",
                        "name": "coba-coba",
                        "stock": 10,
                        "price": 10000,
                        "seller_id": {
                            "_id": "5ce175fda3341d1822915e07",
                            "email": "emahend@gmail.com",
                            "name": "Komang Mahendra",
                            "address": {
                                "city": "17",
                                "province": "1",
                                "detail": "jalan enak"
                            }
                        },
                        "weight": 1000,
                        "createdAt": "2019-05-19T16:52:55.222Z",
                        "updatedAt": "2019-05-19T16:52:55.222Z",
                        "__v": 0
                    },
                    "status": "done",
                    "seller_id": "5ce175fda3341d1822915e07",
                    "createdAt": "2019-05-19T16:56:47.042Z",
                    "updatedAt": "2019-05-19T17:00:02.101Z",
                    "__v": 0
                }
            ]
        
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```

