import mongoose from 'mongoose';
import CareNoteChat from '../models/careNoteChat';
import User from '../models/user';
import moment from 'moment';
import io from 'socket.io';

var careNoteChatController = {}
var user = new User();

//Add Chats
careNoteChatController.addChat = function (req, io) {
    console.log({'careNoteChatController add Note':req});

    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var chatMessage = {
        groupMessage:{
            chatDatetime:{
                chatDate:note_dateUTC,
                chatHour: moment.utc(note_dateUTC,'HH'),
                chatMin: moment.utc(note_dateUTC,'mm')
            },
            userName: req.userName, 
            message:req.message,
            userId: req.userId
            }
        };
    
    User.findOne({
            userid: req.userId
        }).exec()
        .then(function (user) {
            console.log('found user'+user);
           // res.json({vitals:vitals});
           
        CareNoteChat.findOneAndUpdate(
            { userObjectId: user._id },
            {$push: chatMessage},
            {safe:true,upsert:true}
            ).exec(function (err, careNoteChat) {
                if (err) {

                    return 'Error adding Care Notes Chat! '
                } else {
                    console.log('Chat Successfully Added');
                    io.emit('response', req);
                }
            });
        });
}

//Get List of Chats for user
careNoteChatController.getChats = function(req,res) {
    
    CareNoteChat.find({}, function(err, chats) {
        if(err) {
            res.send('Error getting list of Chat');
        }
        else {
            
       //   res.json(users.map(user =>({"Name": user.userid}, {"Phone": user.phone.phoneNum}) ));
            
            
           res.json(chats);
        }
    });
} 
// end of getNotes

//Get Chats by Date
careNoteChatController.getChatsByDate = function(req,res) {
    CareNoteChat.findOne({date:req.params.date}).exec(function(err,chats){
        if(err) {
            res.send('Error Getting Chats for Date');
        }
        else {
            res.send('notes = '+chats);
            
        }
    });
}

//Get Chats  by userID
careNoteChatController.getChatsForUser = function(req,res) {
    CareNoteChat.find({userObjectId:req.params.userid}).exec(function(err,chats){
        if(err) {
            res.send('Error Getting Chats for userid');
        }
        else {
            res.json(chats);
        }
    });
}

module.exports = careNoteChatController;