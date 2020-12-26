const express = require('express');
const authenticate = require('../middleware/authenticate')
const router = express.Router();

const userController = require("../controllers/UserController")
 
const contacts = []


router.get('/',authenticate, userController.getAllUsers);

router.post('/login',userController.login)
router.post('/register',userController.register)

module.exports  = router 