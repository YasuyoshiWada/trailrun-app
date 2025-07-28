import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";
import useResponsive from "../../hooks/useResponsive";

type DNFButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DNFButton: React.FC<DNFButtonProps> = ({ value, onClick }) => {
  const {isSmallMobile, isMobile} = useResponsive();
  return(
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor: value ? palette.mustardYellow: palette.gray,
      color: palette.textPrimary,
      opacity: value ? 1 : 0.5,
      borderRadius: "1.2rem",
      fontWeight: "bold",
      minWidth:(isSmallMobile || isMobile) ? "5rem" : "4rem",
      minHeight:(isSmallMobile || isMobile) ? "5rem" : "4rem",
      transition: "opacity 0.2s",
      boxShadow: "none",
    }}
>
    {(isSmallMobile || isMobile) ? "DNF" : value ? "DNF" : ""}
</Button>
)
  };

export default DNFButton;
