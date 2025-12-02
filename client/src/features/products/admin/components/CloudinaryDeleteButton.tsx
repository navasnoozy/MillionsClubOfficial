import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { AddProductSchema } from '@millionsclub/shared-libs/client';
import useDeleteImage from '../../../../hooks/useDeleteImage';
import DeleteButton from '../../../../components/DeleteButton';

interface Props {
  public_id: string;
  index: number;
  resetPreview: (value: string) => void;
}

const CloudinaryDeleteButton = ({ public_id, index, resetPreview }: Props) => {
  const { setValue, watch } = useFormContext<AddProductSchema>();
  const { mutate: deleteImage, isPending } = useDeleteImage();

  const handleClick = () => {
    deleteImage(public_id, {
      onSuccess: () => {

        const current = watch('images') ?? [];
        const updatedImages = [...current];
        updatedImages.splice(index, 1);
        setValue('images', updatedImages);
        resetPreview('');
      },
      onError: () => {
        console.log('image couldnot delete');
      },
    });
  };

  return (
    <Box
      className="delete-image-btn"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 12,
        opacity: 0,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <DeleteButton handleOnClick={handleClick} isPending={isPending} />
    </Box>
  );
};

export default CloudinaryDeleteButton;
