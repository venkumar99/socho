import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var OtherVitalsSchema = new mongoose.Schema({
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
        temp: {
            type: Number
        },
        respiratory: {
            type: Number
        },
        pulse: {
            type: Number
        }
    }]

});

module.exports = mongoose.model('OtherVitals', OtherVitalsSchema);