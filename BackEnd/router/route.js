const express= require('express');
const router=express.Router();
const auth=require('../middleware/auth')
const userController=require('../controller/user');
const user = require('../models/user');
//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//get All USers
router.get('/getUser',userController.getAllUserDetails)

//edit user details
router.get('/editUser/:_id',userController.getID);
router.put('/editUser/:_id',userController.editUserDetails);
router.post('/editUser',userController.editUserDetails);

//delete User
router.delete('/deleteUsers/:_id', userController.deleteUsers)





module.exports = router