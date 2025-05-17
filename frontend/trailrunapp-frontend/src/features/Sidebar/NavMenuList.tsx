// components/NavMenuList.tsx
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type MenuItem = {
  label: string;
  path: string;
};

const menuItems = [
  { label: "大会選手一覧", path: "/" },
  { label: "スタート時刻設定", path: "/" },
  { label: "スタート時計", path: "/" },
  { label: "記録証の発行", path: "/" },
  { label: "表彰状発行", path: "/" },
  { label: "受信機能停止抑制", path: "/" },
];

type Props = {
  direction?: "row" | "column";
}

const NavMenuList: React.FC<Props> = ({ direction = "column"}) => (
  <List sx={{ ml: '1.6rem', display: 'flex', flexDirection: direction, p:0 }}>
    {menuItems.map((item) => (
      <ListItem key={item.path} disablePadding>
        <ListItemButton href={item.path}>
          <ListItemText
            primary={item.label}
            slotProps={{
              primary: {
                sx: { fontSize: '1.4rem' },
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default NavMenuList;
