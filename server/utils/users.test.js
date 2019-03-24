var expect = require('expect');

let {User} = require('./users');

describe('Users', () => {

    var userInstance;
    beforeEach(() => {
        userInstance = new User();
        userInstance.users = [{
            id: "1",
            name: "testname1",
            room: "testroom1"
        },
        {
            id: "2",
            name: "testname2",
            room: "testroom2"
        },
        {
            id: "3",
            name: "testname3",
            room: "testroom2"
        }
        ];
    });
    it('should add the user', () => {
        let testReq = {
            id: "1234",
            name: "testname",
            room: "testroom"
        }
        userInstance.users = [];
        let output = userInstance.addUser(testReq.id, testReq.name, testReq.room);

        expect(userInstance.users).toEqual([testReq]);
    });

    it('should find a userobject with id 1', () => {
        let output = userInstance.getUser('1');
        expect(output.id).toEqual('1');
    });

    it('should return the object of removed user', () => {
        let output = userInstance.removeUser('1');
        expect(output.id).toEqual('1');
    });

    it('should return user list of room testroom2', () => {
        
        let output = userInstance.getUserList('testroom2');

        expect(output).toEqual(['testname2', 'testname3']);
    });
});