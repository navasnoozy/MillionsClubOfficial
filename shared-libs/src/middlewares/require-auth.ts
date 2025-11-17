import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorizedError';


export const require_auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
