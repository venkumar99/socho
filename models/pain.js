import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var PainSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    painList: [{
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
        sliderValue: {
            type: Number
        },
        painLocation: {
            type: String
        },
        isBathTaken: {
            type: Boolean
        },
        isAssistanceNeeded: {
            type: Boolean
        },
        isConstant: {
            type: Boolean
        },
        isIntermittant: {
            type: Boolean
        },
        isSleep: {
            type: Boolean
        },
        isWalking: {
            type: Boolean
        },
        isAppetite: {
            type: Boolean
        }
    }]

});

module.exports = mongoose.model('Pain', PainSchema);