import { Router, Request, Response } from 'express';

const route: Router = Router();

route.get('/', (_req: Request, res: Response): void => {
  res.status(200).send('The sedulous hyena ate the antelope!');
});

route.use((_req: Request, res: Response): void => {
  res.status(404).send('Not found');
});

export default route;
