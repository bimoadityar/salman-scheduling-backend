import { Router } from 'express';

import defaultRoute from './routes/default';
import divisionRoute from './routes/division';

const route: Router = Router();

route.use('/divisions', divisionRoute);
route.use(defaultRoute);

export default route;
