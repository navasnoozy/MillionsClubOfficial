import { NextFunction, Request, Response, Router } from "express";

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    

  } catch (error) {
    console.error("Error occured while updating product", error);
    next(error);
  }
};

export { updateProduct };
