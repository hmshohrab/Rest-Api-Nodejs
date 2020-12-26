const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = (req, res, next) =>{
   try{
       const token = req.headers.authorization.split(' ')[1]
       var decoded = jwt.verify(token, 'SECRET');
      req.user = decoded
      next()
   }catch(error){
      res.json({
         message: "Authentication Failed"
      })
   }
}

module.exports = authenticate