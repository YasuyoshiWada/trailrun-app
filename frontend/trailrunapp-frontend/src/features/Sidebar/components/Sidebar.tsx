import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography }from '@mui/material';
import { palette } from "../../../styles/palette";
import NavMenuList from "./NavMenuList";

const Sidebar: React.FC = () => {
  return(
    <Box
      component="nav"
      sx={{
        width:'24rem' ,
        height: '100vh',//高さは画面に合わせて縦一杯に広がる設定
        backgroundColor: palette.cyan,
        color: palette.textPrimary,
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.7rem',
          mt: '4rem',
          mb: '1.6rem',
          ml: '1.6rem',
        }}
        >
          みなみえるステータス
        </Typography>
        <Box
        sx={{

        }}
        >
          <NavMenuList />
        </Box>
    </Box>
  );
};
export default Sidebar;
