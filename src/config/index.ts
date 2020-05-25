import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env file couldn't be found");
}

export default {
  env: process.env.NODE_ENV,

  port: +process.env.PORT,
  api: {
    prefix: process.env.API_PREFIX,
  },

  database: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: +process.env.DB_POOL_MIN,
      max: +process.env.DB_POOL_MAX,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
