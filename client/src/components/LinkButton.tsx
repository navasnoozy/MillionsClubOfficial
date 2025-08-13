import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { LinkProps as RouterLinkProps } from "react-router";
import { forwardRef } from "react";

type LinkButtonProps = ButtonProps & Pick<RouterLinkProps, "to">;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ to, children, ...props }, ref) => {
    return (
      <Button
        component={RouterLink}
        to={to}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
