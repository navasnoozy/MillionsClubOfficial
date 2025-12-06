//shared-libs/src/middlewares/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/reqValidationError";
import { ZodType } from "zod/v4";

export const validateRequest = <T> (schema: ZodType <T>, source: "body" | "params" | "query" = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      throw new RequestValidationError(result.error);
    }

    req.validated[source]  = result.data as T;

    next();
  };
};
