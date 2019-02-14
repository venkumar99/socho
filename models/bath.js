import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var BathSchema = new mongoose.Schema({
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
        isBathTaken: {
            type: Boolean
        },
        isAssistanceNeeded: {
            type: Boolean
        },

    }]

});

module.exports = mongoose.model('Bath', BathSchema);