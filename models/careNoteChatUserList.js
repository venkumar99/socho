import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';


var CareNoteChatUserListSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    groupUsers: [{
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
        friendUserId: {
            type: String
        },
        firstName: {
            type: String
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String
        }
    }]
});

module.exports = mongoose.model('CareNoteChatUserList', CareNoteChatUserListSchema);