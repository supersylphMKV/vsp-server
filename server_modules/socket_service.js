var io;
var event_onPlayerConnected;
var event_onPlayerDisconnected;
var event_onPlayerData;
var event_onPlayerCommand;
var socketMap = {};
var roomMap = {

}

function registerEvent(event, cb){
    switch(event){
        case 'join':
            event_onPlayerConnected = cb;
            break;
        case 'leave':
            event_onPlayerDisconnected = cb;
            break;
        case 'state' :
            event_onPlayerData = cb;
            break;
        case 'command' :
            event_onPlayerCommand = cb;
            break;
    }
}

function flagBinding(socket){
    socket.on('disconnect', () => {
        roomMap[socketMap[socket.id].room] = roomMap[socketMap[socket.id].room].filter(function(value){ 
            return value != socketMap[socket.id].userName;
        });
        socket.to(socketMap[socket.id].room).emit('player_leave', {userName : socketMap[socket.id].userName});
        delete socketMap[socket.id];
    })
    
    socket.on('subscribe', (room) => {
        socket.join(room);
        if(!(roomMap[room])){
            roomMap[room] = [];
        }
        roomMap[room].push(socketMap[socket.id].userName);
        socketMap[socket.id].room = room;
        socket.emit('player_list', roomMap[room]);
        socket.to(room).emit('player_join', {
            userName : socketMap[socket.id].userName,
        });
        if(event_onPlayerConnected){
            data = {
                user : socket.id,
                room : room
            }

            event_onPlayerConnected(data);
        }
    })
    socket.on('unsubs', (room) => {
        socket.leave(room);
        roomMap[room] = roomMap[room].filter(function(value){ 
            return value != socketMap[socket.id].userName;
        });
        socket.to(room).emit('player_leave', {userName : socketMap[socket.id].userName});
        if(event_onPlayerDisconnected){
            data = {
                user : socket.id,
                room : room
            }
            event_onPlayerDisconnected(data);
        }
    })
    socket.on('player_data', (data, room) => {
        socket.to(room).emit('player_update', data);
    })
}

module.exports = (server) => {
    io = require('socket.io')(server);
    io.on("connection", (socket) => {
        var userName = socket.handshake.query.userName;
        socketMap[socket.id] = {
            socket : socket,
            userName : userName
        };
        flagBinding(socket);
    });
      
    return {
        RegisterEvent : registerEvent
    }
}