import { Snackbar, Alert } from '@mui/material';

interface StatusSnackbarProps {
  successMessage: string | null;
  onClose: () => void;
}

export default function StatusSnackbar({
  successMessage,
  onClose,
}: StatusSnackbarProps) {
  return (
    <Snackbar
      open={!!successMessage}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
        role="status"
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
}
