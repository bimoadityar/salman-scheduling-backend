import { Router } from 'express';

import { getDivisions, getDivision } from '../../services/division';
import responses from '../responses';

const route: Router = Router();

route.get('/', async (_req, res) => {
  try {
    const divisions = await getDivisions();
    responses.sendOk(res, { divisions });
  } catch (err) {
    responses.sendInternalError(res, err.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id;

    const division = await getDivision(id);
    if (!division) {
      responses.sendNotFound(res, {
        division: "division requested doesn't exist",
      });
    } else {
      responses.sendOk(res, { division });
    }
  } catch (err) {
    if (err.message === "id isn't a valid number") {
      responses.sendBadRequest(res, { id: "id isn't a valid number" });
    } else {
      responses.sendInternalError(res, err.message);
    }
  }
});

export default route;
