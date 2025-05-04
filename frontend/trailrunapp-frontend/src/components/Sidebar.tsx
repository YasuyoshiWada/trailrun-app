import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography }from '@mui/material';
import { palette } from "../styles/palette";

const Sidebar: React.FC = () => {
  return(
    <Box
      component="nav"
      sx={{
        width: { xs: '100%', sm: '22rem' }, //muiデフォルトのsm(600)以上と未満でサイドバーの幅を分けてる
        height: '100vh',//高さは画面に合わせて縦一杯に広がる設定
        backgroundColor: palette.cyan,
        color: palette.textPrimary,
        position: {xs: 'fixed', sm: 'relative' },
        zIndex: { xs: 1200, sm: 'auto' },
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.8rem',
          mt: 5,
          mb: 2,
          ml: 2,
        }}
        >
          みなみえるステータス
        </Typography>

      <List
        sx={{
          ml: '1.6rem',
        }}
      >
        {['大会選手一覧', 'スタート時刻設定', 'スタート時計', '記録証の発行', '表彰状発行','受信機能停止抑制'].map((text) =>(
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={text}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '1.4rem',
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default Sidebar;
