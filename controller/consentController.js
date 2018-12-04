import moment from 'moment';

import User from '../models/user';
import AccountList  from '../models/accountList';

var consentController = {};


/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.getConsentList = function(request, response) {
    User.findOne({
        userid: req.body.userId
    })
    .exec()
    .then(function (user) { 
        AccountList.findOne({
            userObjectId: user._id  
        })
        .exec()
        .then(function (constents) { 
            if(constentList) {
                response.status(200).json({
                    constentList: constents
                });
            }
        });
    });
};

/**
 * Add user to Consent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.addConsent = function(request) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let constentDetail = request.userInfo;

    let constentData = {
        consentList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            accountId: constentDetail.accountId,
            name:constentDetail.name,
            allInformation: {
                dateTime: {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                },
                value: false
            },
            dailyVitals: {
                dateTime: {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                },
                value: false
            },
            homeCareNotes: {
                dateTime: {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                },
                value: false
            },
            medicalRecords: {
                dateTime: {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                },
                value: false
            },
            medication: {
                dateTime: {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                },
                value: false
            },

        }
    }

    User.findOne({
        userid: req.body.userId
    })
    .exec()
    .then(function (user) { 
        AccountList.findOneAndUpdate( 
            {userObjectId: user._id},
            {$push: constentData},
            {safe:true,upsert:true}
        )
        .exec()
        .then(function (constent) { 
            console.log("Constent Added : ", constent)
        });
    });
}

/**
 * Update constent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.updateConsent = function(request, response) {


    User.findOne({
        userid: req.body.userId
    })
    .exec()
    .then(function (user) { 
        AccountList.findOneAndUpdate(           
            {
                userObjectId: user._id
            },
            {
                $set:{
                    "consentList.$[elemtent].dateTime": request.value,
                    "consentList.$[elemtent].value": request.value,
                }
            },
            {
                arrayFilters: {
                    "consentList.accountId": {
                        $gte:request.accountId
                    }
                }
            }
        )
        .exec()
        .then(function (constents) { 

            if(constentList) {
                response.status(200).json({
                    constentList: constents
                });
            }
        });
    });
}

/**
 * Delete constent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.deleteConsent = function(request, response) {

}

module.exports = consentController;


