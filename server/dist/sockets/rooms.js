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
    return rooms[roomName];
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
function removeUserFromRooms(user) {
    Object.keys(rooms).forEach(function (key) {
        rooms[key].users = rooms[key].users.filter(function (u) { return u.name !== user; });
    });
}
module.exports = {
    joinRoom: joinRoom,
    getRooms: getRooms,
    leaveRoom: leaveRoom,
    removeUserFromRooms: removeUserFromRooms
};
