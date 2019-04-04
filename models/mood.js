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
    moodList: [{
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
            type: String
        },
        mood: {
            type: String
        }
    }]

});

module.exports = mongoose.model('Mood', MoodSchema);