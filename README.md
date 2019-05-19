# e-commerce

## API Documentation - BukuBerkah E-Commerce

| ENDPOINTS      | METHOD      | REQUEST                                                                                         | RESPONSE (Success)   | RESPONSE (Error)                   |
|----------------|-------------|-------------------------------------------------------------------------------------------------|----------------------|------------------------------------|
| /              | GET         | none                                                                                            | 200 {}               | 500 {message}                      |
| /products      | GET         | none                                                                                            | 200 {data: []}       | 500 {message}                      |
| /products/:id  | GET         | param: id                                                                                       | 200 {data: product}  | 500 {message}                      |
| /products      | POST        | body:  {  name, description, ori_price, discounted_price, image_url, category, tags   }         | 201 {data: product}  | 500 {message} 401 {Not Authorized} |
| /products/:id  | PUT & PATCH | param: id body: {   name, description, ori_price, discounted_price, image_url, category, tags } | 200 {data: product}  | 500 {message} 401 {Not Authorized} |
| /products/:id  | DELETE      | param: id                                                                                       | 200 {data: product}  | 500 {message} 401 {Not Authorized} |
| /users         | GET         | none                                                                                            | 200 {data: users}    | 500 {message} 401 {Not Authorized} |
| /users/:id     | POST        |  param: id body: { email, password, name, phone, carts }                                        | 200 {data: user}     | 500 {message} 401 {Not Authorized} |
| /users/:id     | DELETE      | param: id                                                                                       | 200 {data: user}     | 500 {message} 401 {Not Authorized} |
| /auth/register | POST        | body: {email, password, name, phone}                                                            | 201 {data: user}     | 500 {message}                      |
| /auth/signin   | POST        | body: {email, password}                                                                         | 200 {data: user}     | 500 {message}                      |
| /cart          | GET         | param: id                                                                                       | 200 {data: products} | 500 {message} 401 {not authorized} |
| /cart          | POST        | body: { product }                                                                               | 201 {data: cart}     | 500 {message} 401 {not authorized} |
| /cart/:id      | PATCH       | body: {cart.products}                                                                           | 201 {data: cart}     | 500 {message}401 {not authorized}  |