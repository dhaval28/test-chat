const messageTemplates = {};

messageTemplates.generateMessage = (message) => {
    return {
        "from": message.from,
        "text": message.text,
        "createdAt": new Date().getTime()
    };
}

messageTemplates.generateLocationMessage = (message) => {
    return {
        "url": "https://www.google.com/maps?q" + message.text.latitude + ',' + message.text.longitude,
        "from": message.from,
        "text": {
            "latitude": message.text.latitude,
            "longitude": message.text.longitude
        },
        "createdAt": new Date().getTime()
    };
}

module.exports = messageTemplates;