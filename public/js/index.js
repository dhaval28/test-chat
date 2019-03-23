let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message received', message);
    $('#messages').append('<li>' + message.from + ': ' + message.text + '</li>');
});

socket.on('newLocationMessage', function (message) {
    console.log('New Location message received', message);
    $('#messages').append('<li>' + message.from + ': ' + '<a target="_blank" href="' + message.url + '">View Location</a></li>');
});

socket.on('newUserConnected', function (message) {
    console.log(message);
});

socket.on('welcomeMessage', function (message) {
    console.log(message);
});

//Send Message Button Logic
$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "User1",
        text: $('#messageInput').val()
    }, function (ack) {
        console.log(ack);
        $('#messageInput').val('');
    });
});

//Send Location Button Logic
let sendLocationBtn = $('#sendLocationBtn');
sendLocationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser :(');
    }
    sendLocationBtn.val('');
    sendLocationBtn.attr('disabled', 'true').text('Sending...');

    //getCurrentPosition takes to functions as arguements, (success, failure)
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        sendLocationBtn.removeAttr('disabled').text('Send Location');        
        socket.emit('createLocationMessage', {
            from: "User1",
            text: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp
            }
        }, function (ack) {
            console.log(ack);
            sendLocationBtn.removeAttr('disabled').text('Send Location');
        });
    }, function () {
        alert('Something went wrong. Unable to fetch location.');
    });
});