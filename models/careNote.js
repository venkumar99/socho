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
    Notes: [{
        noteDatetime: {
            noteDate:{
                type:Date,
            },
            noteHour:{
                type: Number,
            },
            noteMin:{
                type: Number,
            },
        },
        bloodPressure: {
            systolic: {
                type: Number
            },
            diastolic: {
                type: Number
            },
        },
        pulse: {
            type: Number,
        },
        bodyTemp: {
            type: Number
        },
        pulseOxygen:{
            type: Number,
        },
        respiratoryRate:{
            type: Number,
        },
        generalCondition: {
            type: String,
            enum: ['Normal', 'Fatigued', 'Exhausted', 'Weak'],
        },
        eating:{
            breakfast:{
                type:String,
            },
            lunch:{
                type: String,
            },
            dinner:{
                type:String,
            },
            description:{
                type:String,
            },
            needsAssistance:{
                type:String,
                enum: ['Yes', 'No']
            },
        },
        bowelMovement: {
            bowelType: {
                String,
                enum: ['Normal', 'Diarreah', 'Constipated', 'AbdominalPain', 'AbdominalCramp', ]
            },
            needsToiletAssistance:{
                type:String,
                enum: ['Yes', 'No']
            }
        },
        bloodGlucose: {
                type: Number,
        },
        pain: {
            painScore:{
                type:Number,
                enum:[1,2,3,4,5,6,7,8,9,10]
            },
            location:{
                type:String,
            },
            pattern:{
                type:String,
                enum:['Constant','Intermittant']
            },
            affects:[{
                type:String,
                enum:['Sleep','Walking','Appetite']
            }],
            redness:{
                type:String,
                enum:['Yes','No']
            },
            swelling:{
                type:String,
                enum:['Yes','No']
            },
        },
        careNotes:{
            type:String,
        },
        catheterChanged:{
            type:String,
            enum:['Yes','No']
        },
        Walking:{
            wentWalking:{
              type:String,
              enum:['Yes','No'],
            },
            where:{
                type:String,
            }
            
        }
    }],
});

module.exports = mongoose.model('CareNote', CareNoteSchema);