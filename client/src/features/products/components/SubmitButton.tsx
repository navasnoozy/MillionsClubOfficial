import { Button, CircularProgress } from "@mui/material";

type SubmitButtonProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
};

const SubmitButton = ({
  label,
  isLoading = false,
  disabled = false,
  size = "large",
  variant = "contained",
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size={size}
      variant={variant}
      disabled={disabled || isLoading}
    >
      {label}
      {isLoading && <CircularProgress sx={{ ml: 1 }} size="1.5rem" />}
    </Button>
  );
};

export default SubmitButton;
