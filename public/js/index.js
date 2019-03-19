let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message received', message);
});

socket.on('newUserConnected', function (message) {
    console.log(message);
});

socket.on('welcomeMessage', function (message) {
    console.log(message);
});