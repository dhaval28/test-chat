let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message received', message);
    $('#messages').append('<li>'+ message.from + ': ' + message.text + '</li>');
});

socket.on('newUserConnected', function (message) {
    console.log(message);
});

socket.on('welcomeMessage', function (message) {
    console.log(message);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "User1",
        text: $('#messageInput').val()
    }, function(ack) {
        console.log(ack);
    });
});