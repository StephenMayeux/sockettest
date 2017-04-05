var counter = 0;

module.exports = (socket) => {

  socket.emit('init', {
    counter
  });

  socket.on('incrementCounter', (data) => {
    counter = data;
    socket.broadcast.emit('incrementCounter', {
      counter
    });
  });
}
