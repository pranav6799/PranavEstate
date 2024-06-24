const express = require('express')
const authController = require('../Controllers/authController')
const veryifyToken = require('../utils/verifyToken')
const userController = require('../Controllers/userController')

const router = express.Router()

router.post('/signUp',authController.register)
router.post('/login',authController.login)
router.post('/google',authController.google)
router.post('/update/:id',veryifyToken,userController.updateUser)
router.delete('/delete/:id',veryifyToken,userController.deleteUser)
router.post('/signOut',userController.signOut)
router.get('/getUser/:id',veryifyToken,userController.getUser)

module.exports = router

