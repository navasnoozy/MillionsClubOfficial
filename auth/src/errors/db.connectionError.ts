// auth/src/errors/db.connectionError.ts

import { CustomError } from "./custom-error";

export class DBConnectionError extends CustomError {
  statusCode = 500;
  reason = "Database connectin error";

  constructor(public message: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
