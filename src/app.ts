import config from './config';

import { expressApp, logger } from './loaders';

expressApp.listen(config.port, (err) => {
  if (err) {
    return console.error(err);
  }
  return logger.info(`server is listening on ${config.port}`);
});
