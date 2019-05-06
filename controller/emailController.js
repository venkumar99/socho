import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import CONFIG from '../config/config';
import path from 'path';
//import addUserController from './addUserController';

var jwtOptions = {};
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;

var emailController = {};

/**
 * This method send email to user
 * @param {Object} req 
 * @param {Object} res 
 */
emailController.emailSender= function(req, res, userInfo) {
    let emailToken = jwt.sign(
        {
            userId: userInfo.userId,
            emailSend: userInfo.email
        },
        CONFIG.jwt_secret_key,
        {
            expiresIn: '1d'
        }
    );

    sgMail.setApiKey(CONFIG.email_api_key);

    const msg = {
        to: userInfo.email,
        from: CONFIG.email_username,
        subject: 'Confirmation',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<b>${userInfo.fullName} want to get access to your account.</b>
                </br> 
                <p>To give access please click to this link: </br>
                http://35.237.139.25:3000/api/conformation/${emailToken}
                </p>` // html body,
    };

    sgMail.send(msg, (error, result) => {
        if (error) {
        console.log("Error while sending email", error)
        }
        else {
        console.log("Email was send ");
        res.status(200).json({message: "Email was send to " +  userInfo.email});
        }
    });
}

/**
 * Validate Email
 * @param {Object} req 
 * @param {Object} res 
 */
emailController.validateEmail = function(req, res) {

    try {
        const tokenVerify = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
        res.sendfile(path.join('./public/emailVerify.html'));
    } catch(e) {
        //res.sendfile(path.join('./public/emailVerify.html')); //need to be fixed
        console.log('error expried', e)
    }
}

/**
 * Email response
 * @param {Object} req 
 * @param {Object} res 
 */
// emailController.emailResponse = function(req, res) {
//     addUserController.log();
//     try { 
//         if(req.params.response === 'accept') {
//             const tokenVerified = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
//             if(tokenVerified) {
//                 console.log(tokenVerified);
                
//                 addUserController.updateAccount(tokenVerified, res);
//             }
//         } else {
//             res.status(200).json('<h3>Thank you for decline</h3>');
//         }
//     } catch(e) {
//         console.log('error', e)
//     }
// }

module.exports = emailController;