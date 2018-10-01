import careNoteChatController from '../controller/careNoteChatController';

const chatroutes = (data) => {
    return careNoteChatController.addChat(data);
}

export {chatroutes};