import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../loaders';

import defaultRoute from './routes/default';
import divisionRoute from './routes/division';
import ParsedError from '../helpers/parsed-error';
import sendResponse from './send-response';

const route: Router = Router();

route.use('/divisions', divisionRoute);
route.use(defaultRoute);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err instanceof ParsedError && err.code !== 500) {
      sendResponse(res, err.code, err.data);
    } else {
      logger.error({ req, err });
      sendResponse(res, 500, err.message);
    }
  } else {
    next();
  }
});

export default route;
