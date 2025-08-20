import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string, public field?: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message, field: this.field }];
  }
}
