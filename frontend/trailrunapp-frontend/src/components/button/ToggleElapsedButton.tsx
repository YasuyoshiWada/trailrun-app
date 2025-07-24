import React from "react"
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import IconButton from "@mui/material/IconButton";
import { palette }  from "../../styles/palette";

type ToggleElapsedButtonProps = {
    showElapsed: boolean;  //状態
    onToggle: () => void;  //クリック時のハンドラ
    sx?: object;  //カスタムスタイルも任意で
}

const ToggleElapsedButton :React.FC<ToggleElapsedButtonProps> = ({showElapsed, onToggle, sx}) => (

    <IconButton
      disableRipple
      aria-label="toggle"
      onClick={onToggle}
      sx={{ p: 0,
        position: "relative",
        width: 48,
        height: 48,
        backgroundColor: "transparent",
        "&:hover": {
        backgroundColor: "transparent", //背景色は変えない
        "& .MuiSvgIcon-root": {
          opacity: 0.5, //アイコンのみ薄く
          transition: "opacity 0.2s",
          }
        },
        ...sx,//外からスタイル追加可
        }}
    >
          <ToggleOnOutlinedIcon
          sx={{
            position: "absolute",
            fontSize:"4rem",
            color:  palette.orange,
            display: showElapsed ? "block" : "none",
            transition: "opacity 0.2s",
            PointerEvent: "none", //これによりhoverがiconButtonに伝わる
          }}
          />
          <ToggleOffOutlinedIcon
          sx={{
            position: "absolute",
            fontSize:"4rem",
            color: palette.darkGray,
            display: showElapsed ? "none" : "block",
            transition: "opacity 0.2s",
            PointerEvent: "none",
          }}
          />
    </IconButton>
    );

    export default ToggleElapsedButton;
