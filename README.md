# e-commerce


## Project setup
```
npm install
```
## Compiles

```javascript
-server
npm run dev
-client
npm run serve
```

## Routes Users
|        Routes       	| HTTP Method 	| Headers 	|                      Body                      	|                     Response                    	|        Description       	|
|:-------------------:	|:-----------:	|:-------:	|:----------------------------------------------:	|:-----------------------------------------------:	|:------------------------:	|
| `/users/signup`       	|     POST    	|   none  	| name: String, <br /> email: String,  <br /> password: String 	| Success: {object}, <br /> Error: Internal server error 	| Sign up a new user       	|
| `/users/signin`       	|     POST    	|   none  	|        email: String,  <br /> password: String        	| Success: {object}, <br /> Error: Internal server error 	| Sign in user             	|
| `/users/signinGoogle `	|     POST    	|   none  	|                  token: String                 	| Success: {object}, <br /> Error: Internal server error 	| Sign in user via googles 	|


## Routes Products
|     Routes    | HTTP Method |    Headers    |                           Body                          |                          Response                         |    Description    |
|:-------------:|:-----------:|:-------------:|:-------------------------------------------------------:|:---------------------------------------------------------:|:-----------------:|
| `/products`     |     POST    | token: String | name: String, <br />image: File, <br />price: Number, <br />stock: Number | Success: { object },<br /> Error: Internal server error   | Create a Product  |
| `/products`     |     GET     |      none     |                           none                          | Success: [{ object }],<br /> Error: Internal server error | Get all Products  |
| `/products/:id` |     GET     |      none     |                           none                          | Success: { object },<br /> Error: Internal server error   | Get a Product     |
| `/products/:id` |    DELETE   | token: String |                           none                          | Success: { object },<br /> Error: Internal server error   | Delete an Product |
| `/products/:id` |     PUT     | token: String | name: String, <br />image: File, <br />price: Number, <br />stock: Number | Success: { object },<br /> Error: Internal server error   | Update an Product |

## Routes Carts
|   Routes  | HTTP Method |    Headers    |                Body                |                          Response                         |          Description          |
|:---------:|:-----------:|:-------------:|:----------------------------------:|:---------------------------------------------------------:|:-----------------------------:|
| `/cart`     |     POST    | token: String | productId: String, <br />quality: Number | Success: { object },<br /> Error: Internal server error   | Add product to user cart      |
| `/cart/:id` |     GET     | token: String |                none                | Success: [{ object }],<br /> Error: Internal server error | List cart a user              |
| `/cart/:id` |     PUT     | token: String | productId: String, <br />quality: Number | Success: { object },<br /> Error: Internal server error   | Update a cart                 |
| `/cart/:id` |    DELETE   | token: String |                none                | Success: { object },<br /> Error: Internal server error   | Delete a product in user cart |

## Routes Transaction
|   Routes  | HTTP Method |    Headers    |                Body                |                          Response                         |          Description          |
|:---------:|:-----------:|:-------------:|:----------------------------------:|:---------------------------------------------------------:|:-----------------------------:|
| `/transaction`     |     POST    | token: String | cart: [String], <br />totalPrice: Number | Success: { object },<br /> Error: Internal server error   | Add user transaction      |
| `/transaction` |     GET     | token: String |                none                | Success: [{ object }],<br /> Error: Internal server error | List transaction all user              |
| `/transaction/user` |     GET     | token: String |                none                | Success: [{ object }],<br /> Error: Internal server error | List transaction a user              |
| `/transaction/:id` |     GET     | token: String |                none                | Success: [{ object }],<br /> Error: Internal server error | Get a user transaction              |
| `/transaction/:id` |     PATCH     | token: String | status: String | Success: { object },<br /> Error: Internal server error   | Update status transaction                 |
| `/transaction/:id` |    DELETE   | token: String |                none                | Success: { object },<br /> Error: Internal server error   | Delete a user transaction |

## Routes Rajaongkir
|   Routes  | HTTP Method |    Headers    |                Body                |                          Response                         |          Description          |
|:---------:|:-----------:|:-------------:|:----------------------------------:|:---------------------------------------------------------:|:-----------------------------:|
| `/rajaongkir/province`     |     GET    | none | none | Success: [{ object }],<br /> Error: Internal server error   | List all province      |
| `/rajaongkir/city` |     POST     | none |                idProvince: String                | Success: [{ object }],<br /> Error: Internal server error | List all city in one province              |
| `/rajaongkir/cost` |     POST     | none | idCity: String | Success: [{ object }],<br /> Error: Internal server error   | Get cost one delivery                 |

## Link Deploy

```
e-commerce.mprasetiodc.com

```