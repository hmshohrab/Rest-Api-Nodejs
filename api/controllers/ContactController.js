const Contact = require('../models/ContactItem')



const postNewContact = (req, res,next) =>{
   const name = req.body.name
   const email = req.body.email
   const phone = req.body.phone
 
 
   const contacts = new Contact({
     name: name,
     phone :phone,
     email: email
   })
   contacts.save().then((data) =>{
     res.status(200).json({
       message: "Data saved successfully.",
       data : data
     })
   } 
   ).catch(err => {
     console.log(err)
   })
 }

 const getContactList = (req, res, next) => {
   // res.send("<h1>Hello <h1>World</h1></h1>")
   Contact.find().then(data =>{
     res.status(200).json({
       message: "All Contatcts",
       data: data
     })
     
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       message: "Error Occured.",
       error: err
     })
   })
 }

 const getSingleContact = (req,res, next) =>{
    let id = req.params.id
    Contact.findById(id).then(data =>{
      if(data){
        res.status(200).json({
          message: "Found Success.",
          data
       }) 
      }else{
        res.status(200).json({
          message: "No data found!"
       }) 
      }
    
    }).catch(err =>{
        res.status(500).json({
         message: "Error Occured.",
         error: err
       })
    })


 }

 const deleteSingleContact = (req,res, next) =>{
   let id = req.params.id
      Contact.findByIdAndRemove(id).then(data =>{
        if(data){
          res.status(200).json({
            message: "Contact Deleted.",
            data
         }) 
        }else{
          res.status(200).json({
            message: "Data Not Found.",
            data
         }) 
        }
      }).catch(err =>{
        res.status(500).json({
           message: "Error Occured.",
           error: err
         })
      })
   }

   const editContact = (req,res, next) =>{
      let id = req.params.id
      let name = req.body.name
      let email = req.body.email
      let phone = req.body.phone

      let updatedContact = {
         name: name,
         phone,
         email
      }
         Contact.findByIdAndUpdate(id,{$set: updatedContact}).then(contact =>{
            Contact.findById(contact._id).then(newContact =>{
               res.status(200).json({
                  message: "Contact Updated..",
                  newContact
               }) 
            })
         
         }).catch(err =>{
           res.status(500).json({
              message: "Error Occured.",
              error: err
            })
         })
      }

 module.exports = {
    getContactList,
    postNewContact,
    getSingleContact,
    deleteSingleContact,
    editContact
 }