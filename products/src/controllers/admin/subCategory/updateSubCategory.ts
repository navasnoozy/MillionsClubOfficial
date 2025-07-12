import { NextFunction, Request, Response } from "express";


const updateSubCategory = async(req:Request, res: Response, next:NextFunction)=>{
     try {
          
     } catch (error) {
          console.error("Error occured while updating addSubCategory");
          next(error)
     }
};

export { updateSubCategory }