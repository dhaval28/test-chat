var expect = require('expect');

let validations = require('./validation');

describe('isRealString', () => {
    it('should accept this string', () => {
        let testReq = 'test';
        let isValid = validations.isRealString(testReq);

        expect(isValid).toEqual(true);
    });

    it('should reject empty string', () => {
        let testReq = '';
        let isValid = validations.isRealString(testReq);

        expect(isValid).toEqual(false);
    });

    it('should reject string with spaces only', () => {
        let testReq = '      ';
        let isValid = validations.isRealString(testReq);

        expect(isValid).toEqual(false);
    });
});
