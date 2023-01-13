import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';
import cors from 'cors';

import './services/facebookPassport.service';

// NEWS API V1 route
import RouteV1 from './routes/v1';

const app = express();

app.use(passport.initialize());
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
