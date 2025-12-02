import { Navigate, useLocation } from "react-router";
import { Grid, Skeleton } from "@mui/material";
import type { ReactNode } from "react";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";

interface Props {
  children: ReactNode;
}

const RequireAdmin = ({ children }: Props) => {
  const { data: user, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading)
    return (
      <Grid container wrap="nowrap">
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </Grid>
    );

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAdmin;
