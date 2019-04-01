import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var DiabeticSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    diabeticList: [{
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
        bloodSugar: {
            type: Number
        }
    }]

});

module.exports = mongoose.model('Diabetic', DiabeticSchema);