import Knex from 'knex';

const seed = async (knex: Knex): Promise<void> => {
  await knex('room').del();
  await knex('room').insert([
    { name: 'room A' },
    { name: 'room B' },
    { name: 'room C' },
    { name: 'room D' },
    { name: 'room E' },
    { name: 'room F' },
  ]);
};

export { seed };
