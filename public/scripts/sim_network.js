var socket;

function DataInit(){
    socket = io({
        query: {
          userName: userName
        }
      });
    socket.on('connection', () => {
        socket.join('plaza');
    });
}