import { Alert, Stack } from "@mui/material";

interface Props {
  error: string;
}

const ErrorMessages = ({ error }: Props) => {
  return (
    <Stack alignItems={"center"} sx={{ width: "100%", fontSize: "120px" }} spacing={2}>
      <Alert  sx={{ fontSize: "15px" }} severity="error">
        {error}
      </Alert>
    </Stack>
  );
};

export default ErrorMessages;
