# e-commerce

## Routes
List of auth routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/register` | POST | `none` | name: String (**Required**), email: String (**Required**), password: String (**Required**) | Create a user |
| `/login` | POST | `none` | email: String (**Required**), password: String (**Required**) | Login user |


List of routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/products` | GET | `none` | `none` | Get all Products|
| `/products` | POST | `accesstoken`| name: String (**Required**) ,<br> price: Number(**Required**) ,<br>  image: File(**Required**) ,<br> stock: Number(**Required**)| Post a Product |
| `/products/:id` | PATCH | `accesstoken`| name: String ,<br> price: Number ,<br>  image: File ,<br> stock: Number | Update product |
| `/products/:id` | DELETE | `accesstoken` | `none`|  Delete Product |
| `/cart` | GET | `accesstoken` | `none`|  Get user cart |
| `/cart/:productId/` | PATCH | `accesstoken` | `none`|  Add new product to cart |
| `/cart/:productId/:id` | DELETE | `accesstoken` | `none`|  Remove product from cart |
| `/transactions` | POST | `accesstoken` | `none`|  Checkout items |
| `/transactions/:id` | GET | `accesstoken` | `none`|  Get transaction detail |
| `/transactions/:id/:productId` | PATCH | `accesstoken` | `<new status>`|  Update product transaction status |

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