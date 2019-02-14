import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var MoodSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    bathList: [{
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
        isGood: {
            type: Boolean
        },
        isFatigued: {
            type: Boolean
        },
        isTired: {
            type: Boolean
        },
        isSick: {
            type: Boolean
        }
    }]

});

module.exports = mongoose.model('Mood', MoodSchema);