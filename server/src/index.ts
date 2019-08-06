const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { initSockets } = require('./sockets/sockets');

const app = express();
const server = http.createServer(app);
initSockets(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));