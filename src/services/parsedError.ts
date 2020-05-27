import { DBError } from 'db-errors';

class ParsedError extends Error {
  data!: Record<string, string>;

  constructor(message: string, data: Record<string, string>) {
    super(message);
    this.data = data;
  }
}

const isPgError = (err: Error): boolean => {
  return 'detail' in err;
};

interface PgError extends Error {
  detail: string;
}

const parseError = (err: Error): ParsedError => {
  let match: string[];
  if (err.name === 'ValidationError') {
    const [, field, message] = /^([ -~]+): ([ -~]+)$/.exec(err.message);
    return new ParsedError('bad request', {
      [field]: `${field} ${message}`,
    });
  }

  let pgError: PgError;
  if (isPgError(err)) {
    pgError = err as PgError;
  } else if (err instanceof DBError && isPgError(err.nativeError)) {
    pgError = err.nativeError as PgError;
  } else {
    return new ParsedError(err.message, null);
  }

  if (
    (match = /Key \((\w+)\)=\((\w+)\) already exists./.exec(pgError.detail))
  ) {
    return new ParsedError('conflict', {
      [match[1]]: `${match[1]} already exist`,
    });
  } else if (
    pgError.message.includes('invalid input syntax for type integer')
  ) {
    return new ParsedError('bad request', { id: "id isn't a valid integer" });
  } else {
    return new ParsedError(err.message, null);
  }
};

export { ParsedError, parseError };
