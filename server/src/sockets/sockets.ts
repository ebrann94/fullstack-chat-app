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

        socket.on('sendMessage', ({ text, author, room }: SendMessageData) => {
            io.to(room).emit('message', createMessage(text, author, room))
        })

        socket.on('getRooms', (data, callback) => {
            const rooms = getRooms()

            callback(rooms)
        })

        socket.on('joinRoom', ({ user, room }, callback) => {
            socket.join(room)
            const joinedRoom = joinRoom(room, user)

            // Send room info in callback
            callback({
                error: false,
                room: joinedRoom
            })
            
            // Tell other room users a new user has joined
            socket.to(room).emit('newUser', {
                user,
                room
            })
        })

        socket.on('leaveRoom', ({ user, room }, cb) => {
            socket.leave(room)
            leaveRoom(room, user)

            cb()
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