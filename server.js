const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketRoutes = require('./socketRoutes');

const server = http.createServer(app);

const io = require('socket.io').listen(server);
io.sockets.on('connection', socketRoutes);

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Running on port', port);
});
