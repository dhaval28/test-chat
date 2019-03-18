let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('sendNewMessage', {
        text: "Hey server!! How you doin!!",
        sentAt: 15553524213,
        sentBy: "+91 9988989889"
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('receiveNewMessage', function (message) {
    console.log('New message received', message);
});