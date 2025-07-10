// src/components/Layout.tsx
import React from "react";
import { Box, useMediaQuery, Toolbar } from "@mui/material";
import MobileHeader from "./components/MobileHeader";
import Sidebar from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayoutPage: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isMobile && <MobileHeader />}

      <Box display="flex"
      sx={{
        width:'100vw', maxWidth:'100vw'
      }}
      >
        {!isMobile && <Sidebar />}

        <Box component="main"
              sx={{
                  flexGrow: 1,
                  p: {xs :1,sm:3},
                  width:'100%',
                  maxWidth:'100vw',
                  boxSizing:'border-box',
                   ...( !isMobile && { marginLeft: '24rem' } ), // ← サイドバー分のスペース確保
                  }}>

          {isMobile && <Toolbar />} {/* AppBar の高さ分スペースを確保 */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayoutPage;
