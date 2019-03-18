const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const socketIO = require('socket.io');

const express = require('express');
var app = express();

const http = require('http');
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('receiveNewMessage', {
        text: "You have a new message from the server",
        receivedAt: 15553524213,
        receivedBy: "+91 9988989889"
    });

    socket.on('sendNewMessage', function (message) {
        console.log("New message received from client to server", message);
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