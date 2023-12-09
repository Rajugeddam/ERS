// code for paasport local stratergy

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/users');

// use the localstratergy
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        try {
            const user = await User.findOne({email: email})
            if (!user || user.password !== password){
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            console.log("Error", error)
            return done(error)
            
        }
    }
));

// seriallize the passport localauthentication
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// deseriallize the passport localauthentication

passport.deserializeUser(async function(id, done){
    try {
        let user = await User.findById(id)
        if(user){
            return done(null, user)
        }
    } catch (error) {
        console.log('Error in finding the user--Passport');
        return done(error);
    }
})

// code for check the authentication
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in')
}

// code for set the authentication
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport