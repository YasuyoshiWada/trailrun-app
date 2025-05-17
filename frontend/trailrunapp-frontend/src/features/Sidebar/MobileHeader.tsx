import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Collapse,
    Box,
    useMediaQuery,
  } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import NavMenuList from "./NavMenuList";
import { palette } from "../../styles/palette";


const MobileHeader: React.FC = () => {
  const [ open, setOpen ] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!isMobile) return null;

  return (
  <>
    <AppBar
      sx={{
        backgroundColor: palette.cyan,
      }}
      >
      <Toolbar
      sx={{
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
      }}
      >
      <Typography
      sx={{
        color:palette.textPrimary,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        flexGrow: 1,
      }}
      >
        みなみえるステータス
      </Typography>
        <IconButton edge="start" onClick={() =>setOpen(!open)}
        sx={{
          color:palette.textPrimary
        }}
        >
          <ListIcon
          sx={{
            fontSize: 40
          }}
          />
        </IconButton>
      </Toolbar>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            backgroundColor: palette.cyan,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <NavMenuList />
        </Box>
      </Collapse>
    </AppBar>
  </>

  )
}
export default MobileHeader;
