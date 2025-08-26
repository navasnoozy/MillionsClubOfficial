// src/components/InfoAlerts.tsx
import { Alert, Stack } from '@mui/material';

export default function InfoAlerts() {
  return (
    <Stack sx={{ justifySelf: 'center', pt: 2 }} spacing={1}>
      <Alert sx={{ p: 0, m: 0 }} severity="info">
        If you add images for variants, upload here is optional.
      </Alert>
      <Alert sx={{ p: 0, m: 0 }} severity="info">
        Each product must have at least 4 photos.
      </Alert>
      <Alert sx={{ p: 0, m: 0 }} severity="info">
        All photos must be in a 1:1 aspect ratio (square).
      </Alert>
    </Stack>
  );
}
