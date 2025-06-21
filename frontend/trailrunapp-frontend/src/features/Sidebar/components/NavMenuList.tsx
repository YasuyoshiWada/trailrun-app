// components/NavMenuList.tsx
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type MenuItem = {
  label: string;
  path: string;
};
//pathの先のページが出来ていないがエラー回避の為に（一意のpath出ないとエラーになる)一時的にpathを仮に付ける
const menuItems = [
  { label: "大会選手一覧", path: "/athletes" },
  { label: "スタート時刻設定", path: "/start-time" },
  { label: "スタート時計", path: "/clock" },
  { label: "記録証の発行", path: "/certificate" },
  { label: "表彰状発行", path: "/award" },
  { label: "受信機能停止抑制", path: "/disable" },
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
                sx: { fontSize: '1.5rem' },
                fontWeight: 'bold',
                mb: 1
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default NavMenuList;
