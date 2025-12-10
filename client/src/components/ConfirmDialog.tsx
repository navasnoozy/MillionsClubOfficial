import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: "danger" | "info" | "warning"; // To style the confirm button
}

const ConfirmDialog = ({ open, onClose, onConfirm, title, content, confirmText = "Confirm", cancelText = "Cancel", isLoading = false, type = "primary" as any }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={type === "danger" ? "error" : "primary"} disabled={isLoading} autoFocus>
          {isLoading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
