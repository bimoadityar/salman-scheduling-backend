import { Router } from 'express';

import responses from '../responses';

const route: Router = Router();

route.get('/status', (_req, res) => {
  responses.sendOk(res);
});

route.head('/status', (_req, res) => {
  responses.sendOk(res);
});

export default route;
