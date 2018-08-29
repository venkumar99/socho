import mongoose, { SchemaType, SchemaTypes, Model } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
var SALT_WORK_FACTOR= 5;

var InsuranceSchema = new mongoose.Schema({
    insurer: {
        type: String,
        required: true,
        trim:true,
    },
    insuranceType:{
        type:String,
        enum:['Health','Dental','Vision','Pharmacy'],
    },
    planType:{
        type:String,
    },
    groupNumber: {
        type: String,
    },
    IDNumber: {
        type: String,
        required: true,
    },
    insuredName: {
        type: String,
        required: true,
    },
    memberServicePhone:{
        type:String,
    },
    providersPhone:{
        type:String,
    },
    insurerClaimsAddress:{
        name: {type:String},
        street:{type:String},
        city:{type:String},
        state:{type:String},
        zip:{type:String},
        country:{type:String},
    },
    userObjectId:{
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl:{
        type:String,
    }
});

module.exports = mongoose.model('Insurance', InsuranceSchema);