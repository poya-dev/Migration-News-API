import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import RouteV1 from './routes/v1';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use('/api/v1', RouteV1);

export default app;
