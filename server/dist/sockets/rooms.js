"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    console.log(rooms[roomName].users);
    return rooms[roomName];
}
function getRooms() {
    return Object.keys(rooms);
}
function leaveRoom(roomName, id) {
    var users = rooms[roomName].users;
    rooms[roomName].users = users.filter(function (x) { return x.socketId !== id; });
    if (rooms[roomName].users.length === 0) {
        delete rooms[roomName];
    }
}
function removeUserById(idToDelete) {
    var keys = Object.keys(rooms);
    keys.forEach(function (key) {
        var room = rooms[key];
        var users = room.users;
        rooms[key] = __assign({}, room, { users: users.filter(function (user) { return user.socketId !== idToDelete; }) });
    });
}
function doesUserExist(username) {
    var keys = Object.keys(rooms);
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var users = rooms[key].users;
        var index = users.findIndex(function (user) { return user.username === username; });
        if (index > -1) {
            return true;
        }
    }
    return false;
}
module.exports = {
    joinRoom: joinRoom,
    getRooms: getRooms,
    leaveRoom: leaveRoom,
    removeUserById: removeUserById,
    doesUserExist: doesUserExist
};
