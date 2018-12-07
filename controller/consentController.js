import moment from 'moment';

import User from '../models/user';
import Consent  from '../models/consent';

var consentController = {};


/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.getConsentList = function(request, response) {
    User.findOne({
        userid: request.query.userId
    })
    .exec()
    .then(function (user) { 
        Consent.findOne({
            userObjectId: user._id  
        })
        .exec()
        .then(function (constents) { 
            if(constents) {
                response.status(200).json(constents);
            }
        });
    });
};

/**
 * Add user to Consent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.addConsent = function(constentDetail) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    var constentData = {
        consentList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            name:constentDetail.name,
            email: constentDetail.accountEmail,
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
    };

    //Adding account detail to AccountList
    Consent.findOneAndUpdate( 
        {
            userObjectId: constentDetail.userId,
            userEmail: constentDetail.userEmail
        },
        {
            $push: constentData
        },
        {
            safe:true,
            upsert:true
        }
    )
    .exec()
    .then(function (constent) { 
        console.log("New Constent Added")
    });
}

/**
 * Update constent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.updateConsent = function(request, response) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    
    let accountDetail = request.body.record;
    console.log('updateConsent: ', accountDetail, accountDetail.recordId);
    let element = accountDetail.recordName;

    Consent.findOneAndUpdate(           
        {},
        {
            $set:{
                "consentList.$[elm].homeCareNotes": {
                    dateTime: {
                                date:note_dateUTC,
                                hour:moment.utc(note_dateUTC,'HH'),
                                min:moment.utc(note_dateUTC,'mm')
                            },
                    value:  accountDetail.value
                }        
            }
        },
        {
            arrayFilters: [{
                "elm._id":  accountDetail.recordId                  
            }]
        }
    )
    .exec()
    .then(function (constents) { 
        console.log('consent: ', constents)
        if(constents) {
            response.status(200).json({
                constentList: constents
            });
        }
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


