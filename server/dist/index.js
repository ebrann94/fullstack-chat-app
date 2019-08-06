"use strict";
var path = require('path');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketio(server);
var PORT = process.env.PORT || 3000;
io.on('connection', function () {
});
server.listen(PORT, function () { return console.log("Listening on port " + PORT); });
