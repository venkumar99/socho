import jwt from 'jsonwebtoken';
import User from '../models/user';
import CONFIG from '../config/config';
import nodemailer from 'nodemailer';

var jwtOptions ={};

//JWTOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;

var addUserController = {}
//Add User
addUserController.addUser = function(req,res) { 
    let userInfo = req.body.userDetail;
    console.log('adduser: ', req.body)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: CONFIG.email_host,
        port: CONFIG.email_port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: CONFIG.email_username, // generated ethereal user
            pass: CONFIG.email_password // generated ethereal password
        }
    });

    let emailToken = jwt.sign(
        {
            user: 'Ram'
        },
        CONFIG.jwt_secret_key,
        {
            expiresIn: '1d'
        }
    );
    console.log('token', 'http://localhost:3000/api/conformation/'+emailToken);
    // setup email data with unicode symbols
    let mailOptions = {
        from: CONFIG.email_username, // sender address
        to: userInfo.email, // list of receivers
        subject: 'Confirmation', // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>${userInfo.name} want add you to his/her account.</b>
               </br> 
               <p>To give access please click to this link: </br>
                  http://localhost:3000/api/conformation/${emailToken}
               </p>
            ` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return  res.status(401).json({
                userHasAuthenticated:false,
                message:'Email send Failed!'
            })
        }
        res.status(200).json({successMessageId: info.messageId });
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
};

addUserController.validateEmail = function(req, res) {
    console.log('email: ', req.params.token)
    try{
        const tokenVerify = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
        console.log('verify email: ', tokenVerify)
    } catch(e) {
        console.log('error', e)
    }
}

module.exports = addUserController;