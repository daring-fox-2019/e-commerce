module.exports = function(err, req, res, next){
  
    switch(err.message){
        case 'Unauthenticate' : 
        case 'Unauthorize' : 
        case 'Not Found' : 
        case `User already registered` : 
        case `incorrect username/password` :
        case `user not yet registered` : 
            res.status(400).json(err)
            break
        case `JsonWebTokenError: jwt must be provided` : {
            res.status(400).json({ message : err.message})
            break
        }
        case 'User validation failed: email: email must valid format' : {
            res.status(400).json( { message : 'email not valid format' })
        }
        case 'User validation failed: email: email already in use' : {
            res.status(400).json( {message : 'email already in use'} )
        }
        case 'User validation failed: email: Path `email` is required.' : 
        case 'User validation failed: password: Path `password` is required.' : 
        case 'User validation failed: name: Path `name` is required.' : 
            res.status(400).json({ message : 'field must not empty'})
            break
        case 'Product validation failed: price: Path `price` is required.' : {
            res.status(400).json({ message : 'field price must not empty'})
            break
        }
        case 'Product validation failed: stock: Path `stock` is required.' : {
            res.status(400).json({ message : 'field stock must not empty'})
            break
        }
        case 'Product validation failed: name: Path `name` is required.' : {
            res.status(400).json({ message : 'field name must not empty'})
            break
        }
        case 'Validation failed: price: not valid price' :
        case 'Product validation failed: price: not valid price' : 
            res.status(400).json({ message : 'not valid price input'})
            break
        
        case 'Product validation failed: stock: not valid stock' :
        case 'Validation failed: stock: not valid stock' : 
        case 'Cart validation failed: qty: not valid stock':
        {
            res.status(400).json({ message : 'not valid stock input'})
            break
        }
        case 'Cart validation failed: product_id: Path `product_id` is required.' : {
            res.status(400).json({ message : 'field product id must not empty'})
            break
        }
        default : {
            console.log(err,'======================')
            res.status(500).json({ message : err.message})
        }
    }
}


