import cloudinary from "../config/cloudnary";

const removeImageTags = async (public_ids: string[]) => {
  if (!public_ids || public_ids.length < 1) {
    console.log("Public id of cloudinary image not found");
    return null;
  }

  const result = await cloudinary.uploader.remove_tag("temp", public_ids);

  return result;
};

export { removeImageTags };
