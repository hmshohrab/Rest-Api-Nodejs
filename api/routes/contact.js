const express = require('express');
const router = express.Router();

const contactController = require("../controllers/ContactController")
 
const contacts = []


router.get('/',contactController.getContactList);

router.post('/',contactController.postNewContact)

router.get('/:id',contactController.getSingleContact);


router.put('/:id',contactController.editContact);


router.delete('/:id',contactController.deleteSingleContact);
 module.exports  = router 