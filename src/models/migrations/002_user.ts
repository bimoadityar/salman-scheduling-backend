import Knex from 'knex';

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().primary();
    table.string('email').notNullable().unique();
    table.string('name', 60).notNullable().unique();
    table.string('password').notNullable();
    table
      .enu('role', ['admin', 'manager', 'guest'], {
        useNative: true,
        enumName: 'role',
      })
      .notNullable();
    table.string('phone', 15);
    table.string('avatar');
    table
      .integer('divisionId')
      .unsigned()
      .references('id')
      .inTable('division')
      .onDelete('cascade');
  });
};

const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('user');
};

export { up, down };
