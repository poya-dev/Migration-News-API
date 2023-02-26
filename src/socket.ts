import { Server } from 'socket.io';

let io: any;

export default {
  init: (httpServer: any) => {
    io = new Server(httpServer, {
      cors: {
        origin: [
          'http://localhost:3001',
          'https://panel.migration-information.com',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('*** Error ocurred upon socket initialization ***');
    }
    return io;
  },
};
