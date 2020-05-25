import Knex from 'knex';

export type knexMigrator = (knex: Knex) => Promise<void>;
