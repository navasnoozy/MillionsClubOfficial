// shared-libs/src/types/express.d.ts
declare namespace Express {
  export interface Request {
    validated: {
      query?: any;
      body?: any;
      params?: any;
    };
  }
}
