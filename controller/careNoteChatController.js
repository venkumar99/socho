import mongoose from 'mongoose';
import CareNoteChat from '../models/careNoteChat';
import CareNoteChatUserList from '../models/careNoteChatUserList';
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
careNoteChatController.getChats = function(io) {
    
    CareNoteChat.find({}, function(err, chats) {
        if(err) {
            console.log('Error getting list of Chat');
        }
        else {
            io.emit('getChatData', chats[0].groupMessage); 
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

careNoteChatController.addUserToGroup = function(req, io) {
    console.log({'careNoteChatController add user to group':req});

    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var user = {
        groupUsers:{
            dateTime:{
                date:note_dateUTC,
                hour: moment.utc(note_dateUTC,'HH'),
                min: moment.utc(note_dateUTC,'mm')
            },
            friendUserId: req.friendUserId, 
            firstName:req.firstName,
            middleName: req.middleName,
            lastName: req.lastName
            }
        };
    
    User.findOne({
            userid: req.userId
        }).exec()
        .then(function (user) {
            console.log('found user'+user);
           
        CareNoteChatUserList.findOneAndUpdate(
            { userObjectId: user._id },
            {$push: user},
            {safe:true,upsert:true}
            ).exec(function (err, userAdded) {
                if (err) {
                    console.log('Erorr while adding user',err);
                    //return 'Error adding Care Notes Chat! '
                } else {
                    console.log('User Successfully Added');
                    //io.emit('userAdded', req);
                }
            });
        });
}

module.exports = careNoteChatController;