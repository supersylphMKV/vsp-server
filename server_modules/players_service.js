var socket = require('../server_modules/socket_service')(null);
var players = {};

function onNewConnection(player){
    if(!(player.id in players)){
        players[player.id] = player;
    }
}

function onCloseConnection(playerId){
    delete players[playerId];
}

function Runtime(fps){

}

module.exports = (skt, options) => {
    var fps = options.fps || 20;
    socket = skt;

    

    Runtime(fps);

    return;
}