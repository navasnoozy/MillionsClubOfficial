import { Box } from '@mui/material';

const ImagePreview = ({ src }: { src?: string }) => {
  return (
    <Box
      component="img"
      src={src || '/previewimage.png'}
      alt="preview"
      loading="lazy"
      sx={{
        aspectRatio: '1 / 1',
        objectFit: 'contain',
        borderRadius: 3,
        width: '100%',
        display: 'block',
      }}
    />
  );
};

export default ImagePreview;
