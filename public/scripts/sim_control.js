var unityInstanceRef, unityBridgeObject, isUnityReady;
var onUnityReady, onPlayerDataUpdate;

function SimInit(unity, onReady){
    unityInstanceRef = unity;
    onUnityReady = onReady;
    onPlayerDataUpdate = UpdatePlayer;
}

function SimSpawn(userName, isPlayer){
    if(isUnityReady){
        var userData = userName + '|' + isPlayer;
        unityInstanceRef.SendMessage(unityBridgeObject, 'SpawnPlayer', userData);
    }
}

function SimDeSpawn(userName){
    if(isUnityReady){
        unityInstanceRef.SendMessage(unityBridgeObject, 'DespawnPlayer', userName);
    }
}

function SimUpdateUser(userData){
    if(isUnityReady){
        var dataSnd = userData.userName + 
        '|' + userData.posX +
        '|' + userData.posY;
        unityInstanceRef.SendMessage(unityBridgeObject, 'UpdateUser', dataSnd);
    }
}

function UpdatePlayer(x,y){
    var pd = {
        userName : userName,
        posX : x,
        posY : y
    }

    socket.emit('state', pd);
}