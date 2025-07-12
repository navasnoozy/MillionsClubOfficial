import { NextFunction, Request, Response } from "express";
import { Category } from "../../models/categoryModel";



const listCategory = async(req:Request,res:Response, next: NextFunction)=>{
     try {
          const categories = await Category.find().populate("Subcategory");

          res.status(200).send({success:true, data: categories})
           

     } catch (error) {
          console.log('Error occured while listing categories');
          next(error)
          
     }
}

export { listCategory }