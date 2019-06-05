import mongoose from 'mongoose';
import CareNote from '../models/careNote';
import User from '../models/user';
import moment from 'moment';

var careNoteController = {}
var user = new User();

careNoteController.addCareNote = function (req, res) {
    console.log({'Inside add Note':req.body});
    console.log('found user'+req.body.userId);
    let notes = {
        notesList: {
            dateTime: careNoteController.getDateTime(),
            notes: req.body.message,
            fullName:  req.body.name,
            userId: req.body.userId
        }
    }
           
    CareNote.findOneAndUpdate(
        {
            userObjectId: req.body.userId
        },
        {
            $push: notes
        },
        {
            safe:true,
            upsert:true,
            new: true
        }
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
        

}

//care note list
careNoteController.getCareNotes = function(req,res) { 
    console.log('id ', req.query.userId) ; 
    CareNote.find(
        {
            userObjectId: req.query.userId
        }
    )
    .exec()
    .then(function(notes) {
        console.log('care note list ', notes);
        res.status(200).json(
            { 
                notesList: notes
            }
        );  
        
    })
    .catch(function(error) { 
        console.log(error);
        res.res.status(401).json('Error getting list of Care Notes');
    });
} 

/**
 * @desc return current data and time 
 */
careNoteController.getDateTime = function () { 
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    return {
        date:note_dateUTC,
        hour:moment.utc(note_dateUTC,'HH'),
        min:moment.utc(note_dateUTC,'mm')
    }
}



module.exports = careNoteController;