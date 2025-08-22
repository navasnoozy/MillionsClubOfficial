import ImageListItem from '@mui/material/ImageListItem';
import AddImageButton from '../features/products/components/AddImageButton';
import { Box } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import type { AddProductSchema } from '@millionsclub/shared-libs/client';

const ImageFrame = () => {
  const { control } = useFormContext<AddProductSchema>();

  const watched = useWatch({ control, name: 'images' }) ?? [];
  const images: { secure_url: string; public_id: string }[] = watched;

  const padded = [...images, ...Array(Math.max(0, 4 - images.length)).fill(null)];

  console.log('checking padded', padded);

  return (
    <>
      {padded.map((item, index) => (
        <ImageListItem
          key={item?.public_id || `empty-${index}`}
          cols={index === 0 ? 3 : 1}
          rows={index === 0 ? 2 : 1}
          sx={{
            position: 'relative',
            '&:hover .add-image-btn': { opacity: 1 },
          }}
        >
          <Box
            component="img"
            src={item?.secure_url || '/imageplaceholder.png'}
            alt="image"
            loading="lazy"
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />

          <AddImageButton />
        </ImageListItem>
      ))}
    </>
  );
};

export default ImageFrame;
