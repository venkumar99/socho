import mongoose from 'mongoose';
import CareNote from '../models/careNote';
import User from '../models/user';
import moment from 'moment';

var careNoteController = {}
var user = new User();

var date1 = moment.utc(Date());

console.log('Date1='+date1.minutes());

//Get userid
 

//Add Care Notes
/*
careNoteController.addNote = function(req,res) {
    var careNote = new CareNote();
    
    var vitals = {pulse: 85, bodyTemp:97.3};

   // careNote.vitals.bloodPressure.systolic = req.body.systolic;
   // careNote.vitals.bloodPressure.diatolic = req.body.diatolic;
  //  careNote.Notes.vitals.pulse = req.body.pulse;
   // careNote.Notes.bodyTemp = req.bodyTemp;
    
    

   
    console.log('userid = '+req.body.userid);
    var promise = User.findOne({userid: req.body.userid}).exec();
    promise.then( function(user) {
        console.log('Trying to save Care Note');
        res.json({vitals});
       // console.log('Vitals = '+careNote.Notes.vitals.bloodPressure.systolic);
        careNote.userObjectId = user._id;
         careNote.findOneAndUpdate(
            {userObjectId: user._id},
            {$push: {Notes: vitals}},
              {upsert: true, safe:true},
            function(err,doc) {
                if(err) {
                    console.log('Error Saving Care Note'+ err);
                    res.json({err:'Error Saving Care Notes'+ err});
                }
                else {
                    console.log('Care Note Saved');
                    res.json({message: 'Care note Added'});
                }
            }
        );
       
})
.catch(error => {console.log('Error' + error)});

} // end of addNotes
*/
//Add/Update Care Note.

careNoteController.addNote = function (req, res) {
    console.log({'Inside add Note':req.body});

    
    var note_dateUTC = moment.utc(Date());

    var vitals = {Notes:{
            noteDatetime:{
                noteHour: note_dateUTC.hours(),
                noteMin : note_dateUTC.minutes(),
                noteDate: note_dateUTC,
            },
             bloodPressure:{
                 systolic:req.body.systolic,
                 diastolic:req.body.diastolic,
             },
             pulse: req.body.pulse, 
             bodyTemp:req.body.bodyTemp,
             pulseOxygen: req.body.pulseOxygen,
             respiratoryRate: req.body.respiratoryRate,
             generalCondition:req.body.GeneralCondition,
             bowelMovement: {
                 bowelType:req.body.bowelType,
                 needsToiletAssistance:req.body.needsToiletAssistance,
             },
             bloodGlucose: req.body.bloodGlucose,
             eating:{
                 breakfast:req.body.breakfast,
                 lunch:req.body.lunch,
                 dinner:req.body.dinner,
                 description:req.body.foodToday,
                 needsAssistance:req.body.needMealAssistance,
             },
             bath:{
                 tookBath:{
                     type:String,
                     enum:['Yes','No']
                 },
                 needsBathAssistance:{
                     type:String,
                     enum:['Yes','No']
                 },
             },
            }
        };
    
    console.log('found user'+req.body.userId);
    User.findOne({
            userid: req.body.userId
        }).exec()
        .then(function (user) {
            console.log('found user'+user);
           // res.json({vitals:vitals});
           
            CareNote.findOneAndUpdate({userObjectId: user._id},{$push: vitals},{safe:true,upsert:true}
            ).exec(function (err, careNote) {
                if (err) {
                  //  res.send('Error updating Care Notes '+ err);
                    return res.status(400).json({Error:err,message:'Error adding Care Notes! '})
                } else {
                  //  console.log('Note Added');
                    return res.status(200).json({user:req.body.userId,message:'Care Notes Added! '}) 
                  //  res.json(careNote);
                }
            });
        });
        

}

//Get List of Notes for user
careNoteController.getNotes = function(req,res) {
    
    careNote.find({}, function(err,notes) {
        if(err) {
            res.send('Error getting list of Care Notes');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(notes);
        }
    });
} // end of getNotes

//Get Notes by Date
careNoteController.getNoteByDate = function(req,res) {
    CareNote.findOne({date:req.params.date}).exec(function(err,notes){
        if(err) {
            res.send('Error Getting Care Notes for Date');
        }
        else {
            res.send('notes = '+notes);
            
        }
    });
}

//Get Notes  by userID
careNoteController.getNotesForUser = function(req,res) {
    careNote.find({userObjectId:req.params.userid}).exec(function(err,notes){
        if(err) {
            res.send('Error Getting Notes for userid');
        }
        else {
            //res.send('Medication = '+medication);
            res.json(notes);
        }
    });
}

//Add Google Image API


module.exports = careNoteController;