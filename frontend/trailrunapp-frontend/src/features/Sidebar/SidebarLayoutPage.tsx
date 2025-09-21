// src/components/Layout.tsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import MobileHeader from "./components/MobileHeader";
import Sidebar from "./components/Sidebar";

type Props = {
  children?: React.ReactNode;
  outerScroll?: boolean;
};

const SidebarLayoutPage: React.FC<Props> = ({ children, outerScroll = false }) => {
  const {isSmallMobile, isMobile} = useResponsive();

  return (
    <>
      {(isSmallMobile || isMobile) && <MobileHeader />}

      <Box
      sx={{
        display:"flex",
        width:'100vw',
        height: '100dvh',//dvh（Device Viewport Height）は、CSSにおいてデバイスのビューポートの高さを取得するための単位です。
        maxWidth:'100vw',
        overflowY:outerScroll ? 'auto' : 'hidden',//外側のスクロールバーを隠す、ページ毎にスクロールが必要ならoverflow: autoで対応する
        overflowX: 'hidden',
      }}
      >
        {!(isSmallMobile || isMobile) && <Sidebar />}

        <Box component="main"
              sx={{
                  p: {xs :1,sm:3},
                  width:'100%',
                  maxWidth:'100vw',
                  boxSizing:'border-box',
                  minHeight: 0,
                  height: '100%',
                  pb: 'env(safe-area-inset-bottom)', //iPhoneのホームバーに被らないようにする
                   ...( !(isSmallMobile || isMobile) && { marginLeft: '20rem' } ), // ← サイドバー分のスペース確保
                  }}>

          {(isSmallMobile || isMobile) && <Toolbar sx={{ flexShrink: 0 }}/>} {/* AppBar の高さ分スペースを確保 */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayoutPage;
