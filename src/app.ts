import config from './config';

import { expressApp } from './loaders';

expressApp.listen(config.port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${config.port}`);
});
