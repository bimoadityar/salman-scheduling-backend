import { Division } from '../models';
import { parseError } from './parsedError';

const getDivisions = async (): Promise<Division[]> => {
  return Division.query().orderBy('id');
};

const getDivision = async (id: number): Promise<Division> => {
  try {
    return await Division.query().findById(id);
  } catch (err) {
    throw parseError(err);
  }
};

const createDivision = async (division: Division): Promise<Division> => {
  try {
    return await Division.query().insert(division).returning('*');
  } catch (err) {
    throw parseError(err);
  }
};

const updateDivision = async (
  id: number,
  division: Division,
): Promise<Division[]> => {
  try {
    return await Division.query().findById(id).patch(division).returning('*');
  } catch (err) {
    throw parseError(err);
  }
};

const deleteDivision = async (id: number): Promise<boolean> => {
  try {
    return (await Division.query().deleteById(id)) > 0;
  } catch (err) {
    throw parseError(err);
  }
};

export {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
};
