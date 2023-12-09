// code for admin route
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin_controller');
const passport = require('passport');

router.get('/page', passport.checkAuthentication, adminController.adminPage);
router.get('/makeadmin/:id',passport.checkAuthentication, adminController.makeAdmin);
router.get('/removeadmin/:id',passport.checkAuthentication, adminController.removeAdmin);
router.get('/delete/:id',passport.checkAuthentication, adminController.deleteEmployee);
router.post('/update/:id',passport.checkAuthentication, adminController.update);

module.exports = router;