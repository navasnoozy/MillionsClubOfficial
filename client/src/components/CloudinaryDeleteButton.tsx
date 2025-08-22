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

  return (  <DeleteButton handleOnClick={handleClick} isPending={isPending} />)

};

export default CloudinaryDeleteButton;
