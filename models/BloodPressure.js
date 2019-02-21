import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var BloodPressureSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    bloodPressureList: [{
        dateTime: {
            date:{
                type:Date,
            },
            hour:{
                type: Number,
            },
            min:{
                type: Number,
            }
        },
        noteText: {
            type: String
        },
        sysValue: {
            type: Number
        },
        diaValue: {
            type: Number
        },
        bpmValue:{
            type: Number
        },
        sys:{ 
            minimumValue: {
                type: Number
            },
            maximumValue:{
                type: Number
            },
            step: {
                type: Number
            }
        },
        dia: { 
            diaMinimumValue: {
                type: Number
            },
            diaMaximumValue: {
                type: Number
            },
            diaStep: {
                type: Number
            }
        },
        bpm: { 
            bpmMinimumValue: {
                type: Number
            },
            bpmMaximumValue: {
                type: Number
            },
            bpmStep: {
                type: Number
            }
        },

    }]

});

module.exports = mongoose.model('BloodPressure', BloodPressureSchema);