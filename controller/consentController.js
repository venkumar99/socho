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
    Consent.findOne({
        userObjectId: request.query.userId  
    })
    .exec()
    .then(function (constents) {
        if(constents) { 
            let constentList = [];
            constents.userList.forEach(element => {
                let data = {
                    name: element.name,
                    email: element.email,
                    id: element.id,
                    consentList: element.consentList[element.consentList.length - 1]
                } 
                constentList.push(data); 
            });
            console.log('consent ', constentList);           
            response.status(200).json({
                constentList: constentList
            });
        } else {
            response.status(204).json({error: 'No Consent'});
        }
    });
};

/**
 * Add user to Consent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.addConsent = function(constentDetail, res) {  
    var dateTime = consentController.getDateTime();
    var constentData = {
        userList: {
            dateTime: dateTime,
            name:constentDetail.name,
            email: constentDetail.accountEmail,
            id: constentDetail.accountEmail,        
            consentList: [{
                dateTime: dateTime,
                allInformation: {
                    dateTime: dateTime,
                    value: false
                },
                dailyVitals: {
                    dateTime: dateTime,
                    value: false
                },
                homeCareNotes: {
                    dateTime: dateTime,
                    value: false
                },
                medicalRecords: {
                    dateTime: dateTime,
                    value: false
                },
                medication: {
                    dateTime: dateTime,
                    value: false
                }
            }]
        }
    };
    //Adding account detail to AccountList
    Consent.findOneAndUpdate( 
        {
            userObjectId: constentDetail.userId,
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
        console.log("New Constent Added", constent)
        res.status(200).json('User Added');
    })
    .catch((err) => {
        console.error("Fail to add new constent", err) ;
    });
}

/**
 * Update constent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.updateConsent = function(request, response) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    var dateTime=  consentController.getDateTime();
    let accountDetail = request.body.record;
    let consentKeyValue = "userList.0.consentList.0." + [accountDetail.recordName] + ".value";
    let consentKeyData = "userList.0.consentList.0." + [accountDetail.recordName] + ".dateTime";
    let updateData = {
        [consentKeyData]: dateTime,
        [consentKeyValue]: accountDetail.value
    }
    Consent.updateOne(           
        {
            userObjectId: accountDetail.userObjectId,
            'userList.id': accountDetail.recordId
        },
        {
            $set: updateData
        },
        { 
            new: true 
        }
    )
    .exec()
    .then(function (consents) { 
        console.log('constent1', consents);
       // let consentData = consents.userList.consentList[consents.userList.consentList.length - 1];
        // if(consentData) {
        //     consentData.dateTime = dateTime;
        //     if('allInformation' === accountDetail.recordName) {
        //         consentData.allInformation.dateTime = dateTime;
        //         consentData.allInformation.value = accountDetail.value;
        //     } else if ('dailyVitals' === accountDetail.recordName) {
        //         consentData.dailyVitals.dateTime = dateTime;
        //         consentData.dailyVitals.value = accountDetail.value;
        //     } else if ('homeCareNotes' === accountDetail.recordName) {
        //         consentData.homeCareNotes.dateTime = dateTime;
        //         consentData.homeCareNotes.value = accountDetail.value;
        //     } else if ('medicalRecords' === accountDetail.recordName) {
        //         consentData.medicalRecords.dateTime = dateTime;
        //         consentData.medicalRecords.value = accountDetail.value;
        //     } else if ('medication' === accountDetail.recordName) {
        //         consentData.medication.dateTime = dateTime;
        //         consentData.medication.value = accountDetail.value;
        //     } 

        //     let updatedConsent = {
        //         consentList: consentData
        //     };
        //         console.log("update : ",  consentData);

        //         Consent.findOneAndUpdate( 
        //             {
        //                 userEmail: consents.userEmail
        //             },
        //             {
        //                 $push: updatedConsent
        //             },
        //             {
        //                 safe:true,
        //                 upsert:true
        //             }
        //         )
        //         .exec()
        //         .then(function (constentAdd) { 
        //             console.log("New Constent Added")
        //             console.log('consent1: ', consents)
        //             response.status(200).json({
        //                 constentList: consents
        //             });
        //         });
        // }
    });
   
}

/**
 * Delete constent
 * @param {Object} request 
 * @param {Object} response 
 */
consentController.deleteConsent = function(request, response) {

}

/**
 * @desc return current data and time 
 */
consentController.getDateTime = function () { 
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        date:note_dateUTC,
        hour:moment.utc(note_dateUTC,'HH'),
        min:moment.utc(note_dateUTC,'mm')
    }
}

module.exports = consentController;


