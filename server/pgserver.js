const queries = require('./queries');
const client = require('socket.io').listen(4000).sockets;

// Connect to Socket.io
client.on('connection', function (socket) {

    queries.getAll().then(chats => {
        socket.emit('output', chats);
    })
        .catch(err => {
            throw err
        });


    // Handle input events
    socket.on('input', function (data) {
        let name = data.name;
        let message = data.message;
        queries.create({ name: name, message: message }).then(res => {
            client.emit('output', [data]);
        })
            .catch(err => {
                throw err;
            })

    });

    // Handle clear
    socket.on('clear', function (data) {
        // Remove all chats from collection
        queries.clearTable().then(() => {
            socket.emit('cleared');
        })
            .catch(err => {
                throw err;
            })
    });
});
