import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import NavMenuList from "./NavMenuList";
import { palette } from "../../../styles/palette";
import { BackToDashboardButton } from "../../../components/button/BackToDashboardButton";
import { useLocation } from "react-router-dom";


const MobileHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  // 現在のパスを取得
  const location = useLocation();

  // Dashboardのパス
  const isDashboardPage = location.pathname === "/";

  if (!isMobile) return null;

  return (
    <>
      <AppBar sx={{ backgroundColor: palette.cyan }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
        {/* ←ここ！Dashboardの場合は表示しない */}
          {!isDashboardPage && <BackToDashboardButton />}
          <Typography
            sx={{
              color: palette.textPrimary,
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            みなみえるステータス
          </Typography>
          <IconButton
            edge="end"
            onClick={() => setOpen(!open)}
            sx={{ color: palette.textPrimary }}
          >
            {open ? (
              <CloseIcon sx={{ fontSize: 40 }} />
            ) : (
              <ListIcon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* メニューオーバーレイ */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "34vh",
            backgroundColor: palette.cyan,
            zIndex: 1200,
            color: palette.textPrimary,

          }}
        >
          {/* 閉じるボタン（右上固定） */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <IconButton onClick={() => setOpen(false)} sx={{ color: palette.textPrimary }}>
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>

          {/* メニューリスト（AppBarの下から表示） */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <NavMenuList direction="column" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MobileHeader;
