import { useState } from 'react';
import {
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import BugReportIcon from '@mui/icons-material/BugReport';
import { motion } from 'framer-motion';
import { useTodos } from '../../hooks/useTodos';
import {
  isSimulateErrorEnabled,
  setSimulateError,
} from '../../mocks/data';
import { tapScale } from '../../animations/variants';

export default function SettingsView() {
  const { clearAllTodos, todos, status } = useTodos();
  const [simulateError, setSimulateErrorState] = useState(
    isSimulateErrorEnabled(),
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSimulateToggle = (checked: boolean) => {
    setSimulateErrorState(checked);
    setSimulateError(checked);
  };

  const handleClear = async () => {
    setConfirmOpen(false);
    await clearAllTodos();
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 3, md: 4 }, maxWidth: 600, mx: 'auto', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Ustawienia
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Konfiguracja aplikacji demonstracyjnej.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={simulateError}
              onChange={(e) => handleSimulateToggle(e.target.checked)}
              slotProps={{ input: { 'aria-label': 'Symuluj błąd sieci API' } }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BugReportIcon fontSize="small" aria-hidden="true" />
              Symuluj błąd sieci API
            </Box>
          }
        />
        <Typography variant="caption" color="text.secondary">
          Włącz, aby zademonstrować obsługę błędów sieciowych w UI.
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2">
          Liczba zadań w bazie: <strong>{todos.length}</strong>
        </Typography>

        <motion.div whileTap={tapScale}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => setConfirmOpen(true)}
            disabled={todos.length === 0 || status === 'loading'}
          >
            Wyczyść wszystkie zadania
          </Button>
        </motion.div>
      </Box>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="clear-dialog-title"
      >
        <DialogTitle id="clear-dialog-title" component="p" sx={{ fontWeight: 600, fontSize: '1.25rem', m: 0 }}>
          Wyczyścić wszystkie zadania?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ta operacja jest nieodwracalna. Wszystkie {todos.length} zadań zostanie
            trwale usuniętych.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Anuluj</Button>
          <Button onClick={handleClear} color="error" variant="contained" autoFocus>
            Wyczyść
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
