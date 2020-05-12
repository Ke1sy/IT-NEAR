const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;
const path = require('path');
const {userJoin, getUser, userDisconnected, getRoomUsers} = require('./utils/users');

mongoose.connect("mongodb+srv://admin:admin123@graphql-db-m4doy.mongodb.net/social-network?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

const server = app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('user connected');
    socket.on('init_user', ({userId, userName, room}) => {
        userJoin({id: socket.id, userId, userName, room: room || null});
    });

    socket.on('send_message', ({sender, reciever, msg}) => {
        const recieverUser = getUser('userId', reciever);
        if(recieverUser) {
            io.to(recieverUser.id).emit('get_new_message', {text: msg, sender});
        }
    });

    socket.on('messages_viewed', ({reciever, sender}) => {
        const recieverUser = getUser('userId', reciever);
        const senderUser = getUser('userId', sender);
        if(recieverUser) {
            io.to(recieverUser.id).emit('need_update_messages', sender);
        }
        if(senderUser) {
            io.to(senderUser.id).emit('need_update_messages', sender);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        const user = getUser('id', socket.id);
        if(user) {
            const {id, userId, username, room} = user;
            userDisconnected(user);
        }
    });
});

