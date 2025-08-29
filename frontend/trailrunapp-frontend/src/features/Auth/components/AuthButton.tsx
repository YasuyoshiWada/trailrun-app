import React from "react";
import { Button, ButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { palette } from "../../../styles/palette";

//ベースの見た目(上書き可能)
const baseSx = {
  borderRadius: "1.5rem",
  minHeight: "4rem",
  py: "2rem",
  fontSize:"2rem",
  backgroundColor: palette.navyBlue,
  "&:hover": {
    backgroundColor: palette.navyBlue,
    opacity: 0.7,
  },
} as const;
type Props = Omit<ButtonProps, "variant" | "color"> & {

};

const AuthButton = React.forwardRef<HTMLButtonElement, Props>(function AuthButton(
  { children, sx, size = "large", type = "submit", fullWidth = true, ...rest},
  ref
  ) {
    // undefined を配列に混ぜない
  const mergedSx: SxProps<Theme> = Array.isArray(sx)
  ? [baseSx, ...sx]
  : sx
  ? [baseSx, sx]
  : baseSx;
  
  return (
    <Button
    ref={ref}
    type={type}
    variant="contained"
    size={size}
    fullWidth={fullWidth}
    sx={mergedSx}
    {...rest}
    >
      {children}
    </Button>
  );
});

export default AuthButton;
