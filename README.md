# e-commerce

### Add Product :
```sh
http://localhost:3000/products
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Body :
        name,
        description,
        price,
        image_url,
        category,
        stock

Response Status : 201
Response Status : 400 Bad Request    
Response Status : 401 Not Authenticated 
Response Status : 500
```

### List Product :

```sh
http://localhost:3000/products
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
Response Status : 500
```

### Update Product :
```sh
http://localhost:3000/products/:productId
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES
Data Input :
        name,
        description,
        price,
        image_url,
        category,
        stock
Response Status : 200

Response Status : 400 Bad Request
Response Status : 401 Not Authenticated 
Response Status : 401 Not Authorized
Response Status : 500
```

### Delete Product :
```sh
http://localhost:3000/products/:productId
METHOD : DELETE
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
Response Status : 401 Not Authenticated
Response Status : 401 Not Authorized 
Response Status : 500
```

### Sign In :

```sh
URL: http://127.0.0.1:3000/users/signin
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Body :
    email,
    password
Response Status : 200
Response Status : 400 Bad Request
Response Status : 500
```

### Sign Up :

```sh
http://127.0.0.1:3000/users/signup
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Body :
Response Status : 201
Response Status : 400 Bad Request
```
### Add To Cart :

```sh
http://127.0.0.1:3000/:productId/addCart
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Body : NO
Response Status : 201
Response Status : 400 Bad Request
Descriptions : add item product to cart
```
### Delete from Cart :

```sh
http://127.0.0.1:3000/cart/:id
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Body : NO
Response Status : 200
Response Status : 400 Bad Request
Descriptions : delete item from cart
```

```
Usage

Make sure you have node.js installed on your computer and then run these commands :

$ npm install

For testing purpose, open test directory in terminal, and run :

$ npx mocha

For opening and using app, first, open e-commerce-cli directory in terminal, and run :

$ npm run serve

And then open server directory, also in terminal, and run :

$ nodemon app.js

you can use the app in: http://localhost:8080

Access the API via http://localhost:3000
```

