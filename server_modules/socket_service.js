var io;
var event_onPlayerConnected;
var event_onPlayerDisconnected;
var event_onPlayerData;
var event_onPlayerCommand;

function registerEvent(event, cb){
    switch(event){
        case 'connection':
            event_onPlayerConnected = cb;
            break;
        case 'disconnection':
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
    onConnection(socket);
    socket.on('disconnect', () => {
        onDisconnection(socket);
    })
    socket.on('join', (a, b, c) => {
        console.log(a);
        console.log(b);
        console.log(c);
    })
    socket.on('leave', (a, b, c) => {
        console.log(a);
        console.log(b);
        console.log(c);
    })
}

function onConnection(socket){
    var playerData = socket.handshake.query;
    playerData.socketId = socket.id;
    if(event_onPlayerConnected){
        event_onPlayerConnected(playerData);
    }
}

function onDisconnection(socket){
    if(event_onPlayerDisconnected){
        event_onPlayerDisconnected(socket.id);
    }
}

module.exports = (server) => {
    io = require('socket.io')(server);

    io.on("connection", (socket) => {
        flagBinding(socket);
    });
      
    return {
        RegisterEvent : registerEvent
    }
}