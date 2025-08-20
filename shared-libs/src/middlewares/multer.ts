// import { v2 as cloudinary } from "cloudinary";
// import multer, { FileFilterCallback, Multer } from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { BadRequestError } from "../server";
// import { Request } from "express";

// interface CloudinaryParams {
//   folder: string;
//   allowed_formats: string[];
// }

// interface UploadOptions {
//   folder?: string;
//   maxFiles?: number;
//   maxSize?: number; // in bytes
//   allowedFormats?: string[];
// }

// export const createMulterUpload = (
//   cloudinaryInstance: typeof cloudinary,
//   options: UploadOptions = {}
// ) => {
//   const {
//     folder = "uploads",
//     maxFiles = 4,
//     maxSize = 5 * 1024 * 1024, // 5MB default
//     allowedFormats = ["jpg", "jpeg", "png", "webp"]
//   } = options;

//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinaryInstance,
//     params: (req, file) => ({
//       folder,
//       allowed_formats: allowedFormats,
//       // Add resource_type for better compatibility
//       resource_type: "image",
//     }),
//   });

//   const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileFilterCallback
//   ) => {
//     // Check file type
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new BadRequestError("Only image files are allowed", "images"));
//     }

//     // Check specific image formats
//     const fileExtension = file.originalname.split(".").pop()?.toLowerCase();
//     if (!fileExtension || !allowedFormats.includes(fileExtension)) {
//       return cb(
//         new BadRequestError(
//           `Only ${allowedFormats.join(", ")} formats are allowed`,
//           "images"
//         )
//       );
//     }

//     // Remove file size check from here - it's handled by multer limits
//     cb(null, true);
//   };

//   return multer({
//     storage,
//     fileFilter,
//     limits: {
//       fileSize: maxSize,
//       files: maxFiles,
//     },
//   });
// };




