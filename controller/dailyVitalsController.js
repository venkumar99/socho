import moment from 'moment';
import User from '../models/user';
import Bath from '../models/bath';
import Fall from '../models/fall';
import BloodPressure from '../models/bloodPressure';
import Mood from '../models/mood';
import Nutrition from '../models/nutrition';
import OtherVitals from '../models/otherVitals';


var dailyVaitalsController = {};


/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
dailyVaitalsController.getListofVitals = function(request, response) {
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

async function getDetail(modelName, id) {
    let bathData = await modelName.findOne({ userObjectId: id}).exec();
}

/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
dailyVaitalsController.upDateVitals = function(request, response) {
    let payload = request.body.data;
    User.findOne({
        userid: request.query.userId
    })
    .exec()
    .then(function (user) { 
        if(payload.vitalName === 'Bath') {
            this.updateDetail('Bath', user._id, this.bathPayload(payload));
        } else if (payload.vitalName === 'Fall') {
            this.updateDetail('Fall', user._id, this.fallPayload(payload));
        } else if (payload.vitalName === 'BloodPressure') {
            this.updateDetail('BloodPressure', user._id, this.bloodPressurePayload(payload));
        } else if (payload.vitalName === 'Mood') {
            this.updateDetail('Mood', user._id, this.moodPayload(payload));
        } else if (payload.vitalName === 'Nutrition') {
            this.updateDetail('Nutrition', user._id, this.nutritionPayload(payload));
        } else if (payload.vitalName === 'OtherVitals') {
            this.updateDetail('OtherVitals', user._id, this.otherVitalsPayload(payload));
        } 
    });
};


async function updateDetail(modelName, id, data) {
    let detail = await modelName.findOneAndUpdate(
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
    .exec();
}

function bathPayload(payload) {
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