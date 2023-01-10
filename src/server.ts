import mongoose from 'mongoose';

import app from './app';
import { db, port } from './config';

(async () => {
  mongoose.set({ strictQuery: true });
  mongoose
    .connect(`mongodb://${db.host}:${db.port}/${db.name}`)
    .then(() => {
      console.log('Database connected successfully.');
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    })
    .catch(() => {
      console.log('Connection to database failed.');
    });
})();
