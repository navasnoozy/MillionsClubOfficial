import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  heading: string;
  caption: string;
  children: ReactNode;
}

const Container = ({ heading, caption, children }: Props) => {
  return (
    <Stack>
      <Typography sx={{ fontSize: 30 }} fontWeight="bold" align="left">
        {heading}
      </Typography>
      <Typography sx={{ fontSize: 20 }} mb={3} align="left">
        {caption}
      </Typography>
      {children}
    </Stack>
  );
};

export default Container;
