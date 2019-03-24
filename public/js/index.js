
let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message received', message);
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    console.log('New Location message received', message);
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $('#messages').append(html);
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
        text: $('#message-input').val()
    }, function (ack) {
        console.log(ack);
        $('#message-input').val('');
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