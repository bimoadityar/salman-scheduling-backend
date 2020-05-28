import Knex from 'knex';

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('division', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name', 60).notNullable().unique();
  });
};

const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('division');
};

export { up, down };
