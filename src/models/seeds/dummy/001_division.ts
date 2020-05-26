import Knex from 'knex';

const seed = async (knex: Knex): Promise<void> => {
  await knex('division').del();
  await knex('division').insert([
    { name: 'Informatics Engineering' },
    { name: 'Information System and Technology' },
    { name: 'Electrical Engineering' },
    { name: 'Biomedical Engineering' },
    { name: 'Electrical Power Engineering' },
    { name: 'Telecommunication Engineering' },
  ]);
};

export { seed };
