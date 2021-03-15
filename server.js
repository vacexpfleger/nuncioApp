const path = require('path');
const http = require ('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000 || process.env.PORT;
const formatMessage = require ('./utils/messages.js')

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Nuncio';

//Run when client connects
io.on('connection', socket => {
    console.log('New connection established');
    
    socket.emit('message', formatMessage(botName, 'Welcome.'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has joined the chat'));
    });

    //Listen for chatMessage
    socket.on('chatMessage', ({username, msg}) => {
        io.emit('message', formatMessage(username,msg));
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 