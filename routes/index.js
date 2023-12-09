// main home route
const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');



router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/review', require('./review'));
router.use('/reset', require('./reset'));
router.get('/', passport.checkAuthentication, homeController.home);
router.post('/completeReview',passport.checkAuthentication, homeController.completeReview);
router.get('/delete/:id', homeController.deleteReview);
router.get('*', homeController.errorPage);

module.exports = router;