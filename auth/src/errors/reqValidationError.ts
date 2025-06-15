// auth/src/errors/reqValidationError.ts
import { ZodError } from "zod/v4";
import { CustomError } from "./custom-error";



export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public error: ZodError) {
    super("Invalid request parameter");
  }

  serializeError() {
    return this.error.issues.map((issue) => ({
      message: issue.message,
      field: issue.path.join("."),
    }));
  }
}
