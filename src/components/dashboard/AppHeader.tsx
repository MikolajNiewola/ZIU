import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";

interface AppHeaderProps {
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

export default function AppHeader({ handleDrawerToggle, drawerWidth }: AppHeaderProps) {
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
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton aria-label="Zmień motyw" color="inherit">
            <LightModeIcon />
          </IconButton>
          
          <IconButton aria-label="Powiadomienia" color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
