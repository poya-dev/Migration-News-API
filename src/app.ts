import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to NEWS API');
});

export default app;
