export enum Errors {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  INTERNAL_SERVER = 500,
  NOT_ACCEPTABLE = 406,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}

export class AppError extends Error {
  public readonly error: number;
  public readonly message: string;
  constructor(message: string, error = Errors.BAD_REQUEST) {
    super();
    this.error = error;
    this.message = message;
  }
}
