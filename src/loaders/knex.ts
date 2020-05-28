import Knex from 'knex';
import PgError from 'pg-error';

import config from '../config';

function emitPgError(err: PgError) {
  switch (err.severity) {
    case 'ERROR':
    case 'FATAL':
    case 'PANIC':
      return this.emit('error', err);
    default:
      return this.emit('notice', err);
  }
}

const { pool, ...rest } = config.database;
const configWithPgError = {
  ...rest,
  pool: {
    ...pool,
    afterCreate(conn, done) {
      conn.connection.parseE = PgError.parse;
      conn.connection.parseN = PgError.parse;
      conn.connection.on('PgError', emitPgError);
      done();
    },
  },
};

const knex = Knex(configWithPgError);

export default knex;
