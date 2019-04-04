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
        bowell: {
            type: String
        }
    }]

});

module.exports = mongoose.model('Bowell', BowellSchema);