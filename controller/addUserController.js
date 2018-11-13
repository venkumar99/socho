import jwt from 'jsonwebtoken';
import moment from 'moment';
import CONFIG from '../config/config';
import nodemailer from 'nodemailer';
import path from 'path';

import User from '../models/user';
import AccountAccessList from '../models/accountAccessList';
import AccountList  from '../models/accountList';

var jwtOptions ={};

//JWTOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;

var addUserController = {};

//Add User
addUserController.addUser = function(req,res) { 
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let userInfo = req.body.userDetail;

    let checkError = false;

    var  accountDetail = {
        accountAccessList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            email: userInfo.email,
            requestStatus: userInfo.requestStatus,
            userId : userInfo.userId,
            fullName: userInfo.fullName,
            authorizedLevel: userInfo.authorizedLevel,
            relationShip: userInfo.relationShip  
        }     
    };

    User.findOne({
        userid: userInfo.userId
    })
    .exec()
    .then(function (user) {

        AccountAccessList.findOneAndUpdate(
            {userObjectId: user._id},
            {$push: accountDetail},
            {safe:true,upsert:true}
        ).exec()
        .then(function (foundAccount) { 
            if(foundAccount) {             
                addUserController.getAccountlist(userInfo.userId, res); 
            } else {
                checkError = true   
                console.log("Error in account detail" );
            }                                         
        });      
    });

    if(!checkError) {
        addUserController.sendEmail(res,res, userInfo);
    } else {
        res.status(401).json({error: "Email Cannot be send"});
    }
};

//Validate Email
addUserController.validateEmail = function(req, res) {
    console.log('email: ', req.params.token)

    try {
        const tokenVerify = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
        console.log('verify email: ', tokenVerify)
        res.sendfile(path.join('./public/emailVerify.html'));
    } catch(e) {
        console.log('error', e)
    }
};

//Email response
addUserController.emailResponse = function(req, res) {

    try {
        const tokenVerify = jwt.verify(req.params.token, CONFIG.jwt_secret_key);

        if(req.params.response === 'accept') {
            res.status(200).json('<h3>Thank you for authorization</h3>');
        } else {
            res.status(200).json('<h3>Thank you for decline</h3>');
        }
    } catch(e) {
        console.log('error', e)
    }
};

//Get Account Detail
addUserController.getAccountDetail = function(req, res) {
    console.log("get addUser controller: ", req.body.userId);
    addUserController.getAccountlist(req.body.userId, res);
};

//Get Account List
addUserController.getAccountlist= function(id, res ) {
    console.log("get addUser controller: ",id);
    User.findOne({
        userid: id
    })
    .exec()
    .then(function (user) { 
        console.log('user data: ', user)
        AccountAccessList.findOne({ 
            userObjectId: user._id 
        }).exec(function(err, accounts) {
            if(err) {
                console.log('Error getting list of Chat', err);
                res.status(401).json({error: 'Account Not found'})
            } else {
                console.log("account list : ", accounts)
                if(accounts){
                res.status(200).json({accountList: accounts.accountAccessList}) 
                } else {
                    console.log("there is no account");
                }         
            }
        });
    });
};

//Send Email
addUserController.sendEmail= function(req, res, userInfo) {
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
            user: userInfo.name
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
            console.log("Error while sending email:", error);
            //return addUserController.getAccountDetail(req,res);
            //  res.status(401).json({
            //     userHasAuthenticated:false,
            //     message:'Email send Failed!'
            // })
            
        } else {
        res.status(200).json({successMessageId: info.messageId });
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

    });
};


addUserController.getListOfAccount= function(req, res) {
    AccountList.findOne({ 
        userObjectId: req.params.userId
    }).exec(function(err, accounts) { 
        if(err) {
            console.log("Error ", err);
        } else {
            if(accounts) {
                res.status(200).json({accountList: accounts.accountList}) 
            } else {
                res.status(204).json({accountList:[]});
            }
        }
    });
}

module.exports = addUserController;