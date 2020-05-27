import { Router } from 'express';

import {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
} from '../../services/division';
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
    responses.handleError(res, err);
  }
});

route.put('/', async (req, res) => {
  try {
    const divisionQuery = req.body;

    const division = await createDivision(divisionQuery);
    responses.sendCreated(res, { division });
  } catch (err) {
    responses.handleError(res, err);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const divisionQuery = req.body;

    const division = await updateDivision(id, divisionQuery);
    console.log(division);
    if (!division) {
      responses.sendNotFound(res, {
        division: "division requested doesn't exist",
      });
    } else {
      responses.sendOk(res, { division });
    }
  } catch (err) {
    responses.handleError(res, err);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const id = +req.params.id;

    const success = await deleteDivision(id);
    if (!success) {
      responses.sendNotFound(res, {
        division: "division requested doesn't exist",
      });
    } else {
      responses.sendOk(res);
    }
  } catch (err) {
    responses.handleError(res, err);
  }
});

export default route;
