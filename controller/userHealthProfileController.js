import mongoose from 'mongoose';
import UserHealthProfile from '../models/userHealthProfile';

import User from '../models/user';

var userHealthProfileController = {}
var user = new User();


//Add User Health Info
userHealthProfileController.addHealthInfo = function (req, res) {
    var userHealthProfile = new UserHealthProfile(req.body);
    console.log('userid = ' + req.body.userid);

    var promise = User.findOne({
        userid: req.body.userid
    }).exec();
    promise.then(function (user) {
        console.log('Trying to save user Health Profile');
        userHealthProfile.userObjectId = user._id;
        userHealthProfile.save(function (err) {
            if (err) {
                console.log('Error Saving User Health Profile Info' + err);
                res.json({
                    err: 'Error Saving User Health Profile Info:' + err
                });
            } else {
                console.log('User Health Profile Info Saved');
                res.json({
                    message: 'User Health Profile Info Info added'
                });
            }
        });

    });

} //end of addUserHealthInfo

//Get userHealthProfile by userID
userHealthProfileController.getHealthInfoForUser = function (req, res) {
    console.log('userid = ' + req.params.userid);

    User.findOne({
            userid: req.params.userid
        }).exec()
        .then(function (user) {
            UserHealthProfile.findOne({
                userObjectId: user._id
            }).exec(function (err, healthProfile) {
                if (err) {
                    res.send('Error Getting Health Profile Info for userid');
                } else {
                    //res.send('Medication = '+medication);
                    res.json({
                        healthProfile: healthProfile
                    });
                }
            });
        });
} // End of gethealthInfoForUser


//Update the userhealthProfile
userHealthProfileController.updateHealthInfo = function (req, res) {
    console.log('Inside update Health Profile Info');
    var allergy = { allergies:req.body.allergies}
    
    User.findOne({
            userid: req.params.userid
        }).exec()
        .then(function (user) {
            console.log('found user'+user);
            UserHealthProfile.findOneAndUpdate({userObjectId: user._id},{$push: allergy},{safe:true,upsert:true}
            ).exec(function (err, healthProfile) {
                if (err) {
                    res.send('Error updating Health Profile'+ err);
                } else {
                    res.json(healthProfile);
                }
            });
        });
        

}



module.exports = userHealthProfileController;