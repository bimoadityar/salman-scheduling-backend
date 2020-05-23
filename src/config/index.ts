import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env file couldn't be found");
}

export default {
  port: +process.env.PORT || 3000,
};
