var socket = require('../server_modules/socket_service')(null);
var players = {};

function onPlayerJoin(user){
   console.log(user);
}

function onPlayerLeave(user){
    console.log(user);
}

function Runtime(fps){

}

module.exports = (skt, options) => {
    var fps = options.fps || 20;
    socket = skt;
   
    Runtime(fps);

    return;
}