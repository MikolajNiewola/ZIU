import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/" },
  { label: "Zadania", icon: TaskIcon, path: "/todos" },
  { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle, drawerWidth }: SidebarProps) {
  const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TodoApp
        </Typography>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.path}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.dark" }}>
          U
        </Avatar>
        <Typography variant="body2">Użytkownik</Typography>
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Lepsza wydajność na mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "white",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
