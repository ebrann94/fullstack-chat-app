import * as SocketIO from 'socket.io';
import * as http from 'http';
// import { SendMessageData } from '../../../shared-types/types'

const socketsio = require('socket.io');
const uuid = require('uuid');
const { joinRoom, leaveRoom, getRooms } = require('./rooms');

export interface SendMessageData {
    text: string,
    author: string,
    room: string
}

export const initSockets: Function = (server: http.Server) => {
    const io: SocketIO.Server = socketsio(server);

    io.on('connection', (socket: SocketIO.Socket) => {
        console.log('Connection Received')
        socket.emit('message', 'hello')

        socket.on('sendMessage', ({ text, author, room }: SendMessageData) => {
            console.log('Message Sent')
            socket.emit('message', createMessage(text, author, room))
        })

        socket.on('getRooms', (data, callback) => {

            console.log('Get rooms request')
            const rooms = getRooms()

            callback(rooms)
        })

        socket.on('joinRoom', ({ user, room}) => {
            socket.join(room)
            joinRoom(room, user)

            socket.to(room).emit('New User Joined')
        })

        socket.on('leaveRoom', ({ user, room }) => {
            socket.leave(room)
            leaveRoom(room, user)

            socket.to(room).emit('User has Left')
        })
        
        socket.on('disconnect', () => {

        })
    });
}

interface Message {
    id: string,
    text: string,
    author: string,
    room: string,
    createdAt: number
}

function createMessage(text: string, author: string, room: string): Message {
    return {
        text,
        author,
        room,
        id: uuid(),
        createdAt: new Date().getTime()
    }
}