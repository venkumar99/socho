import careNoteChatController from '../controller/careNoteChatController';

const chatRoutes = (socket, io) => {
    console.log("socket id connected: ",socket.id);
  socket.on('charStart', (data )=> {
    console.log(data);
  });

  //add message
  socket.on('newMessage', (newMessage )=> {
    console.log(newMessage);
    careNoteChatController.addChat(newMessage, io);  
  });
}

export default chatRoutes;