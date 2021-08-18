var socket, room;

function DataInit(){
    socket = io({
        query: {
          userName: userName
        }
      });
    socket.on('connect', () => {
        socket.emit('subscribe', 'plaza');
        room = 'plaza';
    });
    socket.on('player_list', (data) => {
        if(data.length){
            data.forEach(element => {
                if(element != userName){
                    SimSpawn(element, false);
                }
            });
        }
    })
    socket.on('player_update', (data) =>{
        SimUpdateUser(data);
    })
    socket.on('player_join', data => {
        SimSpawn(data.userName, false);
    })
    socket.on('player_leave', data =>{
        SimDeSpawn(data.userName);
    })
}

function BroadcastPlayerData(data){
    if(socket){
        socket.emit('player_data', data, room);
    }
}
