const User = require('../../models/user')

module.exports = function(done){
  if(process.env.NODE.ENV === ' test') {
    User
      .deleteMany({})
      .then(function(){
        done()
      })
      .catch(function(error){
        console.log(error);
      })
  }
}