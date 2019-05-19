# e-commerce

### Add Product :
```sh
http://localhost:3000/products
METHOD : POST
Authenticated Required : YES
Authorized Required : NO

Data Input :
    {
        name: "HDD",
        description: "HDD Seagate 1tb",
        price: 790000,
        image_url: <image_url>,
        category: "",
        stock: 10
    }
    
Response Status : 201
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        name: "HDD",
        description: "HDD Seagate 1tb",
        price: 790000,
        image_url: <image_url>,
        category: "",
        stock: 10
    }
    
Response Status : 400 Bad Request
Output :
    "Product validation failed: 
        name: name is required, 
        description: description is required, 
        price: price is required, 
        image_url: image_url is required, 
        category: category is required, 
        stock: stock is required"
    
Response Status : 401 Not Authenticated 
Output :
    "Token wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```

### List Product :

```sh
http://localhost:3000/products
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
    
Response Status : 200
Data Output :
    [
        {...},{...},{...}
    ]
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Update Product :
```sh
http://localhost:3000/products/:productId
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES
Data Input :
    {
        name: "HDD",
        description: "HDD Seagate 1tb",
        price: 790000,
        image_url: <image_url>,
        category: "",
        stock: 10
    }
Response Status : 200
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        name: "HDD",
        description: "HDD Seagate 1tb",
        price: 790000,
        image_url: <image_url>,
        category: "",
        stock: 10
    }

Response Status : 400 Bad Request
Output :
    "Product validation failed: 
        name: name is required, 
        description: description is required, 
        price: price is required, 
        image_url: image_url is required, 
        category: category is required, 
        stock: stock is required"
        
Response Status : 401 Not Authenticated 
Output :
    "Token wrong!"
    
Response Status : 401 Not Authorized
Output :
    "msg": "You dont have access"

Response Status : 500
Output :
    "Internal Server Error"
```

### Delete Product :
```sh
http://localhost:3000/products/:productId
METHOD : DELETE
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        name: "HDD",
        description: "HDD Seagate 1tb",
        price: 790000,
        image_url: <image_url>,
        category: "",
        stock: 10
    }

Response Status : 401 Not Authenticated
Output :
    "Token wrong!"

Response Status : 401 Not Authorized
Output :
    "msg": "You dont have access"
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Sign In :

```sh
URL: http://127.0.0.1:3000/users/signin
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "naruto@gmail.com",
        password: "naruto"
    }
Response Status : 200
Data Output :
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDY2MjM1YjM5NWYxNDNmNzU5YzY3YiIsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsImlhdCI6MTU1NzYxOTUwNywiZXhwIjoxNTU3NzA1OTA3fQ.ybuqEKrYVIzCJBGP6QjzD1Lcrd-lS08q5BOwNtnNFCo",
        "currentUser": {
            "userId": "5cd66235b395f143f759c67b",
            "name": "naruto",
            "email": "naruto@gmail.com"
        }
    }
    
Response Status : 400 Bad Request
Output :
    "err": "email/password wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```

### Sign Up :

```sh
http://127.0.0.1:3000/users/signup
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        name: "naruto"
        email: "naruto@gmail.com",
        password: "naruto"
    }
Response Status : 201
    {
        "_id": "5cd66235b395f143f759c67b",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$NrYHAA94S/uCtYl2VsGqz.pbXqPqMbYtx.HyiaRbyMxy4VMu6JAoe",
        "__v": 0
    },
Response Status : 400 Bad Request
Output :
        "Users validation failed: 
            name: name is required, 
            email: email is required, 
            password: password is required, 
           
Response Status : 500
Output :
    "Internal Server Error"
```

```
E-commerse by:
----
**Sukma Rangga**