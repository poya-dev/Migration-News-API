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

const whitelist = ['http://localhost:3001'];

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

app.use('/api/v1', RouteV1);

export default app;
