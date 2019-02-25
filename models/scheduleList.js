import mongoose, {SchemaTypes, SchemaType} from 'mongoose';

var ScheduleListSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    scheduleList: [{
        date: {
            type: Date
        },
        time: {
            type: String
        },
        medicationName: {
            type: String
        },
        title: {
            type: String
        },
        message: {
            type: String
        }
    }]
});

module.exports = mongoose.model('ScheduleList', ScheduleListSchema);