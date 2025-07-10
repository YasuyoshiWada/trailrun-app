import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { palette } from "../styles/palette";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar:React.FC<Props> = ({value, onChange }) => {
  return(
    <Box
    sx={{
      display:"flex",
      alignItems:"center",
      width:"100%",
      maxWidth:"68rem",
      border:`0.2rem solid ${palette.cyan}`,
      borderRadius:"2rem",
      background:`${palette.lightGray}`,
      mb:"1rem"
    }}>
      <TextField
      value={value}
      onChange={onChange}
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
