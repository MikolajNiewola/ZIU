import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";

const DRAWER_WIDTH = 240;

interface DashboardLayoutProps {
  children?: React.ReactNode;
  onNavigate?: (page: string) => void;
  activePage?: string;
}

export default function DashboardLayout({ children, onNavigate, activePage }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
        onNavigate={onNavigate}
        activePage={activePage}
      />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          outline: "none",
        }}
      >
        <AppHeader handleDrawerToggle={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
        <Toolbar />
        <section aria-label="Statystyki zadań">
          <StatsGrid />
        </section>
        <Box sx={{ mt: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
