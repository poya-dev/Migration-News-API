import mongoose from 'mongoose';

import { db, port } from './config';
import socket from './socket';
import httpServer from './app';

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
        console.log(`****** Client connected ${socket.id} ******`);
      });
    })
    .catch((e) => {
      console.log('****** Database connection failed ******');
    });
})();
