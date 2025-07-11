import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { palette } from "../styles/palette";

type PopupDialogProps = {
  open: boolean;
  description?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:string;
  cancelColor?:string;
  children?: React.ReactNode;
};

const PopupDialog: React.FC<PopupDialogProps> = ({
  open,
  description,
  onCancel,
  onConfirm,
  confirmText = "はい",
  cancelText = "いいえ",
  confirmColor,
  cancelColor,
  children,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogContent>
      {description}
      {children}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center",gap: "5rem"}}>
      <Button
      variant="contained"
      onClick={onConfirm}
      sx={{
        backgroundColor:confirmColor || undefined,
        color: palette.textPrimary,
      }}
      >{confirmText}</Button>
      <Button
      variant="contained"
      onClick={onCancel}
      sx={{
        backgroundColor:cancelColor || undefined,
        color: palette.textPrimary,
        opacity: 0.5,
      }}
      >{cancelText}</Button>
    </DialogActions>
  </Dialog>
);

export default PopupDialog;
