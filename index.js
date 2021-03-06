// var PORT = process.env.PORT;
var PORT = 5000;
const io = require('socket.io')(PORT);
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message:message, name: users[socket.id]});
    });

    socket.on('disconnect', mess => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
