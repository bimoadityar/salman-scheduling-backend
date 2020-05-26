import { Router } from 'express';

import { getRooms, getRoom } from '../../services/room';
import responses from '../responses';

const route: Router = Router();

route.get('/', async (_req, res) => {
  try {
    const rooms = await getRooms();
    responses.sendOk(res, { rooms });
  } catch (err) {
    responses.sendInternalError(res, err.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id;

    const room = await getRoom(id);
    if (!room) {
      responses.sendNotFound(res, { room: "room requested doesn't exist" });
    } else {
      responses.sendOk(res, { room });
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
