import { Box, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTodos } from '../../hooks/useTodos';

const tapButtonSx = {
  '&:active': { transform: 'scale(0.97)' },
  transition: 'transform 0.15s ease',
};

interface DashboardViewProps {
  onNavigate: (page: string) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const { todos } = useTodos();
  const recentTodos = todos.slice(0, 5);

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Witaj w TodoApp
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Zarządzaj zadaniami, filtruj listę i rejestruj konto w aplikacji.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<TaskAltIcon />}
          onClick={() => onNavigate('/todos')}
          sx={tapButtonSx}
        >
          Przejdź do zadań
        </Button>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={() => onNavigate('/register')}
          sx={tapButtonSx}
        >
          Rejestracja
        </Button>
      </Box>

      {recentTodos.length > 0 && (
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            Ostatnie zadania
          </Typography>
          <List dense component="ul" aria-label="Ostatnie zadania">
            {recentTodos.map((todo) => (
              <ListItem key={todo.id} component="li" divider>
                <ListItemText
                  primary={todo.title}
                  secondary={todo.completed ? 'Ukończone' : 'Aktywne'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
}
