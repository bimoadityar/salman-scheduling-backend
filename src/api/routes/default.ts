import { Router } from 'express';

import sendResponse from '../send-response';

const route: Router = Router();

route.get('/status', (_req, res) => {
  sendResponse(res, 200);
});

export default route;
