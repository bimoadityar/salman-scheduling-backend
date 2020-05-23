import { Router } from 'express';
import defaultRoute from './routes/default';

const route: Router = Router();

route.use(defaultRoute);

export default route;
