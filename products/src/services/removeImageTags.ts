import cloudinary from '../config/cloudnary';

const removeImageTags = async (public_ids: string [] ) => {
  if (!public_ids || public_ids.length < 1) {
  console.log('Public id not found');
  return null;
}

 const result =  await cloudinary.uploader.remove_tag('temp', public_ids);
 console.log('product result .........', result);
 
 
 return result
};

export { removeImageTags };
