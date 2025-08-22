import { IconButton, CircularProgress, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteButtonProps = {
  isPending: boolean;
  handleOnClick: () => void;
};

const DeleteButton = ({ isPending, handleOnClick }: DeleteButtonProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <IconButton
        onClick={handleOnClick}
        disabled={isPending}
         sx={{ width: 40, height: 40 }}
      >
        <DeleteIcon color="error"  />
      </IconButton>

      {isPending && (
        <CircularProgress
          size={48}
          sx={{
            color: "error.main",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-24px", // half of size
            marginLeft: "-24px",
          }}
        />
      )}
    </Box>
  );
};

export default DeleteButton;
