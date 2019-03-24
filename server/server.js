const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const messageTemplates = require('./utils/message');
const validations = require('./utils/validation');
const { User } = require('./utils/users');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var userInstance = new User();
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!validations.isRealString(params.name) || !validations.isRealString(params.room)) {
            callback('Name and Room required');
            return;
        }

        //To leave a group
        // socket.leave(params.room);

        //join method accepts a string and creates a room
        socket.join(params.room);
        userInstance.removeUser(socket.id);
        userInstance.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', userInstance.getUserList(params.room));
        socket.emit('newMessage', messageTemplates.generateMessage({ from: "Admin", text: "Welcome to the Chat Room" }));
        //'to' method will specify to whom the event should be emitted. In this case, users of params.room
        socket.broadcast.to(params.room).emit('newMessage', messageTemplates.generateMessage({ from: "Admin", text: params.name + " Connected." }));

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
        let user = userInstance.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', userInstance.getUserList(user.room));
            io.to(user.room).emit('newMessage', messageTemplates.generateMessage({ from: 'Admin', text: user.name + ' left.'}));
}
    });
});

app.use(express.static(publicPath));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/testPost', (req, res) => res.send('Post is working fine!'));

server.listen(port, () => {
    console.log(`Chat app listening on port ${port}!`);
});