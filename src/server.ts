import mongoose from 'mongoose';

import { db, port } from './config';
import socket from './socket';
import httpServer from './app';

let connectedClients = 0;

(async () => {
  mongoose.set({ strictQuery: true });
  mongoose
    .connect(`mongodb://${db.host}:${db.port}/${db.name}`)
    .then(() => {
      console.log('****** Database connected successfully ******');
      httpServer.listen(port, () => {
        console.log(`****** Server is listening on port ${port} ******`);
      });
      const io = socket.init(httpServer);
      io.on('connection', (socket: any) => {
        connectedClients++;
        io.emit('clientsCount', connectedClients);
        socket.on('disconnect', () => {
          connectedClients--;
          console.log(`****** Client ${socket.id} disconnected ******`);
          io.emit('clientsCount', connectedClients);
        });
      });
    })
    .catch((e) => {
      console.log('****** Database connection failed ******');
    });
})();
