import { DBError } from 'db-errors';
import { Model } from 'objection';

import ParsedError from '../helpers/parsed-error';

const parsePgError = (err: Error): ParsedError => {
  if (err instanceof Model['ValidationError']) {
    const [, field, message] = /^([ -~]+): ([ -~]+)$/.exec(err.message);
    return new ParsedError(
      err.message,
      400,
      { [field]: `${field} ${message}` },
      err,
    );
  }

  let dbError: DBError;
  if (err instanceof DBError) {
    dbError = err as DBError;
  } else {
    return new ParsedError(err.message, 500, null, err);
  }

  let match: string[];
  if (dbError['constraint'] && typeof dbError['constraint'] === 'string') {
    if ((match = /^(\w+)_(\w+)_(\w+)$/.exec(dbError['constraint']))) {
      const [, , field, type] = match;
      if (type === 'unique') {
        return new ParsedError(
          err.message,
          409,
          { [field]: `${field} already exist` },
          err,
        );
      }
      return new ParsedError(err.message, 500, null, err);
    }
    return new ParsedError(err.message, 500, null, err);
  }

  if (dbError.message.includes('invalid input syntax for type integer')) {
    return new ParsedError(
      'bad request',
      400,
      {
        id: "id isn't a valid integer",
      },
      err,
    );
  }

  return new ParsedError(err.message, 500, null, err);
};

export default parsePgError;
