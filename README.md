# e-commerce

## List of user routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization | Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | ---
```/api/login``` | POST | none | none | email:String, fullName:String, password:String | no | no | Sign in and get an access token based on credentials | Success: Return token, email, fullName and status 200. Error: Return error message and status 500.
```/api/register``` | POST | none | none | email:String, fullName:String, password:String | no | no | Sign up with new user info | Success: Return token, email, fullName and status 200. Error: Return error message and status 500.

## List of item routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization |Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | --- 
```/api/items``` | GET | none | token:String | none | no | no | Get all items  | Success: Return all items and status 200. Error: Return error message and status 500.
```/api/items/:id``` | GET | _id:ObjectID | token:String | none | yes | no | Get a single item info | Success: Return item and status 200. Error: Return error message and status 500.
```/api/items``` | POST | none | token:String | name:String, price:Number, stock:Number, sellerId:ObjectId, image:String | yes | no | Create an item | Success: Return created item and status 201. Error: Return error message and status 500.
```/api/items/:id``` | DELETE | _id:ObjectID| token:String | none | yes | yes | Delete a item (Admin only) | Success: Return deleted item and status 200. Error: Return error message and status 500.
```/api/items/:id``` | PATCH | _id:ObjectID | token:String | none | yes | yes | Update a item with new info | Success: Return updated item and status 200. Error: Return error message and status 500.

# Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ cd server
$ npm init
$ npm install
```

Read ```.env.example``` and then you can create your own ```.env``` file.

After you have finished, on your server run the following command:

```
$ npm run dev
```

For your client, run the following commands:

```
$ cd client/shopenguin-vue
$ npm install
$ npm run serve
```

You can browse the items without signing in. You need to register or login if you want to add a new item.
For register, you need to fill out email, full name, and password. For login, insert email and password or you can sign in using your Google account.