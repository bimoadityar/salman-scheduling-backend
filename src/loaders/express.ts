import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';
import route from '../api';
import sendResponse from '../api/send-response';

const app: Application = express();
app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    sendResponse(res, 400, { body: 'body is badly formatted' });
  } else {
    next();
  }
});

app.use(config.api.prefix, route);

app.use((_req, res) => {
  sendResponse(res, 404, { path: "method requested doesn't exist" });
});

export default app;
