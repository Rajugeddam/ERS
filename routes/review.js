// review route
const express = require('express');

const router = express.Router();
const adminController = require('../controller/review_controller');
const passport = require('passport');

router.get('/assignWork',passport.checkAuthentication, adminController.home);
router.post('/createReview',adminController.createReview);

module.exports = router;