import winston from 'winston';

import config from '../config';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: config.log.filename }),
  ],
});

export default logger;
