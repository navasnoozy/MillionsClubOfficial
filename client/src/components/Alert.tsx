import { Alert as MuiAlert, Stack } from "@mui/material";

interface Props {
  success: boolean;
  message?: string | null;
  messages?: { message: string; field?: string }[] | null;
}

const AlertNotify = ({ success, message, messages }: Props) => {
  if (messages)
    return (
      <MuiAlert sx={{ mt: 2 }} severity={success ? "success" : "error"}>
        {messages.map((msg) => (
          <Stack>{msg.message}</Stack>
        ))}
      </MuiAlert>
    );

  if (message)
    return (
      <MuiAlert sx={{ mt: 2 }} severity={success ? "success" : "error"}>
        {message}
      </MuiAlert>
    );
};

export default AlertNotify;
