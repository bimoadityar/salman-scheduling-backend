import { knexMigrator } from '../../knexMigrator';

const seed: knexMigrator = async (knex) => {
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
