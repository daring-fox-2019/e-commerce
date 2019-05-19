# Welcome to Jualeun
some e-commerce API!

## List of Routes
There are three main routes used in this API: users, carts, and products
### Users Routes
Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /user/register | POST | none | name, address, phoneNumber, email, password, pp | register new User | status code 201 and JSON data of new user created | status code 500 (internal server error) or 400 (bad request) and error message
 /user/login | POST | none | email, password | log in into application | status code 200 and JSON web token (jwtoken) | status code 400 (bad request) or 500 (internal server error) and error message
 /user/update/:id | PUT | none | name, address, phoneNumber, email, password, pp | update user data | status code 201 and update report | status code 400 (bad request) or 500 (internal server error) and error message
 
 ### Products Routes
 Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /products | GET | JSON web token generated while logging in (jwtoken) | none | show all logged in user's items info | status code 200 and JSON data of items info | status code 500 (internal server error) or 401 (not authorized) and error message
 /products | POST | JSON web token generated while logging in (jwtoken) | item, price, stock, img, description, owner  | add new item to sell | status code 201 and JSON data of new item added | status code 500 (internal server error) or 400 (bad request) or 401 (not authorized) and error message
 /products:id | PATCH | JSON web token generated while logging in (jwtoken) | id, stock | update stock after add-to-cart process | status code 201 and JSON data of update report | status code 500 (internal server error) or 401 (not authorized) and error message
 /products:id | PUT | JSON web token generated while logging in (jwtoken) | item, price, stock, img, description, owner, id | update whole properties of an item | status code 201 and JSON data of update report | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /products/:id | DELETE | JSON web token generated while logging in (jwtoken) | id | delete an item | status code 200 and JSON data of  delete report | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 
 ### Carts Routes
 Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 /carts/add | POST | JSON web token generated while logging in (jwtoken) | name(opt) | create new cart | status code 201 and JSON data of newly created cart | status code 400 (bad request), 401 (not authorized) or 500 (internal server error) and error message
 /carts/delete/:id | DELETE | JSON web token generated while logging in (jwtoken) | none | delete specific cart | status code 200 and JSON data of delete report |  status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message 
 /carts | GET | JSON web token generated while logging in (jwtoken) | none | get carts owned by logged in user | status code 200 and JSON of carts data | tatus code 500 (internal server error) or 401 (not authorized) and error message
 /carts/update/:id | PUT | JSON web token generated while logging in (jwtoken) | name(opt), owners,products | update all attribute of a cart document | status code 201 and JSON data of newly updated cart | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /carts/update/:id | PATCH | JSON web token generated while logging in (jwtoken) | product _id | add product to cart products attribute | status code 201 and JSON data of newly updated cart | status code 500 (internal server error) or 401 (not authorized) or 400 (bad request) and error message
 /carts/admin | GET | JSON web token generated while logging in (jwtoken) | none | get all transaction history in Jualeun | status code 200 and JSON data of all transaction history in Jualeun | status code 401 (not authorized) or 500 (internal server error) and error message
 /carts/delivery | GET | JSON web token generated while logging in (jwtokem) | none | get logged in user's data of on going delivery | status code 200 and JSON data of on going delivery | status code 401 (not authorized) or 500 (internal server error) and error message
 /carts/delivery/:id | PATCH | JSON web token generated while logging in (jwtoken) | none | confirm that ordered items has arrive | status code 201 and JSON data of update report | status code 401 (not authorized) or 500 (internal server error)
 
 # Usage
Make sure you have node.js installed on your computer and then run these commands :

$ npm install

For testing purpose, open root directory in terminal, and run :

$ npm run test

For running server, open root directory in terminal, and run :

$ npm run dev

Access the API via http://localhost:3000/ 

Visit deployed link in http://jualeun.qfs-hacktiv8.com/login
