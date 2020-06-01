import Knex from 'knex';
import { Model } from 'objection';

import Division from '../../definitions/division';

const seed = async (knex: Knex): Promise<void> => {
  Model.knex(knex);
  await Division.query().delete();
  await Division.query().insert([
    { id: 1, name: 'Informatics Engineering' },
    { id: 2, name: 'Information System and Technology' },
    { id: 3, name: 'Electrical Engineering' },
    { id: 4, name: 'Biomedical Engineering' },
    { id: 5, name: 'Electrical Power Engineering' },
    { id: 6, name: 'Telecommunication Engineering' },
  ]);
};

export { seed };
