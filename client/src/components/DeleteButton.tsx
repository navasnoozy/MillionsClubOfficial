import { IconButton, CircularProgress, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteButtonProps = {
  isPending: boolean;
  handleOnClick: () => void;
};

const DeleteButton = ({ isPending, handleOnClick }: DeleteButtonProps) => {
  return (
    <Box sx={{ display: 'inline-flex' }}>
      <IconButton
        onClick={handleOnClick}
        disabled={isPending}
        sx={{
          width: 40,
          height: 40,
          padding: '4px',
        }}
      >
        {!isPending && <DeleteIcon color="error" sx={{ fontSize: '20px' }} />}
      </IconButton>

      {isPending && (
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: 'error.main',
          }}
        />
      )}
    </Box>
  );
};

export default DeleteButton;
