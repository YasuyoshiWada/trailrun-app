import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type TimeDetailButtonProps = {
  onClick: () => void;
};

const TimeDetailButton: React.FC<TimeDetailButtonProps> = ({onClick}) => (
  <IconButton
  onClick={onClick}
  >
    <MenuIcon/>
  </IconButton>
);

export default TimeDetailButton;
