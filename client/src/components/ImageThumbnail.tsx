import { Box } from '@mui/material';
import ProductImageAddButton from '../features/products/admin/components/ProductImageAddButton';
import CloudinaryDeleteButton from '../features/products/admin/components/CloudinaryDeleteButton';

interface Props {
  item: { secure_url?: string; public_id?: string } | null;
  index: number;
  onPreview: (url: string) => void;
}

const ImageThumbnail = ({ item, index, onPreview }: Props) => {
  return (
    <Box
      paddingY={1}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover .add-image-btn, &:hover .delete-image-btn': { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={item?.secure_url || '/imageplaceholder.png'}
        alt="thumbnail"
        loading="lazy"
        onClick={() => item?.secure_url && onPreview(item.secure_url)}
        sx={{
          aspectRatio: '1 / 1',
          objectFit: 'contain',
          borderRadius: 1,
          width: '100%',
          cursor: item?.secure_url ? 'pointer' : 'default',
        }}
      />

      {!item && <ProductImageAddButton />}
      {item?.public_id && <CloudinaryDeleteButton public_id={item.public_id} index={index} resetPreview={onPreview} />}
    </Box>
  );
};

export default ImageThumbnail;
