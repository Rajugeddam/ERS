// code for set the middleware for mailer

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const secure = require('./secure');

// create the transporter for nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: secure.user,
        pass: secure.pass
    }
});

// render the template for nodemailer
let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML
}

// esport both the function
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}