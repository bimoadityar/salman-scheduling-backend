import express from 'express';
import { Application } from 'express';

import route from '../api';

const app: Application = express();
app.use(route);

export default app;
