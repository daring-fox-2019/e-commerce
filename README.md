Website can be accessed via :  http://e-commerce.martinsuhendra.com In case you want to experience without logging in, you may use this dummy account

```
email : john@gmail.com
password : 123456
```

in case logged in as an admin just add `role: admin`  to the parameter above.

**URLs**

```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

## Usage

Make sure you have Node.js and npm in your computer and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.

Run `nodemon app.js or npm run dev` to start the server.

Run `npm run serve` to start the client

### List of To-Do Routes

| Route                    | HTTP       | Headers(s)                                                   | Body                                                         | Description                                 | Response Success                                             | Response Error                  |
| ------------------------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `/products`              | **GET**    | An Authenticated JWT Token                                   | none                                                         | Get all products list by authenticated user | Show all the products list in `array of object` : [{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId }] with status code 200 | Status code 400 Status code 500 |
| `/products/:id           | **GET**    | An Authenticated JWT Token                                   | None                                                         | Get specific products by Id                 | Show product in `object` :{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId } with status code 200 | Status code 400 Status code 500 |
| `/products`              | **POST**   | An Authenticated JWT Token                                   | productName: String, description: String, image: String, category : String, price : Number, stock : Number | Create new product                          | Show the created product in `object` :{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId } with status code 201 | Status code 400 Status code 500 |
| `/products/:id           | **DELETE** | An Authenticated JWT Token, Authorization Token              | None                                                         | Delete specific product                     | Show the deleted product in `object` :{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId } with status code 200 | Status code 400 Status code 500 |
| `/products/:id           | **PATCH**  | An Authenticated JWT Token, Authorization of a Project Member | productName: String, description: String, image: String, category : String, price : Number, stock : Number | Update specific product                     | Show the updated product in `object` :{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId } with status code 200 | Status code 400 Status code 500 |
| /products/categories/:id | **GET**    | An Authenticated JWT Token, Authorization of a Project Member | None                                                         | Show product based on category searched     | Show all the products list in `array of object` : [{ _id: ObjectId, productName: String, description: String, price: Number, stock : Number, image: string, createdAt:Date, category : ObjectId }] with status code 200 | Status code 400 Status code 500 |

### List of User Routes

| Route             | HTTP     | Headers(s) | Body                                                         | Description               | Response Success                                             | Response Error                  |
| ----------------- | -------- | ---------- | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `/users/signin`   | **POST** | none       | email: String (**required**), password: String (**required**), | Log in as registered user | Show response in `object` : { _id: ObjectId, token: String, firstName: String, lastName:String} with status code 200 | Status code 400 Status code 500 |
| `/users/register` | **POST** | none       | firstName:String(**required**), lastName:String(**required**),email: String (**required**), password: String (**required**), gender: String | Register as new user      | Response an`object` {_id, email}                             | Status code 400 Status code 500 |

### List Of Cart Routes

| Route                        | HTTP       | Headers(s)                                                  | Body                      | Description                                 | Response Success                                             | Response Error                  |
| ---------------------------- | ---------- | ----------------------------------------------------------- | ------------------------- | ------------------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `/carts`                     | **POST**   | An Authenticated JWT Token                                  | None                      | Create authenticated user's carts           | Show response in `array of object` : [{ _id: ObjectId, UserId : ObjectId, ProductId:ObjectId, amount : Number, ]}] with status code 200 | Status code 400 Status code 500 |
| `/carts`                     | **GET**    | An Authenticated JWT Token                                  | None                      | Get user carts by user ID                   | Show response in `object` : { _id: ObjectId, members:[ObjectId], pendingMembers: [ObjectId], createdBy:ObjectId, messageList:[date:Date, message:String, userId:ObjectId]} with status code 200 | Status code 400 Status code 500 |
| `/carts/rajaongkir/province` | **GET**    | An Authenticated JWT Token, API key                         | None                      | get provinces data available in Indonesia   | Show response in `object` : { provinceId:[ObjectId], provinceName: String with status code 200 | Status code 400 Status code 500 |
| `/carts/rajaongkir/city`     | **GET**    | An Authenticated JWT Token, Authorized Carts Owner, API key | None                      | get cities data available in Indonesia      | Show response in `object` : { cityId:[ObjectId], cityName: String with status code 200 | Status code 400 Status code 500 |
| `/carts/rajaongkir/cost`     | **POST**   | An Authenticated JWT Token, Authorized Carts Owner          | None                      | get courier data availabe and compute costs | Show response in `object` : {costs: Number} with status code 200 | Status code 400 Status code 500 |
| `/carts/:id`                 | **PATCH**  | An Authenticated JWT Token, Authorized Carts Owner          | Selected fields to update | Update selected fields from a cart          | Show response in `object` with status code 200               | Status code 400 Status code 500 |
| `/carts/delete/:id`          | **DELETE** | An Authenticated JWT Token, Authorized Carts Member         | None                      | Delete carts                                | Show response in `object` with status code 200               | Status code 400 Status code 500 |

## List Of Transaction Routes



| Route                   | HTTP      | Headers(s)                                              | Body                                                         | Description                                 | Response Success                                             | Response Error                  |
| ----------------------- | --------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `/transactions`         | **POST**  | An Authenticated JWT Token, Authorized  user            | userId:ObjectId(**required**), carts:Array of ObjectId(**required**),address: String (**required**), total: Number (**required**), status: String, deliverPrice: Number | Create new Transaction                      | Show response in `object` : { _id: ObjectId, userId: ObjectId, carts: [{ ObjectId }], address :String, total : Number, status : String, deliverPrice : Number} with status code 201 | Status code 400 Status code 500 |
| `/transactions`         | **GET**   | An Authenticated JWT Token, Authorized Carts user       | None                                                         | Get All Transactions History                | Show response in array of `object` :[] { _id: ObjectId, userId: ObjectId, carts: [{ ObjectId }], address :String, total : Number, status : String, deliverPrice : Number} with status code 200 | Status code 400 Status code 500 |
| `/transactions/revenue` | **GET**   | An Authenticated JWT Token, Authorized Transaction User | None                                                         | Compute Chart Statistic of income per month | Show response in array of `object` :[ { _id: ObjectId, userId: ObjectId, carts: [{ ObjectId }], address :String, total : Number, status : String, deliverPrice : Number} with status code 200 | Status code 400 Status code 500 |
| `/transactions/user`    | **GET**   | An Authenticated JWT Token, Authorized Transaction User | None                                                         | Show History of User Transaction            | Show response in array of `object` :[ { _id: ObjectId, userId: ObjectId, carts: [{ ObjectId }], address :String, total : Number, status : String, deliverPrice : Number} with status code 200 | Status code 400 Status code 500 |
| `/transactions/:id`     | **PATCH** | An Authenticated JWT Token, Authorized Transaction user | status : BOOLEAN                                             | Update Arrival Status                       | Show response in `object`                                    |                                 |

