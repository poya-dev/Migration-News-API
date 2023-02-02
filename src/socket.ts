import { Server } from 'socket.io';

let io: any;

export default {
  init: (httpServer: any) => {
    io = new Server(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('****** Socket.io not initialized ******');
    }
    return io;
  },
};
