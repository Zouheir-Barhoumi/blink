import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { chatSocket } from './sockets/chatSocket.js';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  chatSocket(socket, io);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
