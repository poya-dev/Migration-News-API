import mongoose from 'mongoose';

import app from './app';

(async function () {
  mongoose.set({ strictQuery: true });
  mongoose
    .connect('mongodb://127.0.0.1:27017/news-app-db')
    .then(() => {
      console.log('Database connected successfully.');
      app.listen(3000, () => {
        console.log('Server is listening on port 3000');
      });
    })
    .catch(() => {
      console.log('Connection to database failed.');
    });
})();
