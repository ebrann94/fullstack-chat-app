"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { SendMessageData } from '../../../shared-types/types'
var socketsio = require('socket.io');
var uuid = require('uuid');
var _a = require('./rooms'), joinRoom = _a.joinRoom, leaveRoom = _a.leaveRoom, getRooms = _a.getRooms;
exports.initSockets = function (server) {
    var io = socketsio(server);
    io.on('connection', function (socket) {
        socket.on('sendMessage', function (_a) {
            var text = _a.text, author = _a.author, room = _a.room;
            io.to(room).emit('message', createMessage(text, author, room));
        });
        socket.on('getRooms', function (data, callback) {
            var rooms = getRooms();
            callback(rooms);
        });
        socket.on('joinRoom', function (_a, callback) {
            var user = _a.user, room = _a.room;
            socket.join(room);
            var joinedRoom = joinRoom(room, user);
            // Send room info in callback
            callback({
                error: false,
                room: joinedRoom
            });
            // Tell other room users a new user has joined
            socket.to(room).emit('newUser', {
                user: user,
                room: room
            });
        });
        socket.on('leaveRoom', function (_a, cb) {
            var user = _a.user, room = _a.room;
            socket.leave(room);
            leaveRoom(room, user);
            cb();
            socket.to(room).emit('User has Left');
        });
        socket.on('disconnect', function () {
        });
    });
};
function createMessage(text, author, room) {
    return {
        text: text,
        author: author,
        room: room,
        id: uuid(),
        createdAt: new Date().getTime()
    };
}
