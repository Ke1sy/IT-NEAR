const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;
const path = require('path');

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
    err ? console.log(err) : console.log(`Server started on port: ${PORT}`);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new_message', (msg) => {
        io.emit('new_message', msg);
    });
    socket.on('watch_messages', (participants) => {
        io.emit('watch_messages', participants);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
