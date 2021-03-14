const path = require('path');
const http = require ('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000 || process.env.PORT;

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {
    console.log('New connection established');

    //Welcome current user
    socket.emit('message', 'Welcome to ChatCord!');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined a chat');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left a chat')
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 