import React, { useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { palette } from "../styles/palette";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar:React.FC<Props> = ({value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [ hovered, setHovered ] = useState(false);

  return(
    <Box
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    sx={{
      display:"flex",
      alignItems:"center",
      width:"100%",
      maxWidth:"68rem",
      border:`0.3rem solid ${focused ? palette.cyan : palette.gray}`,
      borderRadius:"2rem",
      background:palette.lightGray,
      transition: "border-color 0.2s",
      opacity: hovered ? 0.5 : 1,
    }}>
      <TextField
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      fullWidth
      id="search-bar"
      placeholder="名前を検索"
      variant="standard"
      type="search"//×ボタンを出す。
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
              <SearchIcon sx={{ color: palette.darkGray, fontSize: "2rem"}} />
          </InputAdornment>
        ),
        sx: { fontSize: "1.6rem"}
      }}
      sx={{
        mx:"1rem",
        background: "transparent",
        fontSize: "1.6rem"
      }}
      />
    </Box>
  )
}
export default SearchBar;
