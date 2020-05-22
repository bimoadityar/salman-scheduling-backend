import express from 'express';
import { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;
app.get('/', (_req: Request, res: Response) =>
  res.send('The sedulous hyena ate the antelope!'),
);
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
