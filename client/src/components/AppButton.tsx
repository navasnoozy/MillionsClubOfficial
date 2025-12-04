import { Button, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { LinkProps as RouterLinkProps } from "react-router";
import { forwardRef } from "react";

type AppButtonProps = ButtonProps &
  Partial<Pick<RouterLinkProps, "to">> & {
    isLoading?: boolean;
  };

const AppButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AppButtonProps>(({ to, children, isLoading, disabled, startIcon, endIcon, sx, ...props }, ref) => {
  const isLoadingState = isLoading || false;

  const component = to ? RouterLink : "button";

  return (
    <Button
      component={component}
      to={to}
      ref={ref as any}
      disabled={disabled || isLoadingState}
      sx={{
        boxShadow: "0 2px 4px rgba(76, 224, 224, 0.78)",
        ...sx,
      }}
      startIcon={isLoadingState ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;
