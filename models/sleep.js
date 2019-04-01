import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var SleepSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    sleepList: [{
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
        isNormal: {
            type: Boolean
        },
        isDifficulty: {
            type: Boolean
        },
        isFrequent: {
            type: Boolean
        },
        isTired: {
            type: Boolean
        }
    }]

});

module.exports = mongoose.model('Sleep', SleepSchema);