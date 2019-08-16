"use strict";
var rooms = {};
function joinRoom(roomName, user) {
    if (rooms.hasOwnProperty(roomName)) {
        rooms[roomName].users.push(user);
    }
    else {
        rooms[roomName] = {
            name: roomName,
            users: [user]
        };
    }
    console.log(rooms);
}
function getRooms() {
    return Object.keys(rooms);
}
function leaveRoom(roomName, user) {
    rooms[roomName].users = rooms[roomName].users.filter(function (x) { return x.id !== user.id; });
    if (rooms[roomName].users.length === 0) {
        delete rooms[roomName];
    }
}
module.exports = {
    joinRoom: joinRoom,
    getRooms: getRooms,
    leaveRoom: leaveRoom
};
