var moment = require('moment');
const messageTemplates = {};

messageTemplates.generateMessage = (message) => {
    return {
        "from": message.from,
        "text": message.text,
        "createdAt": moment().valueOf()
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
        "createdAt": moment().valueOf()
    };
}

module.exports = messageTemplates;