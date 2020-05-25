import { knexMigrator } from '../migrationUtil';

const up: knexMigrator = async (knex) => {
  await knex.schema.createTable('room', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name', 60).notNullable().unique();
  });
};

const down: knexMigrator = async (knex) => {
  await knex.schema.dropTable('room');
};

export { up, down };
