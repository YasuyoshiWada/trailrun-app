import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";
import useResponsive from "../../hooks/useResponsive";

type DNSButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DNSButton: React.FC<DNSButtonProps> = ({ value, onClick }) => {
  const {isSmallMobile, isMobile} = useResponsive();
  return (
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor: value ? palette.orange : palette.gray,
      color: palette.textPrimary,
      opacity: value ? 1 : 0.5,
      borderRadius: "1.2rem",
      fontSize: (isSmallMobile || isMobile) ? "1.6rem" : "1rem",
      fontWeight: "bold",
      minWidth: (isSmallMobile || isMobile) ? "5.5rem" : "4rem",
      minHeight: (isSmallMobile || isMobile) ? "5.5rem" : "4rem",
      transition: "opacity 0.2s",
      boxShadow: "none",
    }}
>
  {/* ここは値がtrueならばDNSと表示させる */}
    {(isSmallMobile || isMobile) ? "DNS" : value ? "DNS" : ""}
</Button>
)
  };

export default DNSButton;
