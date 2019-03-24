class User {
    constructor() {
        this.users = [];
    }

    //Add a user
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    //Remove a user
    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((itm) => itm.id !== user.id);
        }
        return user;
    }

    //Fetch a User
    getUser(id) {
        return this.users.filter((itm) => itm.id === id)[0];
    }

    //Get user list
    getUserList(room) {
        return this.users.filter((itm) => itm.room === room).map((usr) => usr.name);
    }
}

module.exports = {User};