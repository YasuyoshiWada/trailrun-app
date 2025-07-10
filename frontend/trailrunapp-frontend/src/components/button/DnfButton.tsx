import React from "react";
import { Button } from "@mui/material";
import { palette } from "../../styles/palette";

type DNFButtonProps = {
  value: boolean | null;
  onClick: () => void;
};

const DNFButton: React.FC<DNFButtonProps> = ({ value, onClick }) => (
  <Button
    variant="contained"
    size="small"
    onClick={onClick}
    sx={{
      backgroundColor:palette.mustardYellow,
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
    {value ? "DNF" : ""}
</Button>
);

export default DNFButton;
