import { DBError } from 'db-errors';

import ParsedError from '../helpers/parsed-error';

const isPgError = (err: Error): boolean => {
  return 'detail' in err;
};

interface PgError extends Error {
  detail: string;
}

const parsePgError = (err: Error): ParsedError => {
  let match: string[];
  if (err.name === 'ValidationError') {
    const [, field, message] = /^([ -~]+): ([ -~]+)$/.exec(err.message);
    return new ParsedError(err.message, 400, {
      [field]: `${field} ${message}`,
    });
  }

  let pgError: PgError;
  if (isPgError(err)) {
    pgError = err as PgError;
  } else if (err instanceof DBError && isPgError(err.nativeError)) {
    pgError = err.nativeError as PgError;
  } else {
    return new ParsedError(err.message, 500, null);
  }

  if (
    (match = /Key \((\w+)\)=\(([ -~]+)\) already exists./.exec(pgError.detail))
  ) {
    return new ParsedError('conflict', 409, {
      [match[1]]: `${match[1]} already exist`,
    });
  } else if (
    pgError.message.includes('invalid input syntax for type integer')
  ) {
    return new ParsedError('bad request', 400, {
      id: "id isn't a valid integer",
    });
  } else {
    return new ParsedError(err.message, 500, null);
  }
};

export default parsePgError;
