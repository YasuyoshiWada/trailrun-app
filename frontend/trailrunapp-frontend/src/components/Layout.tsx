// src/components/Layout.tsx
//ページのレスポンシブを決定しているコンポーネント
import React from "react";
import { Box,  Toolbar } from "@mui/material";
import MobileHeader from "../features/Sidebar/components/MobileHeader";
import Sidebar from "../features/Sidebar/components/Sidebar";
import useResponsive from "../hooks/useResponsive";

type Props = {
  children: React.ReactNode;
};

const SidebarLayoutPage: React.FC<Props> = ({ children }) => {
  const isMobile = useResponsive();

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
                  boxSizing:'border-box'
                  }}>

          {isMobile && <Toolbar />} {/* AppBar の高さ分スペースを確保 */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayoutPage;
