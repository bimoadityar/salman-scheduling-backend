import { Router } from 'express';

import defaultRoute from './routes/default';
import roomRoute from './routes/room';

const route: Router = Router();

route.use('/room', roomRoute);
route.use(defaultRoute);

export default route;
