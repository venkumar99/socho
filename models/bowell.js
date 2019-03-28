import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var BowellSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    bowellList: [{
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
        isNormal: {
            type: Boolean
        },
        isAbdominalPain: {
            type: Boolean
        },
        isConstipated: {
            type: Boolean
        },
        isAbdomialCramps: {
            type: Boolean
        }
    }]

});

module.exports = mongoose.model('Bowell', BowellSchema);