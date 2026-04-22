import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";

const DRAWER_WIDTH = 240;

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          bgcolor: "background.default",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        <AppHeader handleDrawerToggle={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
        <Toolbar />
        <StatsGrid />
        <Box sx={{ mt: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
