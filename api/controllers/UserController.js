const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req, res,next) =>{
   const name = req.body.name
   const email = req.body.email
   const phone = req.body.phone
   const password = req.body.password
 
   bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err){
         res.json({
            error: err
         })
      }
      let user = new User({
         name,
         phone,
         email,
         password :hash
      })
      user.save().then((result) =>{
        // result.toJSON()
         //console.log(result);
       // delete result.__v;
         res.status(200).json({
           message: "User created successfully.",
           data : result
         })
       }).catch(err => {
          res.status(500).json({
             error: err
          })
       }) 
   });
 }

 const login = (req, res,next) =>{
   const name = req.body.name
   const email = req.body.email
   const phone = req.body.phone
   const password = req.body.password
 
      User.findOne({phone})
      .then(user =>{
         if(user){
              // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
               // result == true
               console.log(password)
               console.log(user.password)
               if(err){
                  res.json({
                     message: "Error Occured"
                  })
               }
               if(result){
                  let token = jwt.sign({
                     name: user.name,
                     email: user.email,
                     phone: user.phone
                   }, 'SECRET', {expiresIn : '2d'})
                  var decoded = jwt.verify(token, 'SECRET');
                   res.json({
                     message: "Login Successful",
                     token
                  })
               }else{
                  res.json({
                     message: "Login Failed Password Doesn\'t match"
                  })
                  
               }
            }); 
         }else{
            res.json({
               message: "User not found"
            })
         }
      })
   }

 const getAllUsers = (req, res,next) =>{
 
   User.find().then((result) =>{
         res.status(200).json({
           message: "Some data found.",
           data : result,
           user: req.user
         })
       }).catch(err => {
          res.status(500).json({
             error: err
          })
       }) 
   }


 module.exports = {
    register,
    login,
    getAllUsers
 }