class ParsedError extends Error {
  code!: number;
  data!: Record<string, string>;
  nativeError: Error;

  constructor(
    message: string,
    code: number,
    data: Record<string, string>,
    nativeError: Error = null,
  ) {
    super(message);
    this.name = 'ParsedError';
    this.code = code;
    this.data = data;
    this.nativeError = nativeError;
  }
}

export default ParsedError;
