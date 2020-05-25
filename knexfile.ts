import config from './src/config';

module.exports = {
  [config.env]: {
    ...config.database,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/models/migrations',
    },
  },
};
