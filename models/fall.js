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
        isFalls: {
            type: Boolean
        },
        number: {
            type: Number
        }
    }]

});

module.exports = mongoose.model('Fall', FallSchema);