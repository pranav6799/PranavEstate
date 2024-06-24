const express = require('express')
const listingController = require('../Controllers/listingController')
const verifyToken = require('../utils/verifyToken')

const router = express.Router()

router.post('/createListing',verifyToken,listingController.createListing)
router.get('/getListing/:id',listingController.getListing)
router.delete('/deleteListing/:id',listingController.deleteListing)
router.post('/updateListing/:id',listingController.updateListing)
router.get('/getlist/:id',listingController.getListings)
router.get('/getAllListings',listingController.getAllListing)
module.exports = router 
