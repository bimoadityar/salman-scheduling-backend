import { Router } from 'express';
import _ from 'lodash';

import {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
} from '../../services/division';
import ParsedError from '../../helpers/parsed-error';
import sendResponse from '../send-response';

const route: Router = Router();

route.get('/', async (_req, res) => {
  const divisions = await getDivisions();
  sendResponse(res, 200, { divisions });
});

route.get('/:id', async (req, res) => {
  const id = +req.params.id;

  const division = await getDivision(id);
  if (!division) {
    throw new ParsedError("division requested doesn't exist", 404, {
      division: "division requested doesn't exist",
    });
  } else {
    sendResponse(res, 200, { division });
  }
});

route.post('/', async (req, res) => {
  const divisionQuery = _.pick(req.body, ['name']);

  const division = await createDivision(divisionQuery);
  sendResponse(res, 201, { division });
});

route.patch('/:id', async (req, res) => {
  const id = +req.params.id;
  const divisionQuery = _.pick(req.body, ['name']);

  const division = await updateDivision(id, divisionQuery);
  if (!division) {
    throw new ParsedError("division requested doesn't exist", 404, {
      division: "division requested doesn't exist",
    });
  } else {
    sendResponse(res, 200, { division });
  }
});

route.delete('/:id', async (req, res) => {
  const id = +req.params.id;

  const success = await deleteDivision(id);
  if (!success) {
    throw new ParsedError("division requested doesn't exist", 404, {
      division: "division requested doesn't exist",
    });
  } else {
    sendResponse(res, 200);
  }
});

export default route;
