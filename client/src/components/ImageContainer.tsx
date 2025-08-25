import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import AddImageButton from '../features/products/components/AddImageButton';
import CloudinaryDeleteButton from '../features/products/components/CloudinaryDeleteButton';

interface Props {
  images: { secure_url: string; public_id: string }[];
}

const ImageContainer = ({ images }: Props) => {
  const [previewImgUrl, setPreviewImg] = useState(images[0]?.secure_url || '');

  const handlePreviewImage = (secure_url: string) => {
    setPreviewImg(secure_url);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        '&:hover .add-image-btn, &:hover .delete-image-btn': { opacity: 1 },
      }}
    >
      <Grid size={2} alignSelf={'center'}>
        {images.map((item, index) => (
          <Box
            paddingY={1}
            sx={{
              position: 'relative',
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              key={index}
              onClick={() => item?.secure_url && handlePreviewImage(item.secure_url)}
              component="img"
              src={item?.secure_url || '/imageplaceholder.png'}
              alt="image"
              loading="lazy"
              sx={{
                aspectRatio: '1 / 1',
                objectFit: 'contain',
                borderRadius: 1,
                overflow: 'hidden',
                width: '100%',
                display: 'block',
                cursor: item?.secure_url ? 'pointer' : 'default',
              }}
            />
            {!item && <AddImageButton />}
            {item?.public_id && (
              <CloudinaryDeleteButton public_id={item?.public_id} index={index} resetPreview={setPreviewImg} />
            )}
          </Box>
        ))}
      </Grid>
      <Grid size={10} alignSelf={'center'}>
        <Box
          component="img"
          src={previewImgUrl || '/previewimage.png'}
          alt="image"
          loading="lazy"
          sx={{
            aspectRatio: '1 / 1',
            objectFit: 'contain',
            borderRadius: 3,
            overflow: 'hidden',
            width: '100%',
            display: 'block',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ImageContainer;
