// auth/src/errors/not-found-error.ts
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public override message: string = "Route not found") {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

