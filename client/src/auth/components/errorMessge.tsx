import { Alert, Stack } from "@mui/material";

interface Props {
  errors: { message: string; field: string }[];
}

const ErrorMessages = ({ errors }: Props) => {
  return (
    <Stack
      alignItems={"center"}
      sx={{ width: "100%", fontSize: "120px" }}
      spacing={2}
    >
      {errors.map((error) => (
        <Alert key={error.message} sx={{ fontSize: "15px" }} severity="error">
          {error.message}
        </Alert>
      ))}
    </Stack>
  );
};

export default ErrorMessages;
