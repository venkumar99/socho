import mongoose, {SchemaTypes, SchemaType} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
var SALT_WORK_FACTOR = 5;

var UserHealthProfileSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    heightInches:{
        type:Number,
    },
    weightLbs:{
        type:Number,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [{
        type: String,
    }],
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    dateCreated:{
        type:Date,
        required:false,
        default: new Date(),
    }
    

});

module.exports = mongoose.model('UserHealthProfile', UserHealthProfileSchema);