import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { LinkProps as RouterLinkProps } from "react-router";
import { forwardRef } from "react";

type LinkButtonProps = ButtonProps & Partial<Pick<RouterLinkProps, "to">>;

const LinkButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkButtonProps>(
  ({ to, children, ...props }, ref) => {
    if (to) {
      return (
        <Button
          component={RouterLink}
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button ref={ref as React.Ref<HTMLButtonElement>} {...props}>
        {children}
      </Button>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;