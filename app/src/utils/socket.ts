import io from "socket.io-client";

const port = process.env.PORT || '3005';
export const socket = io({port: port});

type EmitInitUserType = {
    userId: number,
    userName: string
};

export const emitInitUser = (user: EmitInitUserType) => {
    socket.emit('init_user', user);
};

type EmitSendMessageType = {
    sender: {
        id: number,
        name: string
    },
    reciever: number
    msg: string
};

export const emitSendMessage = (msgInfo: EmitSendMessageType) => {
    socket.emit('send_message', msgInfo);
};

type EmitWatchMessagesType = {
    sender: number
    reciever: number
};

export const emitWatchMessages = (chatUsers: EmitWatchMessagesType) => {
    socket.emit('messages_viewed', chatUsers);
};
