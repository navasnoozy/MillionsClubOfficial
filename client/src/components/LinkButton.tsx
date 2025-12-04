import { Button, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { LinkProps as RouterLinkProps } from "react-router";
import { forwardRef } from "react";

// Combine the types
type AppButtonProps = ButtonProps & Partial<Pick<RouterLinkProps, "to">> & {
  isLoading?: boolean;
};

const AppButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AppButtonProps>(
  ({ to, children, isLoading, disabled, startIcon, endIcon, sx, ...props }, ref) => {
    
    // Logic: If it is loading, disable it and hide the icons to prevent layout shift
    const isLoadingState = isLoading || false;
    
    // Logic: Define the component to render
    const component = to ? RouterLink : "button";

    return (
      <Button
        // Polymorphic props
        component={component}
        to={to}
        ref={ref as any} // Type casting ref for polymorphic components is often necessary in MUI wrappers
        
        // State props
        disabled={disabled || isLoadingState}
        
        // Styles (Merge your custom shadow here)
        sx={{ 
          boxShadow: "0 2px 4px rgba(76, 224, 224, 0.78)",
          ...sx 
        }}
        
        // Icon logic: If loading, replace startIcon with Spinner, or just append spinner
        startIcon={isLoadingState ? <CircularProgress size={20} color="inherit" /> : startIcon}
        endIcon={endIcon}
        
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;