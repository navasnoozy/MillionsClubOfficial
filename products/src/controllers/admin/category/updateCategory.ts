import { NextFunction, Request, Response } from "express";


const updateCategory = async(req:Request, res: Response, next:NextFunction)=>{
     try {
          
     } catch (error) {
          console.error("Error occured while updating category");
          next(error)
     }
};

export { updateCategory }