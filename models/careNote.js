import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';


var CareNoteSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    notesList: [{
        dateTime: {
            date:{
                type:Date
            },
            hour:{
                type: Number
            },
            min:{
                type: Number
            }
        },
        notes: {
            type: String
        },
        fullName: {
            type: String
        },
        userId: {
            type: String
        }
    }]
});

module.exports = mongoose.model('CareNote', CareNoteSchema);