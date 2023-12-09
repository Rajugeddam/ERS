const User = require('../model/users');
const queue = require('../config/kue');
const crypto = require('crypto');
const resetWorkers = require('../workers/reset_mail_workers');
const Reset = require('../model/reset');


// show the page of forgot
module.exports.forgotGet = function(req, res){
    return res.render('forgot', {
        title: 'ESR | Forgot Password'
    })
}

// code for reset the password
module.exports.passwordReset = async function(req, res){
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const resetVerify = await Reset.create({
                email: req.body.email,
                isValid: true,
                acessToken: crypto.randomBytes(20).toString('hex')
            });
            const job = queue.create('reset', resetVerify).save(function(err){
                if(err){
                    console.log("Error", err)
                }
                return res.redirect('back')
            })
        }else{
            return res.redirect('/user/sign-up')
        }
    } catch (error) {
        console.log("error", error);
        
    }
}

// code for show the reset page
module.exports.resetPassPage = async function(req, res){
    try {
        let confirm = await Reset.findOne({acessToken: req.query.acessToken})
        console.log('confirm', confirm)
        if(confirm.isValid == false){
            return res.redirect('*');
        }
        return res.render('recover', {
            title: 'ESR | Reset Password',
            token: req.query.acessToken,
            isValid:true

        })
    } catch (error) {
        console.log("Error", error);
    }
}

// code for update the new password
module.exports.updatePassword = async function(req, res){
    try {
        if(req.body.password !== req.body.c_password){
            return res.redirect('back')
        }
        let token = await Reset.findOne({acessToken: req.body.token})
        token.isValid = false;
        token.save();
        let user = await User.findOne({email: token.email});
        user.password = req.body.password;
        user.save();
        req.flash("success", "password has been updated successfully");
        res.redirect('/user/sign-in')
        
    } catch (error) {
        console.log('Error', error);
    }
}