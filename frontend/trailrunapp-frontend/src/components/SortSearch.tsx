import React, {useState} from "react";
import { IconButton,Menu, MenuItem } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

type SortType = "rankAsc" | "rankDesc" | "numAsc" | "numDesc";

type Props = {
  sortType: SortType;
  onChange: (type:SortType) => void;
};
const MenuItemSx = {
  fontSize:"1.6rem"
}

const SortSearch: React.FC<Props> = ({ sortType, onChange }) => {
  const[anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => setAnchorEl(null);

const handleSelect = (type: SortType) => {
  onChange(type);  //親に選択を伝える。
  handleClose();   //Menuを閉じる。
};

  return (
    <>
      <IconButton onClick={handleOpen}>
        <UnfoldMoreIcon
        sx={{
          fontSize:"4rem"
        }} />
      </IconButton>
      <Menu
      anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect("rankAsc")} sx={{...MenuItemSx}}>順位を昇順に並べ変える</MenuItem>
        <MenuItem onClick={() => handleSelect("rankDesc")} sx={{...MenuItemSx}}>順位を降順に並べ変える</MenuItem>
        <MenuItem onClick={() => handleSelect("numAsc")} sx={{...MenuItemSx}}>ゼッケンを昇順に並べ変える</MenuItem>
        <MenuItem onClick={() => handleSelect("numDesc")} sx={{...MenuItemSx}}>ゼッケンを降順に並べ変える</MenuItem>
      </Menu>

    </>
  )
}
export default SortSearch;
