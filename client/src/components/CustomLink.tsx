import { Link as RouterLink } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import { Link as MuiLink } from "@mui/material";
import type { LinkProps as MuiLinkProps } from "@mui/material";
import { forwardRef } from "react";

type AppLinkProps = Omit<MuiLinkProps, "href"> & RouterLinkProps;

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { to, ...muiProps } = props;
  return (
    <MuiLink
      component={RouterLink}
      to={to}
      ref={ref}
      underline="hover"
      {...muiProps}
    />
  );
});

export default AppLink;
