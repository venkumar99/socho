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
                console.log('consent ', constents)
                response.status(200).json(constents);
            } else {
                response.status(204).json({error: 'No Consent'});
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
    var dateTime= {
                    date:note_dateUTC,
                    hour:moment.utc(note_dateUTC,'HH'),
                    min:moment.utc(note_dateUTC,'mm')
                }

    let accountDetail = request.body.record;
    console.log('updateConsent: ', accountDetail, accountDetail.recordId);
    let element = accountDetail.recordName;

    Consent.findOne(           
        //{userObjectId: accountDetail.userObjectId  },
        {'consentList._id': accountDetail.recordId  },
    )
    .exec()
    .then(function (consents) { 
        let consentData = consents.consentList[consents.consentList.length - 1];
        if(consentData) {
            consentData.dateTime = dateTime;
            if('allInformation' === accountDetail.recordName) {
                consentData.allInformation.dateTime = dateTime;
                consentData.allInformation.value = accountDetail.value;
            } else if ('dailyVitals' === accountDetail.recordName) {
                consentData.dailyVitals.dateTime = dateTime;
                consentData.dailyVitals.value = accountDetail.value;
            } else if ('homeCareNotes' === accountDetail.recordName) {
                consentData.homeCareNotes.dateTime = dateTime;
                consentData.homeCareNotes.value = accountDetail.value;
            } else if ('medicalRecords' === accountDetail.recordName) {
                consentData.medicalRecords.dateTime = dateTime;
                consentData.medicalRecords.value = accountDetail.value;
            } else if ('medication' === accountDetail.recordName) {
                consentData.medication.dateTime = dateTime;
                consentData.medication.value = accountDetail.value;
            } 

            let updatedConsent = {
                consentList: consentData
            };
                console.log("update : ",  consentData);

                Consent.findOneAndUpdate( 
                    {
                        userEmail: consents.userEmail
                    },
                    {
                        $push: updatedConsent
                    },
                    {
                        safe:true,
                        upsert:true
                    }
                )
                .exec()
                .then(function (constentAdd) { 
                    console.log("New Constent Added")
                    console.log('consent1: ', consents)
                    response.status(200).json({
                        constentList: consents
                    });
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


