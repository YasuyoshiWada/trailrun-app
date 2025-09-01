// components/NavMenuList.tsx
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";

type MenuItem = { label: string; path: string };
const menuItems: MenuItem[] = [
  { label: "大会選手一覧", path: "/" },
  { label: "スタート時刻設定", path: "/start-time" },
  { label: "スタート時計", path: "/clock" },
  { label: "記録証の発行", path: "/certificate" },
  { label: "表彰状発行", path: "/award" },
  { label: "受信機能停止抑制", path: "/disable" },
  { label: "チャットページ", path: "/chat"},
];

type Props = { direction?: "row" | "column" };

const NavMenuList: React.FC<Props> = ({ direction = "column" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <List
    sx={{
      ml: '1.6rem',
      display: 'flex',
      flexDirection: direction,
      p:0,
      gap: "0.6rem",
      }}>
      {menuItems.map((item) => {
        if (item.path === "/start-time") {
          // ← ここだけ navigate(state) で開く
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  // 直前のページ情報を state に載せて /start-time へ
                  navigate("/start-time", { state: { background: location } });
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontSize: '1.5rem' }, fontWeight: 'bold', mb: 1 } }}
                />
              </ListItemButton>
            </ListItem>
          );
        }

        // それ以外は通常の Link でOK
        return (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: '1.5rem' }, fontWeight: 'bold', mb: "0.4rem" } }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavMenuList;
