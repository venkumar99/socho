import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';

var AccountAccessListSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    accountAccessList: [
        {
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
            email: {
                type: String
            },
            requestStatus: {
                type: String
            },
            userId : {
                type: String
            },
            fullName: {
                type: String
            },
            authorizedLevel:{
                type: String
            },
            relationShip: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('AccountAccessList', AccountAccessListSchema);