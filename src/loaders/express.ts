import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';
import route from '../api';
import ParsedError from '../helpers/parsed-error';
import sendResponse from '../api/send-response';

const app: Application = express();
app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());
app.use(config.api.prefix, route);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err instanceof ParsedError) {
      sendResponse(res, err.code, err.data);
    } else if (err instanceof SyntaxError) {
      sendResponse(res, 400, { body: 'body is badly formatted' });
    } else {
      sendResponse(res, 500, err.message);
    }
  } else {
    next();
  }
});

app.use((_req, res) => {
  sendResponse(res, 404, { path: "method requested doesn't exist" });
});

export default app;
