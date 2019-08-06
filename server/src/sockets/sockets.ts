import * as SocketIO from 'socket.io';
import * as http from 'http';

const socketsio = require('socket.io');
const uuid = require('uuid');

export const initSockets: Function = (server: http.Server) => {
    const io: SocketIO.Server = socketsio(server);

    io.on('connection', (socket: SocketIO.Socket) => {
        socket.on('sendMessage', ({ text, author }: SendMessageData) => {

            socket.emit('message', createMessage(text, author))
        });
        
        socket.on('disconnect', () => {
            
        })
    });
}

interface SendMessageData {
    text: string,
    author: string
}

interface Message {
    id: string,
    text: string,
    author: string,
    createdAt: number
}

function createMessage(text: string, author: string): Message {
    return {
        text,
        author,
        id: uuid(),
        createdAt: new Date().getTime()
    }
}