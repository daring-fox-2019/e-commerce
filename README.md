# e-commerce

URL: http://f-commerce.sutansyah.co/

| Path | Method | Request | Success Response | Error Response |
|------------------|:------:|------------------------------------------------------------------------------|-------------------------------------------|----------------|
| /users | POST | body:{name,email,password} | 201, {data: created user} | 500 |
| /products | POST | headers:{token},body:{title,image,description,price,stock,category} | 201, {data: created product} | 500 |
| /products | GET | query:{title,_id,image,description,price,stock,category} | 200, {data:fetched products} | 500 |
| /products | PATCH | headers: {token}, body:{anything you want to update}, params:{id: productId} | 200, {data: updated product} | 500 |
| /products | DELETE | headers: {token}, params: {id: productId} | 200, {data: deleted product} | 500 |
| /products/search | GET | query: {title} | 200, {data: fetched products} | 500 |
| /carts | POST | headers:{token},body :{productId: productId} | 201, {data: created cart} | 500 |
| /carts/owned | GET | headers:{token} | 200, {data: owned cart} | 500 |
| /carts/qty | PATCH | body:{id: cartId, qty: newQuantity} | 200, {data: updated cart w/ new quantity} | 500 |
