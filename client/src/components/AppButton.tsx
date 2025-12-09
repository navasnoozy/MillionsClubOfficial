import type { ButtonProps } from "@mui/material";
import { Button } from "@mui/material";
import { forwardRef } from "react";
import type { LinkProps as RouterLinkProps } from "react-router";
import { Link as RouterLink } from "react-router";

type AppButtonProps = ButtonProps &
  Partial<Pick<RouterLinkProps, "to">> & {
    isLoading?: boolean;
    onClick?: () => void;
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
        ...sx,
        borderRadius: 50
      }}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;
