import { PartialModelObject } from 'objection';

import { Division } from '../models';
import parsePgError from '../models/parse-pg-error';

const getDivisions = async (): Promise<Division[]> => {
  return Division.query().orderBy('id');
};

const getDivision = async (id: number): Promise<Division> => {
  try {
    return await Division.query().findById(id);
  } catch (err) {
    throw parsePgError(err);
  }
};

const createDivision = async (
  division: PartialModelObject<Division>,
): Promise<Division> => {
  try {
    return await Division.query().insert(division).returning('*');
  } catch (err) {
    throw parsePgError(err);
  }
};

const updateDivision = async (
  id: number,
  division: PartialModelObject<Division>,
): Promise<Division[]> => {
  try {
    return await Division.query().findById(id).patch(division).returning('*');
  } catch (err) {
    throw parsePgError(err);
  }
};

const deleteDivision = async (id: number): Promise<boolean> => {
  try {
    return (await Division.query().deleteById(id)) > 0;
  } catch (err) {
    throw parsePgError(err);
  }
};

export {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
};
