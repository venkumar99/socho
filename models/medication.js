import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

/*
  Some of the fields can be populated by calling api.
  1. NIH ( National Institur of Health - rxNorm API - https://rxnav.nlm.nih.gov/RxNormAPIs.html#)
  2. FDA's standard for Unique Ingredient - https://open.fda.gov/api/reference/. 
  3. FDA (splID) Special Product Label ID used for HL7 Data Interchange - https://open.fda.gov/api/reference/
  4. Veterans Affair ( VA) National Drug File data is available in Excel. To be downloaded
*/
var MedicationSchema = new mongoose.Schema({
    RxNumber: {
        type: String,
    },
    medicationName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    dosage: {
        type: String,
    },
    refill: {
        numberLeft: {
            type: Number
        },
        endDate: {
            type: Date
        },
    },
    storeName: {
        type: String,
    },
    storePhone: {
        type: String,
    },
    prescribedByDoctor: {
        type: String,
    },
    dateFilled: {
        type: Date,
    },
    discardAfterDate: {
        type: Date,
    },
    rphName: {
        type: String,
    },
    rxNormId: { //National Institue of Health reNorm Standard
        type: String,
    },
    ndcFDA: { //FDA's National Drug Code
        type: String,
    },
    nuiiFDA: { //FDA Unique Ingredient Identifier
        type:String,
    },
    splIdFDA:{ //FDA's Structured Product Label used by HL7 standard
        type: String,
    },
    nuiVA: { //VA ( veterans Admin) National Drug File ref Terminology
        type: String,
    },
    
    instructions: {
        type: String,
    },
    pillBottleImageUrl: {
        type: String,
    },
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    dateCreated: {
        type: Date,
    },
    
});

module.exports = mongoose.model('Medication', MedicationSchema);