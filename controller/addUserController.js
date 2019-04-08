import jwt from 'jsonwebtoken';
import moment from 'moment';
import sgMail from '@sendgrid/mail';
import CONFIG from '../config/config';
import nodemailer from 'nodemailer';
import path from 'path';

import User from '../models/user';
import AccountAccessList from '../models/accountAccessList';
import AccountList  from '../models/accountList';
import consentController from './consentController';


var jwtOptions ={};
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;

var addUserController = {};

/**
 * Send email to user to get account approved
 * @param {Object} req 
 * @param {Object} res 
 */
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
        addUserController.emailSender(req,res, userInfo);
    } else {
        res.status(401).json({error: "Email Cannot be send"});
    }
};

/**
 * Validate Email
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.validateEmail = function(req, res) {

    try {
        const tokenVerify = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
        res.sendfile(path.join('./public/emailVerify.html'));
    } catch(e) {
        console.log('error', e)
    }
};


/**
 * Email response
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.emailResponse = function(req, res) {

    try { 
        if(req.params.response === 'accept') {
            const tokenVerified = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
            if(tokenVerified) {
                addUserController.updateAccount(tokenVerified, res);
            }
        } else {
            res.status(200).json('<h3>Thank you for decline</h3>');
        }
    } catch(e) {
        console.log('error', e)
    }
};

/**
 * Get Account 
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.getAccountDetail = function(req, res) {
    addUserController.getAccountlist(req.body.userId, res);
};

/**
 * Get Account List
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.getAccountlist= function(id, res ) {
    User.findOne({
        userid: id
    })
    .exec()
    .then(function (user) { 
        AccountAccessList.findOne({ 
            userObjectId: user._id 
        }).exec(function(err, accounts) {
            if(err) {
                console.log('Error getting list of Chat', err);
                res.status(401).json({error: 'Account Not found'})
            } else {
                if(accounts){
                res.status(200).json({accountList: accounts.accountAccessList}) 
                } else {
                    console.log("there is no account");
                }         
            }
        });
    });
};

/**
 * This method send email to user
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.emailSender= function(req, res, userInfo) {
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
        console.log("Email was send ", result)
        res.status(200).json({successMessageId: '123445' });
        }
    });
}

/**
 * Get list of approved account
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.getListOfAccount= function(req, res) {
    //console.log("User Email : ",req.query.userId);
    User.findOne({
        userid: req.query.userId
    })
    .exec()
    .then(function (user) { 
        console.log("User", user)
        AccountList.findOne({ 
            userObjectId:user._id  
        }).exec(function(err, accounts) { 
            if(err) {
                console.log("Error ", err);
            } else {
                if(accounts) {
                    //console.log('User List', accounts)
                    res.status(200).json({accountList: accounts.accountList}) 
                } else {
                    res.status(204).json({accountList:[]});
                }
            }
        });
    });
}

/**
 * Update the AccountList json file with new approved account
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.updateAccount = function(userDetail, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    User.findOne({
        userid: userDetail.userId
    })
    .exec()
    .then(function (user) { 
        AccountAccessList.findOne({
            userObjectId: user._id 
        })
        .exec()
        .then(function (accountDetail) {
            var account = accountDetail.accountAccessList.find(function(item){
                if(item.email === userDetail.emailSend) {
                    return item;
                }
            });

            if(account) {
                let accountInfo = {
                    accountList: {
                        dateTime: {
                            date:note_dateUTC,
                            hour:moment.utc(note_dateUTC,'HH'),
                            min:moment.utc(note_dateUTC,'mm')
                        },
                        email: account.email,
                        userId : account.userId,
                        fullName: account.fullName,
                        authorizedLevel: account.authorizedLevel,
                        relationShip: account.relationShip  
                    }     
                };

                AccountList.findOneAndUpdate(            
                    {userObjectId: user._id},
                    {$push: accountInfo},
                    {safe:true,upsert:true}
                )
                .exec()
                .then(function (accountDetail) {
                    console.log('account', account);
                    let detail = {
                        userId: user._id,
                        userEmail:account.userId,
                        accountEmail:account.email,
                        name: account.fullName 
                    };
                    consentController.addConsent(detail);
                    res.status(200).json('<h3>Thank you for authorization</h3>');
                });
            }
        });

    });
}

addUserController.graphs = function(req, res) {
    res.sendFile('dygraphs.html', { root: path.join(__dirname, '../public')});
}


module.exports = addUserController;