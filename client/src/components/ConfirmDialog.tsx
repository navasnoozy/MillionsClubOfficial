import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  confirmText?: string;
  loading?: boolean
}

const ConfirmDialog = ({
  title,
  content,
  open,
  handleClose,
  handleConfirm,
  confirmText = "Agree",
  loading
}: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button loading={loading} onClick={handleConfirm} color={'error'} variant="contained" size="small">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;