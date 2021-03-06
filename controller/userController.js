import jwt from 'jsonwebtoken';
import User from '../models/user';
import CONFIG from '../config/config';
import deviceController  from './deviceController';
//import passport from 'passport';
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions ={};

//JWTOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;
//jwtOptions.secretOrKey = 'tasmanianDevil';

//console.log('signing secret Key = '+jwtOptions.secretOrKey);
var userController = {}
//Add User
userController.register = function(req,res) {
    let userDetail = req.body;
    var user = new User();
    user.userid = userDetail.user_id;
    user.email = userDetail.email;
    user.password = userDetail.password;
    user.firstName = userDetail.firstName;
    user.lastName = userDetail.lastName;
    user.nickName = userDetail.nickName;
    user.age = userDetail.age;
    user.gender = userDetail.gender;
    user.homePhone = userDetail.homePhone;
    user.workPhone = userDetail.workPhone;
    user.cellPhone = userDetail.cellPhone;
    user.dateOfBirth = userDetail.cellPhone;



    user.save( function(err, id) {
        if(err) {
            console.log("err ", err)
            res.status(401).json({
                errorMessage: 'Error while creating account'
            });
        } else {
            console.log("User Added");
            res.status(200).json({
                successMessage: 'Account has been successfully created'
            });
        }
    });
}


userController.test = function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
};

//Login
userController.login = function(req,res) {
    User.findOne({userid:req.body.userId}).exec(function(err,user){
        console.log('inside findOne err=', user);
        if(err) {
            console.log('user not found', err);
            return res.status(401).json({userHasAuthenticated:false,message:'Authentication Failed. User not Found'});
        }
        else if(user) {
           user.verifyPassword(req.body.password, function(err, isMatch) {
            if (err) { 
                return callback(err); 
            }
            // Password did not match
            if (!isMatch) { 
                console.log({'status':401,userHasAuthenticated:false,'message':'Authentication Failed, Wrong password'});
                return res.status(401).json({userHasAuthenticated:false,message:'Authentication failed. Wrong password! '}) 
            }
            // Success
            else {                
                const JWTToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    "userid": user.userid,
                    "_id": user._id
                  },
                  jwtOptions.secretOrKey               
                );

                //deviceController.addDeviceDetail(req.body.deviceDetail, user._id);

              return res.status(200).json({
                    userHasAuthenticated:true, 
                    userid: user._id, 
                    token: JWTToken,
                    name: user.firstName
                } );
            }
            
            });
        } else {
            console.log({'user not found':user}); 
            return res.status(401).json({userHasAuthenticated:false,message:'Authentication Failed. User not Found'});
        } 
});
}

//Get List of users
userController.getUsers = function(req,res) {
    
    User.find({}, function(err,users) {
        if(err) {
            res.send('Error getting list of users');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(users);
        }
    });
}

//Get User by ObjectID
userController.getUserByObjectId = function(req,res) {
    console.log('Inside getUserByIObjectd req userObjectid ='+req.params.userObjectId);
    User.findOne({_id:req.params.userObjectId}).exec(function(err,user){
        if(err) {
            res.send('Error Getting User');
        }
        else {
            res.send('User = '+user);
        }
    });
}
//get User by userid
userController.getUserById = function(req,res) {
    console.log('Inside getUserById req userid ='+req.params.user_id);
      User.findOne({userid:req.params.user_id}).exec(function(err,user){
        if(err) {
            res.send('Error Getting User');
        }
        else {
            res.send('User = '+user);
           // sess.userObjectid = user._id;
        }
    
    });
    
}



module.exports = userController;
