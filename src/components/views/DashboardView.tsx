import { Box, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { motion } from 'framer-motion';
import { useTodos } from '../../hooks/useTodos';
import { tapScale } from '../../animations/variants';

interface DashboardViewProps {
  onNavigate: (page: string) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const { todos } = useTodos();
  const recentTodos = todos.slice(0, 5);
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Witaj w TodoApp
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Masz {todos.length} zadań, z czego {completedCount} ukończonych.
        Zarządzaj zadaniami, filtruj listę i rejestruj konto w aplikacji.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <motion.div whileTap={tapScale}>
          <Button
            variant="contained"
            startIcon={<TaskAltIcon />}
            onClick={() => onNavigate('/todos')}
          >
            Przejdź do zadań
          </Button>
        </motion.div>
        <motion.div whileTap={tapScale}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            onClick={() => onNavigate('/register')}
          >
            Rejestracja
          </Button>
        </motion.div>
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
