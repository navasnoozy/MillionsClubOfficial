import { NextFunction, Request, Response } from "express";


const deletCategory = async(req:Request, res: Response, next:NextFunction)=>{
     try {
          
     } catch (error) {
          console.error("Error occured while deleting category");
          next(error)
     }
};

export { deletCategory }