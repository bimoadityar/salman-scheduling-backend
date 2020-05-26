import { Division } from '../models';

const getDivisions = async (): Promise<Division[]> => {
  return Division.query();
};

const getDivision = async (id: number): Promise<Division> => {
  try {
    return await Division.query().findById(id);
  } catch (err) {
    if (err.name === 'DataError') {
      throw new Error("id isn't a valid number");
    }
  }
};

export { getDivisions, getDivision };
