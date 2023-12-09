// user route
const express = require('express');

const router = express.Router();

const userController = require('../controller/users_controller');
const passport = require('passport');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.get('/empSign-up', userController.employeeSignIn);
router.post('/createemp', userController.createEmployee);
router.post('/create-session', passport.authenticate('local',
{failureRedirect: '/user/sign-in'}), userController.createSession);

router.get('/signOut', userController.destroySession);

module.exports = router;