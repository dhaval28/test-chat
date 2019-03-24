const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const messageTemplates = require('./utils/message');
const validations = require('./utils/validation');
const socketIO = require('socket.io');

const express = require('express');
var app = express();

const http = require('http');
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', messageTemplates.generateMessage({"from": "Admin","text": "Welcome to the Chat Room"}));
    socket.broadcast.emit('newMessage', messageTemplates.generateMessage({"from": "Admin","text": "New User Connected"}));

    socket.on('join', (params, callback) => {
        if (validations.isRealString(params.name) || !validations.isRealString(params.room)) {
            callback('Name and Room required');
        }

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log("New message received from client to server", message);
        callback('Message Reached server.');

        //This emits to each and every client in the newtwork including itself
        io.emit('newMessage', messageTemplates.generateMessage(message));

        //This will send the message to all other users.
        // socket.broadcast.emit('newMessage', messageTemplates.generateMessage(message));
    });

    socket.on('createLocationMessage', (message, callback) => {
        console.log("New Location message received from client to server", message);
        callback('Location Message Reached server.');
        
        io.emit('newLocationMessage', messageTemplates.generateLocationMessage(message));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(publicPath));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/testPost', (req, res) => res.send('Post is working fine!'));

server.listen(port, () => {
    console.log(`Chat app listening on port ${port}!`);
});