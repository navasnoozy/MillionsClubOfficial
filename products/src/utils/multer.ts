import {createMulterUpload} from "@millionsclub/shared-libs"
import cloudinary from "../config/cloudnary"

export const upload = createMulterUpload (cloudinary)