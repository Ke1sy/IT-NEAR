let users = [];

const userJoin = (user) => {
    users = [...users.filter(({id}) => id !== user.id), user];
    console.log(users);
    return user;
};

const userDisconnected = (user) => {
    users.splice(users.indexOf(user), 1);
};

const getUser = (property, id) => {
    return users.find(user => user[property] === id);
};

const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
};


module.exports = {
    userJoin,
    getUser,
    userDisconnected,
    getRoomUsers
};
