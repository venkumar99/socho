import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';

var dateTime = {
    date:{
        type:Date,
    },
    hour:{
        type: Number,
    },
    min:{
        type: Number,
    }
};

var ConsentSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail:{
        type:String
    },
    userList:[{
        dateTime: dateTime,
        id: {
            type: String
        },
        email:{
            type: String
        },
        name:{
            type: String
        },
        consentList: [{
            dateTime: dateTime,
            allInformation: {
                dateTime: dateTime,
                value: {
                    type: Boolean
                }
            },
            dailyVitals: {
                dateTime: dateTime,
                value: {
                    type: Boolean
                }
            },
            homeCareNotes: {
                dateTime: dateTime,
                value: {
                    type: Boolean
                }
            },
            medicalRecords: {
                dateTime: dateTime,
                value: {
                    type: Boolean
                }
            },
            medication: {
                dateTime: dateTime,
                value: {
                    type: Boolean
                }
            }
        }]
    }]   
});

module.exports = mongoose.model('Consent', ConsentSchema);