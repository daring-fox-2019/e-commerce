# e-commerce

## Signup

- END POINT = /signup

- METHODS = POST

- INPUT = body{name, email, password, phone}

- OUTPUT(SUCCESS) = 201{msg: register success}

- OUTPUT(ERROR) = 400{error}

## Login 

- END POINT = /login

- METHODS = POST

- INPUT = body{email, password}

- OUTPUT(SUCCESS) = 201{msg:you have successly logged in, token}

- OUTPUT(ERROR) = 400{error}

## Upload Photo to GCS
- END POINT = /upload

- METHODS = POST

- INPUT = form-data{image: file}

- OUTPUT(SUCCESS) = 200{msg, link}

- OUTPUT(ERROR) = 400{error}

## Show All User Product
- END POINT = /

- METHODS = GET

- INPUT = -

- OUTPUT(SUCCESS) = 200[{_id,name,image,price,image,stock,createdAt, user_Id}]

- OUTPUT(ERROR) = 400{error}

## Signup Admin
- END POINT = /admin/signup

- METHODS = POST

- INPUT = body{name, email, password, phone}

- OUTPUT(SUCCESS) = 201{msg: register success}

- OUTPUT(ERROR) = 400{error}

- NB: Back End Only

## Create Data Product
- END POINT = /admin

- METHODS = POST

- INPUT = body{name,image,price,stock,description}

- OUTPUT(SUCCESS) = 200{name,image,price,stock,description}

- OUTPUT(ERROR) = 404{error}

## Get One Data Product

- END POINT = /admin/:id

- METHODS = GET

- INPUT = params{id:prodctId}

- OUTPUT(SUCCESS) = 200{name,image,price,stock,description}

- OUTPUT(ERROR) = 400{error}

## Update Product

- END POINT = /admin/:id

- METHODS = PUT

- INPUT = params{id:productId}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Delete Product

- END POINT = /admin/:id

- METHODS = DELETE

- INPUT = params{id:productId}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Add To Cart

- END POINT = /cart

- METHODS = POST

- INPUT = body{idUser,productId,quantity, status}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Show Cart

- END POINT = /cart/:id

- METHODS = GET

- INPUT = params{idUser}, body{productId}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Delete Cart

- END POINT = /cart/:id

- METHODS = DELETE

- INPUT = params{id:cartId}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Checkout Cart

- END POINT = /cart/:id

- METHODS = PATCH

- INPUT = params{id:userId} body{status}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}




