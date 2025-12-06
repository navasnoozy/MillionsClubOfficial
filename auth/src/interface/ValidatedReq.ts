import { Request } from "express";

export interface ValidatedRequest<Body = any, Query = any, Params = any> extends Request {
  validated: {
    body: Body;
    query: Query;
    params: Params;
  };
}