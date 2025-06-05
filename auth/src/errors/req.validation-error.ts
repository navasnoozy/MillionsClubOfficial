// errors/req.validationError.ts
import { ZodError } from "zod/v4";
import { CustomError } from "./custom-error";



export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public error: ZodError) {
    super("Invalid request parameter");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.error.issues.map((issue) => ({
      message: issue.message,
      field: issue.path.join("."),
    }));
  }
}
