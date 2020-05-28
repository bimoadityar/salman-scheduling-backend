import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';
import route from '../api';
import responses from '../api/responses';

const app: Application = express();
app.enable('trust proxy');
app.use(cors());
app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      return responses.sendBadRequest(res, { body: 'body is badly formatted' });
    }

    next();
  });
});
app.use(config.api.prefix, route);

app.use((_req, res) => {
  responses.sendNotFound(res, { path: "method requested doesn't exist" });
});

export default app;
