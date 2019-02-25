import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';

var AccountListSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    accountList: [{
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

    }]
});

module.exports = mongoose.model('AccountList', AccountListSchema);