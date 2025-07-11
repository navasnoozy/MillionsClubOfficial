import { NextFunction, Request, Response } from "express";

const uploadImage = async (req: Request, res: Response, next:NextFunction) => {
  try {

      console.log('check for upload image reach');

    console.log(`checking req file ${req.file}`);
    
    const image =  req.file

  
    

    res.status(200).send(image);
  } catch (error) {
    console.log('Error occured while uploading image');
    next()
    
  }
};

export { uploadImage };
