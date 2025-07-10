import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";

type DQButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DQButton: React.FC<DQButtonProps> = ({ value, onClick }) => (
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor:palette.coralRed,
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
    {value ? "DQ" : ""}
</Button>
);

export default DQButton;
