import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var LastUpdateSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    lastUpdateList: [{
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
        bath: {
            type: String,
            default: 'none'
        },
        fall: {
            type: String,
            default: 'none'
        },
        dibetic: {
            type: String,
            default: 'none'
        },
        hygiene: {
            type: String,
            default: 'none'
        },
        bowell: {
            type: String,
            default: 'none'
        },
        mood: {
            type: String,
            default: 'none'
        },
        bloodPressure: {
            type: String,
            default: 'none'
        },
        congnitive: {
            type: String,
            default: 'none'
        },
        nutrition: {
            type: String,
            default: 'none'
        },
        pain: {
            type: String,
            default: 'none'
        },
        otherVital: {
            type: String,
            default: 'none'
        },
        sleep: {
            type: String,
            default: 'none'
        },

    }]

});

module.exports = mongoose.model('LastUpdate', LastUpdateSchema);