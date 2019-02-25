import moment from 'moment';
import User from '../models/user';
import Bath from '../models/bath';
import Fall from '../models/fall';
import BloodPressure from '../models/bloodPressure';
import Mood from '../models/mood';
import Nutrition from '../models/nutrition';
import OtherVitals from '../models/otherVitals';


var dailyVitalsController = {};


/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
// dailyVitalsController.getListofVitals = function(request, response) {
//     User.findOne({
//         userid: request.query.userId
//     })
//     .exec()
//     .then(function (user) { 
//         Consent.findOne({
//             userObjectId: user._id  
//         })
//         .exec()
//         .then(function (constents) { 
//             if(constents) {
//                 console.log('consent ', constents)
//                 response.status(200).json(constents);
//             } else {
//                 response.status(204).json({error: 'No Consent'});
//             }
//         });
//     });
// };

async function getDetail(modelName, id) {
    let bathData = await modelName.findOne({ userObjectId: id}).exec();
}

/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
dailyVitalsController.updateVitals = function(request, response) {
    console.log('dailyVitalsController', request.body);
    let payload = request.body;

    User.findOne({
        userid: request.query.userId
    })
    .exec()
    .then(function (user) { 
        console.log('updateVitals', user)
        if(payload.id === 'Bath') {
            dailyVitalsController.updateDetail('Bath', user._id, this.bathPayload(payload), response);
        } else if (payload.vitalName === 'Fall') {
            dailyVitalsController.updateDetail('Fall', user._id, this.fallPayload(payload), response);
        } else if (payload.vitalName === 'BloodPressure') {
            dailyVitalsController.updateDetail('BloodPressure', user._id, this.bloodPressurePayload(payload), response);
        } else if (payload.vitalName === 'Mood') {
            dailyVitalsController.updateDetail('Mood', user._id, this.moodPayload(payload), response);
        } else if (payload.vitalName === 'Nutrition') {
            dailyVitalsController.updateDetail('Nutrition', user._id, this.nutritionPayload(payload), response);
        } else if (payload.vitalName === 'OtherVitals') {
            dailyVitalsController.updateDetail('OtherVitals', user._id, this.otherVitalsPayload(payload), response);
        } 
    });
};


dailyVitalsController.updateDetail = function (modelName, id, data, res) {
    modelName.findOneAndUpdate(
        {   
            userObjectId: id
        },
        {
            $push: data
        },
        {
            safe:true,
            upsert:true
        }
    )
    .exec()
    .then(function (modelUpdate) {
        console.log('updateDetail', modelUpdate)
        if(modelUpdate) {
            res.status(200).json({
                message: 'Added Successfully'
            });
        }
    });
}

dailyVitalsController.bathPayload = function (payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        bathList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            isBathTaken: payload.isBathTaken,
            isAssistanceNeeded: payload.isAssistanceNeeded  
        }
    }
}

function fallPayload(payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        fallList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            isFalls: payload.isFalls,
            number: payload.number
        }
    }
}

function bloodPressurePayload(payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        bloodPressureList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            sysValue: payload.sysValue,
            diaValue: payload.diaValue,
            bpmValue: payload.bpmValue,
            sys:{ 
                minimumValue: payload.sys.minimumValue,
                maximumValue: payload.sys.maximumValue,
                step: payload.sys.step
            },
            dia: { 
                diaMinimumValue: payload.dia.diaMinimumValue,
                diaMaximumValue: payload.dia.diaMaximumValue,
                diaStep: payload.dia.diaStep
            },
            bpm: { 
                bpmMinimumValue: payload.bpm.bpmMinimumValue,
                bpmMaximumValue: payload.bpm.bpmMaximumValue,
                bpmStep: payload.bpm.bpmStep
            }
        }
    }
}

function moodPayload(payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        moodList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            isGood: payload.isGood,
            isFatigued: payload.isFatigued,
            isTired: payload.isTired,
            isSick: payload.isSick
        }
    }
}

function nutritionPayload(payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        nutritionList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            isBreakfastTaken: payload.isBreakfastTaken,
            isLunchTaken: payload.isLunchTaken,
            isDinnerTaken: payload.isDinnerTaken,
            isAssistanceNeeded: payload.isAssistanceNeeded
        }
    }
}

function otherVitalsPayload(payload) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        otherVitalList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            noteText: payload.noteText, 
            temp: payload.temp,
            respiratory: payload.respiratory,
            pulse: payload.pulse
        }
    }
}

module.exports = dailyVitalsController;