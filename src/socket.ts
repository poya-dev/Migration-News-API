import { Server } from 'socket.io';

let io: any;

export default {
  init: (httpServer: any) => {
    io = new Server(httpServer, {
      cors: {
        origin: 'http://89.116.229.199:3001',
        methods: ['GET', 'POST'],
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
