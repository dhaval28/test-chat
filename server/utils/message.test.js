var expect = require('expect');

let messageTempaltes = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        let testReq = {
            from: "UserName",
            text: "Testing"
        }
        let message = messageTempaltes.generateMessage(testReq);

        expect(typeof (message.createdAt)).toBe('number');
        expect(message.from).toEqual(testReq.from);
        expect(message.text).toEqual(testReq.text);
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct Location message', () => {
        let testReq = {
            from: "UserName",
            text: {
                latitude: 2,
                longitude: 2,
                timestamp: 1111111111
            }
        }

        let message = messageTempaltes.generateLocationMessage(testReq);

        expect(message.url).toEqual("https://www.google.com/maps?q" + message.text.latitude + ',' + message.text.longitude);

    });
});