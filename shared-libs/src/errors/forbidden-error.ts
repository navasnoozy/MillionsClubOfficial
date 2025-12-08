import { CustomError } from "./custom-error";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super("Access Denied: You do not have permission to perform this action.");
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
