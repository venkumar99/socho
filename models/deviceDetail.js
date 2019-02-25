import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';

var DeviceDetailSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    deviceList: [{
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
        deviceId:{
            type: String
        },
        token: {
            type: String
        },
        os: {
            type: String
        }
    }]
});

module.exports = mongoose.model('DeviceDetail', DeviceDetailSchema);