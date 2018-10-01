import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';


var CareNoteChatSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    groupMessage: [{
        chatDatetime: {
            chatDate:{
                type:Date,
            },
            chatHour:{
                type: Number,
            },
            chatMin:{
                type: Number,
            }
        },
        userName: {
            type: String
        },
        message: {
            type: String,
        },
        userId: {
            type: String
        }
    }],
});

module.exports = mongoose.model('CareNoteChat', CareNoteChatSchema);