import { Server } from 'socket.io';
import { getAllFriends } from '../services/friendService';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('get_friends', async () => {
      const friends = await getAllFriends();
      socket.emit('friends_list', { friends });
    });
  });

  console.log('WebSocket inicializado');
};

export const emitFriendUpdate = (data: any) => {
  if (io) {
    io.emit('friend_updated', data); // snake_case para ser coherente
  }
};
