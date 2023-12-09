const nodemailer = require('../config/nodeMailers');
const secure = require('../config/secure');

// render the mail template
exports.newMail = (link)=>{
    const htmlString = nodemailer.renderTemplate({link: link}, 'reset/reset.ejs');

    nodemailer.transporter.sendMail({
        from: secure.email,
        to: link.email,
        subject: 'Reset Password',
        html: htmlString
    }, function(err, info){
        if(err){
            console.log("Error", err)
        }
        console.log('Reset password link has been sent', info);
    })
}