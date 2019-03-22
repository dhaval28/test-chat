const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message')
const socketIO = require('socket.io');

const express = require('express');
var app = express();

const http = require('http');
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('welcomeMessage', generateMessage('Admin', "Welcome to the Chat Room"));

    socket.broadcast.emit('newUserConnected', generateMessage('Admin', "New User Connected"));

    socket.on('createMessage', (message, callback) => {
        console.log("New message received from client to server", message);
        callback('Acknowledged by the server.');
        //This emits to each and every client in the newtwork including itself
        // io.emit('receiveNewMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        //This will send the message to all other users.
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));        
    });

    socket.on('disconnect', () => {
        console.log('User dropped');
    });
});

app.use(express.static(publicPath));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/testPost', (req, res) => res.send('Post is working fine!'));

server.listen(port, () => {
    console.log(`Chat app listening on port ${port}!`);
});