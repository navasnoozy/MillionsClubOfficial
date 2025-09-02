import { Grid } from '@mui/material';
import { useState } from 'react';
import ImagePreview from './ImagePreview';
import ImageThumbnail from './ImageThumbnail';

interface ImageItem {
  secure_url?: string;
  public_id?: string;
}
interface Props {
  images: (ImageItem | null)[];
}

const ImageFrame = ({ images }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(images[0]?.secure_url || '');

  return (
    <Grid container spacing={2} sx={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
      <Grid size={2} alignSelf="center">
        {images.map((item, index) => (
          <ImageThumbnail key={index} item={item} index={index} onPreview={setPreviewUrl} />
        ))}
      </Grid>

      <Grid size={10} alignSelf="center">
        <ImagePreview src={previewUrl} />
      </Grid>
    </Grid>
  );
};

export default ImageFrame;
