import mongoose from 'mongoose';
import Insurance from '../models/insurance';
import User from '../models/user';

var insuranceController = {}
var user = new User();


//Get userid
 

//Add insurance
insuranceController.addInsurance = function(req,res) {
    var insurance = new Insurance(req.body);

    console.log('userid = '+req.body.userid);

    var promise = User.findOne({userid: req.body.userid}).exec();
    promise.then( function(user){
        console.log('Trying to sav insurance');
        insurance.userObjectId = user._id;
        insurance.save(function(err) {
            if(err) {
                console.log('Error Saving insurance' +err);
                return(err)
            }
            else{
                console.log('insurance Saved');
                res.json({message:'Insurance Info added'});
            }
        } );
      
    });
    
   
} //end of addinsurance


//Get List of insurances
insuranceController.getinsurances = function(req,res) {
    
    insurance.find({}, function(err,insurances) {
        if(err) {
            res.send('Error getting list of insurances');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(insurances);
        }
    });
} // end of getinsurances


//Get List of insurances
insuranceController.getInsuranceList = function(req,res) {
    
    Insurance.find({}, function(err,insurances) {
        if(err) {
            res.send('Error getting list of Insurances');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(insurances);
        }
    });
} // end of getInsuranceList

//Get Insurance by InsuranceID
insuranceController.getInsuranceByID = function(req,res) {
    Insurance.findOne({IDNumber:req.params.IDNum}).exec(function(err,insurance){
        if(err) {
            res.send('Error Getting Insurance for IDNumber');
        }
        else {
            res.send('Insurance = '+insurance);
            
        }
    });
}

insuranceController.getInsuranceListForUser = function(req,res) {
    
    Insurance.find({userObjectId: req.params.userid}).exec(function(err,insurances) {
        if(err) {
            res.send('Error getting list of Insurances for user');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(insurances);
        }
    });
} // end of getInsuranceList

module.exports = insuranceController;