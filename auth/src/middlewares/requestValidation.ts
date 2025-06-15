// auth/src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/reqValidationError';
import { ZodType } from 'zod/v4';

export const validateRequest = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      throw new RequestValidationError(result.error);
    }
    
    next();
  };
};