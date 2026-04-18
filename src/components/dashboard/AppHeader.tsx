import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";

const DRAWER_WIDTH = 240;

export default function AppHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar>
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
