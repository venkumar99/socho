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
    let payload = request.body;

    User.findOne({
        userid: payload.userId
    })
    .exec()
    .then(function (user) { 
        if(payload.id === 'Bath') {
            dailyVitalsController.addBath(payload, user._id, response);           
        } else if (payload.id === 'Fall') {
            dailyVitalsController.addFall(payload, user._id, response)
        } else if (payload.id === 'BloodPressure') {
            dailyVitalsController.addBloodPressure(payload, user._id, response)
        } else if (payload.id === 'Mood') {
            dailyVitalsController.addMood(payload, user._id, response)
        } else if (payload.id === 'Nutrition') {
            dailyVitalsController.addNutrition(payload, user._id, response)
        } else if (payload.id === 'OtherVitals') {
            dailyVitalsController.addOtherVitals(payload, user._id, response)
        } 
    });
};

/**
 * Add Bath 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addBath= function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data =  {
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
    };

    Bath.findOneAndUpdate(
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
    .then(function (bathUpdate) {
        console.log('bathUpdate', bathUpdate)
        res.status(200).json({
            message: 'Added bath data successfully'
        });
    });

}

/**
 * Add Fall
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addFall = function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data = {
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
    };

    Fall.findOneAndUpdate(
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
    .then(function (fallUpdate) {
        console.log('fallUpdate', fallUpdate)
        res.status(200).json({
            message: 'Added fall data successfully'
        });
        
    });
}

/**
 * Add Blood Pressure 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addBloodPressure = function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data = {
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
    };

    BloodPressure.findOneAndUpdate(
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
    .then(function (bloodPressureUpdate) {
        console.log('bloodPressureUpdate', bloodPressureUpdate)
        res.status(200).json({
            message: 'Added blood pressure data successfully'
        });
        
    });
}

/**
 * Add Mood 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addMood =  function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data = {
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
    };
console.log('addMood',payload, id )
    Mood.findOneAndUpdate(
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
    .then(function (moodUpdate) {
        console.log('moodUpdate', moodUpdate)
        res.status(200).json({
            message: 'Added mood data successfully'
        });
    });
}

/**
 * Add Nutrition
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addNutrition = function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data = {
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
    };

    Nutrition.findOneAndUpdate(
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
    .then(function (nutritionUpdate) {
        console.log('nutritionDetail', nutritionUpdate)
        res.status(200).json({
            message: 'Added nutrition data successfully'
        });
        
    });
}

/**
 * Add Other Vitals 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addOtherVitals = function (payload, id, res) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let data = {
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
    };

    OtherVitals.findOneAndUpdate(
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
    .then(function (otherVitalUpdate) {
        console.log('otherVitalUpdate', otherVitalUpdate)
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

module.exports = dailyVitalsController;