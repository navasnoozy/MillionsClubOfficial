// components/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error.status} {error.statusText}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {error.data}
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Go Home
        </Button>
      </Box>
    );
  }

  if (error instanceof Error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
        {import.meta.env.DEV && (
          <>
            <Typography variant="subtitle2">Stack trace:</Typography>
            <pre style={{ overflow: 'auto', background: '#f5f5f5', padding: '1rem' }}>
              {error.stack}
            </pre>
          </>
        )}
        <Button component={Link} to="/" variant="contained">
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" color="error">
        Unknown Error
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
}