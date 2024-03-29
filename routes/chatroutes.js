import careNoteChatController from '../controller/careNoteChatController';

const chatRoutes = (socket, io) => {
    console.log("socket id connected: ",socket.id);
  socket.on('charStart', (req )=> {
    console.log("chart start", req);
    careNoteChatController.getChats(req, io);
  });

  //add message
  socket.on('newMessage', (newMessage )=> {
    console.log(newMessage);
    careNoteChatController.addChat(newMessage, io);  
  });

  //add user
  socket.on('addUser', (userDetail)=> {
    console.log(userDetail);
    careNoteChatController.addUserToGroup(userDetail, io);  
  });
}

export default chatRoutes;