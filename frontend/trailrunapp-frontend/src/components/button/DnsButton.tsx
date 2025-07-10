import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";

type DNSButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DNSButton: React.FC<DNSButtonProps> = ({ value, onClick }) => (
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor:palette.orange,
      color: palette.textPrimary,
      opacity: value ? 1 : 0.5,
      borderRadius: "1.2rem",
      fontSize: "1rem",
      fontWeight: "bold",
      minWidth: "4rem",
      minHeight: "4rem",
      transition: "opacity 0.2s",
      boxShadow: "none",
    }}
>
    {value ? "DNS" : ""}
</Button>
);

export default DNSButton;
