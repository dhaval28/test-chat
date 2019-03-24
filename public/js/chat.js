
let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(usersList) {
    console.log(usersList);
    $('#users-list').empty();
    usersList.forEach(function(user) {
        $('#users-list').append($('<li></li>').text(user));
    })
})

socket.on('newMessage', function (message) {
    console.log('New message received', message);
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
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
        sendLocationBtn.removeAttr('disabled').text('Send Location');
    });
});

function scrollToBottom () {
    //Selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}