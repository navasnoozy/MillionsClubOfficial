import { useFormContext, useWatch } from "react-hook-form";
import type { AddProductSchema, AddProductVariant } from "@millionsclub/shared-libs/client";
import ImageFrame from "../../components/ImageFrame";

const ProductImageUploader = () => {
  const { control } = useFormContext<AddProductSchema | AddProductVariant>();
  const watchedImages = useWatch({ control, name: "images" }) ?? [];
  const images: { secure_url: string; public_id: string }[] = watchedImages;

  const paddedImages = [...images, ...Array(Math.max(0, 4 - images.length)).fill(null)];

  return <ImageFrame images={paddedImages} />;
};

export default ProductImageUploader;

// import ImageListItem from '@mui/material/ImageListItem';
// import AddImageButton from '../features/products/components/AddImageButton';
// import { Box } from '@mui/material';
// import { useFormContext, useWatch } from 'react-hook-form';
// import type { AddProductSchema } from '@millionsclub/shared-libs/client';
// import CloudinaryDeleteButton from './_CloudinaryDeleteButton';

// const ImageFrame = () => {
//   const { control } = useFormContext<AddProductSchema>();

//   const watched = useWatch({ control, name: 'images' }) ?? [];
//   const images: { secure_url: string; public_id: string }[] = watched;

//   const padded = [...images, ...Array(Math.max(0, 4 - images.length)).fill(null)];

//   return (
//     <>

//         {padded.map((item, index) => (
//           <ImageListItem
//             key={item?.public_id || `empty-${index}`}
//             cols={index === 0 ? 3 : 1}
//             rows={index === 0 ? 3 : 1}
//             sx={{
//               position: 'relative',
//               aspectRatio: '1 / 1',
//               overflow: 'hidden',
//               '&:hover .add-image-btn, &:hover .delete-image-btn': { opacity: 1 },
//             }}
//           >
//             <Box
//               component="img"
//               src={item?.secure_url || '/imageplaceholder.png'}
//               alt="image"
//               loading="lazy"
//               sx={{
//                 aspectRatio: '1 / 1',
//                 objectFit: 'contain',
//                 overflow: 'hidden',
//                 width: '100%',
//                 height: '100%',
//                 display: 'block',
//               }}
//             />

//             {!item && <AddImageButton />}
//             {item?.public_id && <CloudinaryDeleteButton public_id={item?.public_id} index={index} />}
//           </ImageListItem>
//         ))}

//     </>
//   );
// };

// export default ImageFrame;
