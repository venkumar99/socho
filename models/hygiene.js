import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var HygieneSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    hygieneList: [{
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
        isShowerTaken: {
            type: Boolean
        },
        isAssistanceNeeded: {
            type: Boolean
        },
        isBrush: {
            type: Boolean
        },
        isToothAche: {
            type: Boolean
        },
        isNailDiscolored: {
            type: Boolean
        },
        isSkinCracked: {
            type: Boolean
        },
        isBleeding: {
            type: Boolean
        },
        isHairCared: {
            type: Boolean
        },
        isMakeUpReady: {
            type: Boolean
        }
    }]

});

module.exports = mongoose.model('Hygiene', HygieneSchema);