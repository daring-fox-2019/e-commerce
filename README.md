# e-commerce

## First Initial

### URL : '/authenticate'
* METHOD : GET
* BODY : { }
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    OUTPUT : { }
* RESPONSE STATUS : 400
    OUTPUT : {
        message : 'PLease login to access this endpoint'
     }
* RESPONSE STATUS : 400
    OUTPUT : {
        message : 'User invalid'
     }
* RESPONSE STATUS : 500
    OUTPUT : {
        message : 'Internal server error'
     }

## List of user routes
### URL : 'user/register'
* METHOD : POST
* BODY : {
    * username : Olivia Jaco
    * email : "Olivia@jaco.com"
    * password : "bethebest"
}
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        token : <jwt token>
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "email already used"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

### URL : '/login'
* METHOD : POST
* BODY : {
    * email : "olivia@jaco.com"
    * password : "bethebest"
}
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        token : <jwt token>
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "username / password invalid"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

## List of item routes
### URL : '/items'
* METHOD : POST
* BODY : {
    * title : "Sweater Wool",
    * description : "Bohemian Style",
    * price : 800000,
    * mainPage : true,
    * kategori : Tops,
    * stock : 24,
    * image : bohoTops.png
    }
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        title : "Sweater Wool",
        description : "Bohemian Style",
        price : 800000,
        mainPage : true,
        kategori : Tops,
        stock : 24,
        image : <url_link>
    }
    ```
* RESPONSE STATUS : 400
    ```
    OUTPUT : {
        _id : "knkn89797sg8jh9spjsa9obcaiscal7"
        product validation : title : "Title is required",description : "Description is required",
        price : "Pricec minimal : 1"
        price : "Price is required",
        kategori : "Kategori required",
        stock : "Stock minimal : 1",
        stock : "Stock required",
        image : "Image required"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```'

### URL : '/items'
* METHOD : GET
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ```
    OUTPUT : [{
        _id : "knkn89797sg8jh9spjsa9obcaiscal7"      
        title : "Sweater Wool",
        description : "Bohemian Style",
        price : 800000,
        mainPage : true,
        kategori : Tops,
        stock : 24,
        image : <url_link>,
    }]
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/items/:id'
* METHOD : GET
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ```
    OUTPUT : {
        _id : "knkn89797sg8jh9spjsa9obcaiscal7"      
        title : "Sweater Wool",
        description : "Bohemian Style",
        price : 800000,
        mainPage : true,
        kategori : Tops,
        stock : 24,
        image : <url_link>,
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/items/:id'
* METHOD : PUT
* AUTHENTICATION : NO
* BODY : {
       tittle : "Afrixana Style Summer" 
    }
* RESPONSE STATUS : 200
    ```
    OUTPUT : {
        message : "Update successfully"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```

### URL : '/products/:id'
* METHOD : DELETE
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
     ```
     OUTPUT : {
        message : "delete succesfully"
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```

## List of item routes
### URL : '/cart'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* BODY : {
        userId : "knkn89797sg8jh9spjsa9obcaiscal7",
        itemId : _id,
        title : "Sweater Wool",
        description : "Afrixana style,
        price : 100000, 
        kategori : Tops,
        image : < url_link >,
        stock : 24
}
* RESPONSE STATUS : 201
     ```
     OUTPUT : {
         _id : absjda89dsa7d9aba9-d0aoh
        userId : "knkn89797sg8jh9spjsa9obcaiscal7",
        itemId : _id,
        title : "Sweater Wool",
        description : "Afrixana style,
        price : 100000, 
        kategori : Tops,
        image : < url_link >,
        stock : 1"
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/cart'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : {
         _id : absjda89dsa7d9aba9-d0aoh
        userId : "knkn89797sg8jh9spjsa9obcaiscal7",
        itemId : _id,
        title : "Sweater Wool",
        description : "Afrixana style,
        price : 100000, 
        kategori : Tops,
        image : < url_link >,
        stock : 1"
    }
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
### URL : '/cart'
* METHOD : PUT
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* BODY : {
        quantity : 2
    }
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        userId : "knkn89797sg8jh9spjsa9obcaiscal7",
        itemId : _id,
        title : "Sweater Wool",
        description : "Afrixana style,
        price : 100000, 
        kategori : Tops,
        image : < url_link >,
        stock : 1"
    }]
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```

### URL : '/cart'
* METHOD : DELETE
* AUTHENTICATION : YES
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        userId : "knkn89797sg8jh9spjsa9obcaiscal7",
        itemId : _id,
        title : "Sweater Wool",
        description : "Afrixana style,
        price : 100000, 
        kategori : Tops,
        image : < url_link >,
        stock : 1"
    }]
vue.a
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```
    
## List Transaction
### URL : '/transaction'
* METHOD : DELETE
* AUTHENTICATION : POST
* HEADERS : < TOKEN >
* RESPONSE STATUS : 200
     ```
     OUTPUT : [{
         _id : absjda89dsa7d9aba9-d0aoh
        cart => {}
    }]
vue.reef
    ```
* RESPONSE STATUS : 500 
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```