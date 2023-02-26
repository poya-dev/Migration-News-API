import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { createServer } from 'http';
import cors from 'cors';
import path from 'path';

import './services/facebookPassport.service';

import NotificationService from './services/FCMNotification.service';

// API V1 route
import RouteV1 from './routes/v1';

const app = express();

const whitelist = [
  'http://localhost:3001',
  'https://panel.migration-information.com',
];

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin: any, callback: any) => {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
};

NotificationService.initializeService();

app.use('/uploads/images', express.static(path.join(__dirname, '../uploads')));
app.use(passport.initialize());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors(corsOptions));

// ROOT API ENDPOINT
app.use('/api/v1', RouteV1);

const httpServer = createServer(app);

export default httpServer;
