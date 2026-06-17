import { Alert, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface NetworkErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export default function NetworkErrorBanner({
  message,
  onRetry,
}: NetworkErrorBannerProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Alert
        severity="error"
        role="alert"
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Spróbuj ponownie
          </Button>
        }
      >
        {message}
      </Alert>
    </Box>
  );
}
