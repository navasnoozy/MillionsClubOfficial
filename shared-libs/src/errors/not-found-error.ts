// auth/src/errors/not-found-error.ts
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");
  }

  serializeError() {
    return [{ message: "Route not found" }];
  }
}
