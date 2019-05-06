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
import emailController from './emailController';


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

    AccountAccessList.find(
        {
            userObjectId: userInfo.userId,
            "accountAccessList.email": userInfo.email 
        }
    )
    .exec()
    .then(function (detail) { 
        if(detail && detail.length > 0) {
            res.status(200).json({
                message: `${userInfo.email} is already taken.`
            }) 
        } else {
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

            AccountAccessList.findOneAndUpdate(
                {
                    userObjectId: userInfo.userId
                },
                {
                    $push: accountDetail
                },
                {
                    safe:true,
                    upsert:true,
                    new: true
                }
            ).exec()
            .then(function (foundAccount) { 
                if(foundAccount) {            
                    emailController.emailSender(req, res, userInfo);
                } else { 
                    console.log("Error in account detail" );
                    res.status(401).json({error: "Email Cannot be send"});
                }                                         
            });      
        }
        
    }) 
};

/**
 * Email response
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.emailResponse = function(req, res) {
    console.log('update');
    try { 
        if(req.params.response === 'accept') {
            const tokenVerified = jwt.verify(req.params.token, CONFIG.jwt_secret_key);
            if(tokenVerified) {
                console.log(tokenVerified);
                addUserController.updateAccount1(tokenVerified, res);
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
    AccountAccessList.findOne({ 
        userObjectId: id 
    }).exec(function(err, accounts) {
        if(err) {
            console.log('Error getting list of Chat', err);
            res.status(401).json({error: 'Account Not found'})
        } else {
            var accountList = [];
            if(accounts) {
                accountList =  accounts.accountAccessList
            }          
            res.status(200).json({accountList: accountList})        
        }
    });
};

/**
 * Get list of approved account
 * @param {Object} req 
 * @param {Object} res 
 */
addUserController.getApprovedAccounts= function(req, res) {
    User.findOne({
        userid: req.query.userId
    })
    .exec()
    .then(function (user) { 
        AccountList.findOne({ 
            userObjectId:user._id  
        }).exec(function(err, accounts) { 
            if(err) {
                console.log("Error ", err);
            } else {
                if(accounts) {
                    let accountListData;
                    if(accounts.accountList) {                   
                        let userDetail = [{
                            fullName: user.firstName + ' ' + user.lastName
                        }];
                        accountListData = userDetail.concat(accounts.accountList);
                    }
                    console.log("accountListData ", accountListData);
                    res.status(200).json({accountList: accountListData}) 
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
addUserController.updateAccount1 = function(userDetail, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    AccountAccessList.findOneAndUpdate(
        {
            userObjectId: userDetail.userId,
            "accountAccessList.email": userDetail.emailSend
        },
        {
            $set: { "accountAccessList.$.requestStatus" : "Success" } 
        },
        { new: true }
    )
    .then(function (accountDetail) {
        console.log('accountDetail', accountDetail);
        var account = accountDetail.accountAccessList.find(function(item){
            if(item.email === userDetail.emailSend) {
                return item;
            }
        });

        if(account) {
            let accountInfo = {
                accountList: account    
            };

            AccountList.findOneAndUpdate(            
                {userObjectId: userDetail.userId},
                {$push: accountInfo},
                {safe:true,upsert:true}
            )
            .exec()
            .then(function (accountDetail) {
                console.log('account', account);
                let detail = {
                    userId: userDetail.userId,
                    userEmail:account.userId,
                    accountEmail:account.email,
                    name: account.fullName 
                };
                consentController.addConsent(detail);
                res.status(200).json('<h3>Thank you for authorization</h3>');
            });
        }
    });

}

addUserController.graphs = function(req, res) {
    res.sendFile('dygraphs.html', { root: path.join(__dirname, '../public')});
}

module.exports = addUserController;