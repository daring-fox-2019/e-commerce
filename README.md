## Teekultur

**URLs**

```Client URL : http://localhost:8080,
Client URL : http://localhost:8080
Server URL : http://localhost:3000
Deploy URL : http://teekultur.paulinadavita.com
```

## Usage

Make sure you have Node.js and npm in your computer and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.

Run `nodemon app.js or npm run dev` to start the server.

Run `npm run build` then `npm run serve` to start the client



### List of User Routes

| Route | HTTP | Headers(s) | Body | Description | Response Success | Response Error |
| ----- | ---- | ---------- | ---- | ----------- | ---------------- | -------------- |
| `/users/login/` | **POST** | none       | email: String (**required**),  password: String (**required**) | Log in as registered user | Show response  in `object` : { _id: ObjectId, token: String, username: String, role : String } with status code 200 | Status code 500 or 400  |
| `/users/register` | **POST** | none | firstName:string(**required**), lastName:string(**required**),email: String (**required**),  password: String (**required**) | Register as new user | Response an`object` {_id, email} | Status code 500 or 400 |

### List of Products Routes

| Route | HTTP | Headers(s) | Body | Description | Response Success | Response Error |
| ----- | ---- | ---------- | ---- | ----------- | ---------------- | -------------- |
| `/products/` | **GET** | None or Query {`params : name`} | None | Get all products on the store | Show response  in `array of object` : [{name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId}}] | Status code 500 if `internal server error` or 400 if `bad request` |
| `/products/:id` | **GET** | None | None | Get a specific product by Id | Show response  in `object` of item: {name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId}} | Status code 500 if `internal server error` or 400 if `bad request` |
| `/products/` | **POST** | Auhtenticated JWT Token, Authorized admin Token | name : *String* (**required**), stock : *Number* (**required**), image, description  : *String*(**required**), category : {ObjectId} (**required**) | Post a new product to the store | Show response  in `object` of the created item: {name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId}} | Status code 500 if `internal server error` or 400 if `bad request` |
| `products/:id` | **DELETE** | Auhtenticated JWT Token, Authorized admin Token | None | Delete specified product by Id | Show response  in `object` of the deleted item: {name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId}} | Status code 500 if `internal server error` or 400 if `bad request` |
| `products/:id` | **PATCH** | Auhtenticated JWT Token, Authorized admin Token | name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId} | Update detail on product by Id | Show response  in `object` of the deleted item: {name : *String* , stock : *Number* , image, description  : *String*, category : {ObjectId}} | Status code 500 if `internal server error` or 400 if `bad request` |



### List of Cart Routes
| Route | HTTP | Headers(s) | Body | Description | Response Success | Response Error |
| ----- | ---- | ---------- | ---- | ----------- | ---------------- | -------------- |
| `/carts/` | **GET** | Auhtenticated JWT Token | None | Get all products put by authenticated user in their temporary Checkout cart | Show response  in `array of object` : [{userId : {ObjectId}, productId : {ObjectId}, amount : *Number*}] | Status code 500 if `internal server error` or 400 if `bad request` |
| `/carts` | **POST** | Auhtenticated JWT Token | productId : {ObejctId} (**required**), amount : Number (**required**) | Insert new item into the cart | Show response  in `object` : {userId : {ObjectId}, productId : {ObjectId}, amount : *Number*} | Status code 500 if `internal server error` or 400 if `bad request` |
| `/carts/checkout` | **POST** | Auhtenticated JWT Token, Authorized Cart Token | {total : Number (**required**), deliverPrice : Number (**required**), address : String (**required**), recipientName : String (**required**) } | Checked out (delete) all user's cart that contains bought item. Then app will directly create new `Transaction` and update the selected `Product` | Show response  in `array of object` of the checked out carts : [{userId : {ObjectId}, productId : {ObjectId}, amount : *Number*}] | Status code 500 if `internal server error` or 400 if `bad request` |
| `carts/:id` | **DELETE** | Auhtenticated JWT Token,  Authorized Cart Token | None | Deleted specified cart | Show response  in `object` of deleted cart : {userId : {ObjectId}, productId : {ObjectId}, amount : *Number*} | Status code 500 if `internal server error` or 400 if `bad request` |
| `carts/:id` | **PATCH** | Auhtenticated JWT Token, Authorized Cart Token | type : 'inc' `OR`, 'dec', `or` `NONE` **(required)**, userId : {ObjectId}, amount : Number, productId : amount | Update specified cart. 'Inc' refers to increment amount by 1 and 'dec' refers to decrement amount by 1 | Show response  in `object` of updated cart : {userId : {ObjectId}, productId : {ObjectId}, amount : *Number*} | Status code 500 if `internal server error` or 400 if `bad request` |

### Transaction Controller 

| Route | HTTP | Headers(s) | Body | Description | Response Success | Response Error |
| ----- | ---- | ---------- | ---- | ----------- | ---------------- | -------------- |
| `transactions/` | **GET** | Auhtenticated JWT Token | None | Get all list of made transactions | Show response  in `array of object` : [{userId : {ObjectId}, recipientName : *String*, carts : [{productId : ObjectId}], totak : *Number*, status : *Boolean*, deliverPrice : *Number*}] | Status code 500 if `internal server error` or 400 if `bad request` |
| `transactions/revenue/months` | **GET** | Auhtenticated JWT Token, Authorized admin token | None | Get aggregate results on store's revenue per month | Show response in`array of object` : [{_id, : Number, revenue : Number}] | Status code 500 if `internal server error` or 400 if `bad request` |
| `transactions/shipping` | **GET** | Auhtenticated JWT Token | None | Get all listings for Cities, Province and Courier for shipping from RajaOngkir API | Show response in `array of object` | Status code 500 if `internal server error` or 400 if `bad request` |
| `transactions/shipping` | **POST** | Auhtenticated JWT Token | origin  : Number (**required**), destination : Number (**required**), courier : string (**required**), weight : Number (**required**) | Post to RajaOngkir API to calculate shipping fare | Show response in `array of object` | Status code 500 if `internal server error` or 400 if `bad request` |
| `transactions/:id` | **GET** | Auhtenticated JWT Token | None | Get one transaction detail | Show response  in ` object` : {userId : {ObjectId}, recipientName : *String*, carts : [{productId : ObjectId}], totak : *Number*, status : *Boolean*, deliverPrice : *Number*} | Status code 500 if `internal server error` or 400 if `bad request` |
| `transactions/:id` | **PATCH** | Auhtenticated JWT Token, Authorized transaction token |  | Update a transaction's details | Show response  in `array of object` : [{userId : {ObjectId}, recipientName : *String*, carts : [{productId : ObjectId}], totak : *Number*, status : *Boolean*, deliverPrice : *Number*}] | Status code 500 if `internal server error` or 400 if `bad request` |

