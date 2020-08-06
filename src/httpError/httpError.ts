class GeneralError extends Error {
  public httpStatus: number;
  public body: Object | null;
  constructor(message: string, body: Object = null) {
    super(message);
    this.message = message;
    this.body = body;
  }
}

class BadRequest extends GeneralError {
  public httpStatus: number = 400;
}

class Unauthorized extends GeneralError {
  public httpStatus: number = 401;
}

export { GeneralError, BadRequest, Unauthorized };
