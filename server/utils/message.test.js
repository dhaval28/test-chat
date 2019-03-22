var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        let from = "UserName";
        let text = "Testing";
        let message = generateMessage(from, text);

        expect(typeof(message.createdAt)).toBe('number');
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
    });
});