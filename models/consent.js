import mongoose, {
    SchemaTypes,
    SchemaType
} from 'mongoose';

var ConsentSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    consentList: [{
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
        accountId: {
            type: String
        },
        name:{
            type: String
        },
        allInformation: {
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
            value: {
                type: Boolean
            }
        },
        dailyVitals: {
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
            value: {
                type: Boolean
            }
        },
        homeCareNotes: {
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
            value: {
                type: Boolean
            }
        },
        medicalRecords: {
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
            value: {
                type: Boolean
            }
        },
        medication: {
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
            value: {
                type: Boolean
            }
        },

    }]
});

module.exports = mongoose.model('Consent', ConsentSchema);