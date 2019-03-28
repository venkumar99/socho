import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var CognitiveCareSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    careList: [{
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
        isAssistanceNeeded: {
            type: Boolean
        },
        isPhoneSelected: {
            type: Boolean
        },
        isWalkSelected: {
            type: Boolean
        },
        isStairSelected: {
            type: Boolean
        },
        isNeighbourSelected: {
            type: Boolean
        },
        isFinancesSelected: {
            type: Boolean
        },
        isShoppingSelected: {
            type: Boolean
        },

    }]

});

module.exports = mongoose.model('CognitiveCare', CognitiveCareSchema);