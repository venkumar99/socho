import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var FallSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    fallList: [{
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
        number: {
            type: Number
        },
        todayFalls: {
            type: Boolean
        },
        todayWalk: {
            type: Boolean
        },
        climbTrouble: {
            type: Boolean
        },
        stepWalk: {
            type: Number
        },
        climbed: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]

});

module.exports = mongoose.model('Fall', FallSchema);