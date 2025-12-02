// src/components/InfoAlerts.tsx
import { Alert, Stack } from '@mui/material';

export default function InfoAlerts({ messages }: { messages: string[] }) {
  return (
    <Stack sx={{ justifySelf: 'center', pt: 2 }} spacing={1}>
      {messages.map((msg) => (
        <Alert sx={{ p: 0, m: 0 }} severity="info">
          {msg}
        </Alert>
      ))}
    </Stack>
  );
}



