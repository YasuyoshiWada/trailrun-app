import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";
import useResponsive from "../../hooks/useResponsive";

type DQButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DQButton: React.FC<DQButtonProps> = ({ value, onClick }) => {
  const {isSmallMobile, isMobile} = useResponsive();
  return (
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor: value? palette.coralRed : palette.gray,
      color: palette.textPrimary,
      opacity: value ? 1 : 0.5,
      borderRadius: "1.2rem",
      fontWeight: "bold",
      minWidth: "4rem",
      minHeight: "4rem",
      transition: "opacity 0.2s",
      boxShadow: "none",
    }}
>
    {(isSmallMobile || isMobile) ? "DQ" : value ? "DQ" : ""}
</Button>
)
  };

export default DQButton;
