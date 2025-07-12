import { NextFunction, Request, Response } from "express";


const deleteSubCategory = async(req:Request, res: Response, next:NextFunction)=>{
     try {
          
     } catch (error) {
          console.error("Error occured while deleting addSubCategory");
          next(error)
     }
};

export { deleteSubCategory}