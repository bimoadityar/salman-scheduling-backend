import { Room } from '../models';

const getRooms = async (): Promise<Room[]> => {
  return Room.query();
};

const getRoom = async (id: number): Promise<Room> => {
  try {
    return await Room.query().findById(id);
  } catch (err) {
    if (err.name === 'DataError') {
      throw new Error("id isn't a valid number");
    }
  }
};

export { getRooms, getRoom };
