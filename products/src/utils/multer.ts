import {createMulterUpload} from "@millionsclub/shared-libs"
import cloudinary from "../config/cloudnary"

export const upload = createMulterUpload (cloudinary,{folder:'productsImages', maxSize:50 * 1024 * 1024})