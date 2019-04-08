import moment from 'moment';
import User from '../models/user';
import Bath from '../models/bath';
import Fall from '../models/fall';
import BloodPressure from '../models/bloodPressure';
import Mood from '../models/mood';
import Nutrition from '../models/nutrition';
import OtherVitals from '../models/otherVitals';
import Bowell from '../models/bowell';
import CognitiveCare from '../models/cognitiveCare';
import Diabetic from '../models/diabetic';
import Hygiene from '../models/hygiene';
import Pain from '../models/pain';
import Sleep from '../models/sleep';
import LastUpdate from '../models/lastUpdate';



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
 * @desc Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
dailyVitalsController.updateVitals = function(request, response) {
    // let payload = request.body;

    // User.findOne({
    //     userid: payload.userId
    // })
    // .exec()
    // .then(function (user) { 
    //     if(payload.id === 'Bath') {
    //         dailyVitalsController.addBath(payload, user._id, response);           
    //     } else if (payload.id === 'Fall') {
    //         dailyVitalsController.addFall(payload, user._id, response)
    //     } else if (payload.id === 'BloodPressure') {
    //         dailyVitalsController.addBloodPressure(payload, user._id, response)
    //     } else if (payload.id === 'Mood') {
    //         dailyVitalsController.addMood(payload, user._id, response)
    //     } else if (payload.id === 'Nutrition') {
    //         dailyVitalsController.addNutrition(payload, user._id, response)
    //     } else if (payload.id === 'OtherVitals') {
    //         dailyVitalsController.addOtherVitals(payload, user._id, response)
    //     } 
    // });
};

