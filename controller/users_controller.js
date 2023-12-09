const User = require("../model/users");
const passport = require('passport');

// code for show the sign in page
module.exports.signIn = async function(req, res){
    try {
        return res.render('user_sign_in', {
            title: "Employee Review System | Sign In"
        })
        
    } catch (error) {
        console.log("Error", error);
        return;
        
    }
}

// code for show the employee sign up page
module.exports.employeeSignIn = async function(req, res){
    try {
        return res.render('employee_add', {
            title: 'ESR | Employee Sign In'
        })
    } catch (error) {
        
    }
}

// code for show the admin sign up page
module.exports.signUp = async function(req, res){
    try {
        return res.render('user_sign_up', {
            title: "Employee Review System | Sign Up"
        })
    } catch (error) {
        console.log("Error", error);
        return;
    }
}

// code for create the admin
module.exports.create = async function(req, res){
    try {
        if(req.body.password != req.body.c_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: true
            })
        }else{
            req.flash('success', "User already exists")
            return res.redirect('back')
        }
        req.flash('success', "Admin created successfully")
        return res.redirect('/user/sign-in')
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'Something Error to create the Admin')
        return;
    }
}

// code for create the Employee
module.exports.createEmployee = async function(req, res){
    try {
        if(req.body.password != req.body.c_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            })
        }else{
            req.flash('success', 'Employee Already Exist Successfully')
            return res.redirect('back')
        }
        req.flash('success', 'Employee Created Successfully')
        return res.redirect('back')
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'Something Error to create the Employee')
        return;
    }
}

// code for check the user type
module.exports.addEmployee = async function(req, res){
    try {
        let user = await User.findById(req.params.id);

        user.isAdmin = false;
        user.save();
        req.flash('success', 'Employee Adedd Successfully')
        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
        req.flash('error', 'Somethin Error to add Employee')
        return;
    }
}

module.exports.createSession = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) {
        console.log("Error in passport authentication", err);
        req.flash('error', 'Something Error')
        return res.redirect('/user/sign-in');
      }
  
      if (!user) {
        req.flash('error', 'user not found')
        return res.redirect('/user/sign-in');
      }
  
      // Redirect based on isAdmin status
      if (user.isAdmin) {
        req.flash('success', "Admin Page")
        return res.redirect('/admin/page'); // Redirect to admin page
      } else {
        req.flash('success', "Employee Page")
        return res.redirect('/'); // Redirect to home page (or any other desired route)
      }
    })(req, res, next);
  };

  module.exports.destroySession = function(req, res){
    req.logout(function (error){
        if(error){
            console.log("Error while signing out")
            return res.redirect('back')
        }
        req.flash('success', 'Signing out Successfully')
        return res.redirect('/user/sign-in')
    })
  }