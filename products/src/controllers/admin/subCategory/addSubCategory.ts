import { NextFunction, Request, Response } from "express";


const addSubCategory = async(req:Request, res: Response, next:NextFunction)=>{
     try {
          
     } catch (error) {
          console.error("Error occured while adding addSubCategory");
          next(error)
     }
};

export { addSubCategory }