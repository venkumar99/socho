import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
var SALT_WORK_FACTOR= 5; // This number should be increased as we have multi-cpu machines in production

var UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
     //   match: [/^[a-zA-Z0-9]+$/, 'is invalid'], // This is in case you dont want to use email as userid
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
    },
    username:{
        firstName:{type:String, trim:true},
        lastName:{type:String, trim:true},
        nickName:{type:String, trim:true},
    },
    age:{type: Number},
    gender:{type:String, enum:['M','F']},
    homePhone: {type: String},
    workPhone: {type: String},
    cellPhone: {type: String},
    homeAddress:
        {   
            street:{type:String},
            city:{type:String},
            state:{type:String},
            zip:{type:String},
            country:{type:String}
        },
    workAddress:
        {   
            street:{type:String},
            city:{type:String},
            state:{type:String},
            zip:{type:String},
            country:{type:String}
        },
    emergencyContact:{
        name:{type:String},
        phone:{type:String},
        email:{type:String}
    },
    dateCreated:{
        type:Date,
        required:false,
        default: new Date(),
    }
    
});


UserSchema.pre('save', function(callback) {
     var user = this;

     if(!user.isModified('password')) return callback();
     //Generate a Random Salt and then hash it after combining the user password
     bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt) {
         if(err) return callback(err);

         bcrypt.hash(user.password, salt, null, function(err,hash) {
             user.password = hash;
             callback();
         });
     });

});

UserSchema.methods.verifyPassword = function(candidatePassword,cb) {
    console.log('password to verify = '+candidatePassword);
    bcrypt.compare(candidatePassword, this.password,function(err, isMatch) {
        if(err) return cb(err);
        else {
            console.log("Password Matched"+isMatch);
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);