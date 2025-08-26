import { Box } from '@mui/material';
import CloudinaryUploadWidget from '../../../components/uploadWidget';
import { useFormContext } from 'react-hook-form';
import type { AddProductSchema } from '@millionsclub/shared-libs/client';

const AddImageButton = () => {
  const { setValue, getValues, trigger } = useFormContext<AddProductSchema>();

  const handleUpload = (image: { secure_url: string; public_id: string }) => {
    const current = getValues('images') || [];
    const next = [...current, image].slice(0, 4);
    setValue('images', next, { shouldDirty: true, shouldTouch: true });
    trigger('images');
  };

  return (
    <Box
      className="add-image-btn"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        opacity: 0,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <CloudinaryUploadWidget folderName="products" onUploadSuccess={handleUpload} />
    </Box>
  );
};

export default AddImageButton;
