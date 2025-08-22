import { Box } from '@mui/material';
import useDeleteImage from '../hooks/useDeleteImage';
import DeleteButton from './DeleteButton';

const CloudinaryDeleteButton = ({ public_id }: { public_id: string }) => {
  console.log('fronend public id', public_id);

  const { mutate: deleteImage, isPending } = useDeleteImage();
  const handleClick = () => {
    deleteImage(public_id, {
      onSuccess: () => {
        console.log('image deleted');
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
        right: '50%',
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
