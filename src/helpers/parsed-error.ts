class ParsedError extends Error {
  code!: number;
  data!: Record<string, string>;

  constructor(message: string, code: number, data: Record<string, string>) {
    super(message);
    this.name = 'ParsedError';
    this.code = code;
    this.data = data;
  }
}

export default ParsedError;
