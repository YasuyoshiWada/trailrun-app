// src/components/Layout.tsx
import React from "react";
import { Box, useMediaQuery, Toolbar } from "@mui/material";
import MobileHeader from "../features/Sidebar/MobileHeader";
import Sidebar from "../features/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isMobile && <MobileHeader />}

      <Box display="flex">
        {!isMobile && <Sidebar />}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {isMobile && <Toolbar />} {/* AppBar の高さ分スペースを確保 */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
