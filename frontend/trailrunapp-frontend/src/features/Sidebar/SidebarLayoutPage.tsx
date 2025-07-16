// src/components/Layout.tsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import MobileHeader from "./components/MobileHeader";
import Sidebar from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayoutPage: React.FC<Props> = ({ children }) => {
  const isMobile = useResponsive();

  return (
    <>
      {isMobile && <MobileHeader />}

      <Box
      sx={{
        display:"flex",
        width:'100vw',
        height: '100vh',
        maxWidth:'100vw',
        overflow: 'hidden',//外側のスクロールバーを隠す、ページ毎にスクロールが必要ならoverflow: autoで対応する
      }}
      >
        {!isMobile && <Sidebar />}

        <Box component="main"
              sx={{
                  flexGrow: 1,
                  p: {xs :1,sm:3},
                  width:'100%',
                  maxWidth:'100vw',
                  height: "100vh",
                  boxSizing:'border-box',
                  minHeight: 0,
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
