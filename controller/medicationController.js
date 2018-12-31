import mongoose from 'mongoose';
import Medication from '../models/medication';
import User from '../models/user';

var medicationController = {}
var user = new User();


//Get userid
 

//Add Medication
medicationController.addMedication = function(req,res) {
    console.log('medication', req.body)
    var medication = new Medication();
    medication.medicationName = req.body.medicationName;
    medication.quantity = req.body.quantity;
    medication.dosage = req.body.dosage;
    medication.refill.numberLeft = req.body.refillNumLeft;
    medication.refill.endDate = req.body.refillEndDate;
    medication.RxNumber = req.body.RxNumber;
    medication.storeName = req.body.storeName;
    medication.storePhone = req.body.storePhone;
    medication.prescribedByDoctor = req.body.prescribedByDoctor;
    medication.discardAfterDate = req.body.discardAfterDate;
    medication.rphName = req.body.rphName;
    medication.dateFilled = req.body.dateFilled;
    medication.instructions = req.body.instructions;
    
    console.log('userid = '+req.body.userId);

    var promise = User.findOne({userid: req.body.userId}).exec();
    promise.then( function(user){
        console.log('Trying to save medication');
        medication.userObjectId = user._id;
        medication.save(function(err) {
            if(err) {
                console.log('Error Saving Medication' +err);
                res.json({err:'Error Saving Medication:'+err});
            }
            else{
                console.log('Medication Saved');
                res.json({message:'Insurance Info added'});
            }
        } );
      
    })
    .catch(error => {console.log('Error' + error)});
    
   
} //end of addMedication


//Get List of medications
medicationController.getMedications = function(req,res) {
    
    Medication.find({}, function(err,medications) {
        if(err) {
            res.status(204).send('Error getting list of medications');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.status(200).json(medications);
        }
    });
} // end of getMedications

//Get Medication by ID
medicationController.getMedicationByRxNum = function(req,res) {
    Medication.findOne({RxNum:req.params.rxNumber}).exec(function(err,medication){
        if(err) {
            res.status(204).send('Error Getting Medication for RxNumber');
        }
        else {
            res.status(200).send('Medication = '+medication);
            
        }
    });
}

//Get Medication by userID
medicationController.getMedicationForUser = function(req,res) {
    console.log('get medication', req.query.userId);
    User.findOne({userid: req.query.userId}).exec().then(function(user) {
        Medication.find(
            {userObjectId: user._id}
        )
        .exec(function(err,medication){
            if(err) {
                res.status(200).send('Error Getting Medication for userid');
            }
            else {
                res.status(200).json(medication);
            }
        });
    });
}

//Get Medication by userID
// medicationController.getMedicationByDateTime = function() {
//     Medication.find(
//         {userObjectId: user._id}
//     )
//     .exec(function(err,medication){
//         if(err) {
//             res.status(200).send('Error Getting Medication for userid');
//         }
//         else {
//             res.status(200).json(medication);
//         }
//     });
// }

//Add Google Image API


module.exports = medicationController;
