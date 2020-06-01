import { createLogger, format, transports } from 'winston';

import config from '../config';

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'warn',
      format: combine(timestamp(), prettyPrint()),
    }),
    new transports.File({
      level: 'info',
      filename: config.log.filename,
      format: timestamp(),
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export default logger;