/**
 * @desc Add Bath 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addBath= function (request, res) {
    let payload = request.body;
    let data =  {
        bathList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isBathTaken: payload.isBathTaken,
            isAssistanceNeeded: payload.isAssistanceNeeded  
        }
    };

    Bath.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('bathUpdate', bathUpdate);
        dailyVitalsController.lastUpdate(payload.userId, 'bath',  payload.isBathTaken);
        res.status(200).json({
            message: 'Added bath data successfully'
        });
    });

}

/**
 * @desc Add Fall
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addFall = function (request, res) {
    let payload = request.body;
    let data = {
        fallList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            number: payload.number,
            todayFalls: payload.todayFalls,
            todayWalk: payload.todayWalk,
            climbTrouble: payload.climbTrouble,
            stepWalk: payload.stepWalk,
            climbed: payload.climbed,
            distance: payload.distance
        }
    };

    Fall.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('fallUpdate', fallUpdate);
        dailyVitalsController.lastUpdate(payload.userId, 'fall',  payload.number);
        res.status(200).json({
            message: 'Added fall data successfully'
        });
        
    });
}

/**
 * @desc Add Blood Pressure 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addBloodPressure = function (request, res) {
    let payload = request.body;
    let data = {
        bloodPressureList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            sysValue: payload.sysValue,
            diaValue: payload.diaValue,
            bpmValue: payload.bpmValue
        }
    };

    BloodPressure.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('bloodPressureUpdate', bloodPressureUpdate);
        let value = payload.sysValue.toString() + '/' + payload.diaValue.toString();
        dailyVitalsController.lastUpdate(payload.userId, 'bloodPressure',  value);
        res.status(200).json({
            message: 'Added blood pressure data successfully'
        });
        
    });
}

/**
 * @desc Add Mood 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addMood =  function (request, res) {
    let payload = request.body;
    let data = {
        moodList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText,
            mood: payload.mood,
            sliderValue: payload.sliderValue
        }
    };

    Mood.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('moodUpdate', moodUpdate);
        dailyVitalsController.lastUpdate(payload.userId, 'mood',  payload.mood);
        res.status(200).json({
            message: 'Added mood data successfully'
        });
    });
}

/**
 * @desc Add Nutrition
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addNutrition = function (request, res) {
    let payload = request.body;
    let data = {
        nutritionList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isBreakfastTaken: payload.isBreakfastTaken,
            isLunchTaken: payload.isLunchTaken,
            isDinnerTaken: payload.isDinnerTaken,
            isAssistanceNeeded: payload.isAssistanceNeeded,
            food: payload.food
        }
    };

    Nutrition.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('nutritionDetail', nutritionUpdate);
        let value = false;
        if(payload.isBreakfastTaken ||  payload.isLunchTaken || isDinnerTaken) {
            value = true;
        }
        dailyVitalsController.lastUpdate(payload.userId, 'nutrition',  value);
        res.status(200).json({
            message: 'Added nutrition data successfully'
        });
        
    });
}

/**
 * @desc Add Other Vitals 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addOtherVitals = function (request, res) {
    let payload = request.body;
    let data = {
        otherVitalList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            temp: payload.temp,
            respiratory: payload.respiratory,
            pulse: payload.pulse
        }
    };

    OtherVitals.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
        console.log('otherVitalUpdate', otherVitalUpdate);
        dailyVitalsController.lastUpdate(payload.userId, 'otherVital',  payload.pulse);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add Bowell 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addBowell = function (request, res) {
    let payload = request.body;
    let data = {
        bowellList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isAssistanceNeeded: payload.isAssistanceNeeded,
            bowell: payload.bowell
        }
    };

    Bowell.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('bowell', update);
        dailyVitalsController.lastUpdate(payload.userId, 'bowell',  payload.bowell);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add CognitiveCare 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addCognitiveCare = function (request, res) {
    let payload = request.body;
    let data = {
        congnitiveCareList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isAssistanceNeeded: payload.isAssistanceNeeded,
            isPhoneSelected: payload.isPhoneSelected,
            isStairSelected: payload.isStairSelected,
            isNeighbourSelected: payload.isNeighbourSelected,
            isFinancesSelected: payload.isFinancesSelected,
            isShoppingSelected: payload.isShoppingSelected
        }
    };

    CognitiveCare.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('CognitiveCare', update);
        dailyVitalsController.lastUpdate(payload.userId, 'congnitive',  payload.isPhoneSelected);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add Diabetic 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addDiabetic = function (request, res) {
    let payload = request.body;
    let data = {
        diabeticList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isAssistanceNeeded: payload.isAssistanceNeeded,
            bloodSugar: payload.bloodSugar
        }
    };

    Diabetic.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('Diabetic', update);
        dailyVitalsController.lastUpdate(payload.userId, 'diabetic',  payload.bloodSugar);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add Hygiene 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addHygiene = function (request, res) {
    let payload = request.body;
    let data = {
        hygieneList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isAssistanceNeeded: payload.isAssistanceNeeded,
            isShowerTaken: payload.isShowerTaken,
            isBrush: payload.isBrush,
            isToothAche: payload.isToothAche,
            isNailDiscolored: payload.isNailDiscolored,
            isSkinCracked: payload.isSkinCracked,
            isBleeding: payload.isBleeding,
            isHairCared: payload.isHairCared,
            isMakeUpReady: payload.isMakeUpReady
        }
    };

    Hygiene.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('Hygiene', update);
        dailyVitalsController.lastUpdate(payload.userId, 'hygiene',  payload.isShowerTaken);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add Pain 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addPain = function (request, res) {
    let payload = request.body;
    let data = {
        painList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isAssistanceNeeded: payload.isAssistanceNeeded,
            sliderValue: payload.sliderValue,
            painLocation: payload.painLocation,
            isBathTaken: payload.isBathTaken,
            isConstant: payload.isConstant,
            isIntermittant: payload.isIntermittant,
            isSleep: payload.isSleep,
            isWalking: payload.isWalking,
            isAppetite: payload.isAppetite
        }
    };

    Pain.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('Pain', update);
        dailyVitalsController.lastUpdate(payload.userId, 'pain',  payload.sliderValue);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc Add Sleep 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.addSleep = function (request, res) {
    let payload = request.body;
    let key = payload.value;
    let data = {
        sleepList: {
            dateTime: dailyVitalsController.getDateTime(),
            noteText: payload.noteText, 
            isNormal: payload.isNormal,
            sleep: payload.sleep
        }
    };

    Sleep.findOneAndUpdate(
        {   
            userObjectId: payload.userId
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
    .then(function (update) {
        console.log('Sleep', update)
        dailyVitalsController.lastUpdate(payload.userId, 'sleep',  payload.sleep);
        res.status(200).json({
            message: 'Added other vital data successfully'
        });
        
    });
}

/**
 * @desc update table with last change 
 * @param {Object} payload 
 * @param {String} id 
 * @param {Object} res 
 */
dailyVitalsController.lastUpdate = function (userId, key, value) {
    //let payload = request.body;

    LastUpdate.findOne(
        { userObjectId: userId}
    )
    .exec()
    .then(function (data) {
        let lastUpdateData = {};
        lastUpdateData = data.lastUpdateList[data.lastUpdateList.length - 1];
        if(lastUpdateData) {
            lastUpdateData.dateTime = dailyVitalsController.getDateTime();
            lastUpdateData[key] = value;     
        } else {
            lastUpdateData = {
                dateTime: dailyVitalsController.getDateTime(),
                [key]: value              
            }
        }

        let updateData = {
            lastUpdateList: lastUpdateData
        }

        LastUpdate.findOneAndUpdate(
            {   
                userObjectId: userId
            },
            {
                $push: updateData
            },
            {
                safe:true,
                upsert:true
            }
        )
        .exec()
        .then(function (update) {
            console.log('last update', update)   
        });

    });
}

/**
 * @desc return current data and time 
 */
dailyVitalsController.getDateTime = function () { 
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        date:note_dateUTC,
        hour:moment.utc(note_dateUTC,'HH'),
        min:moment.utc(note_dateUTC,'mm')
    }
}

module.exports = dailyVitalsController;