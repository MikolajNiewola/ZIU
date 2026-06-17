import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";

interface AppHeaderProps {
  handleDrawerToggle: () => void;
  drawerWidth: number;
  pageTitle?: string;
}

export default function AppHeader({ handleDrawerToggle, drawerWidth, pageTitle = 'Dashboard' }: AppHeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Otwórz menu nawigacji"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
