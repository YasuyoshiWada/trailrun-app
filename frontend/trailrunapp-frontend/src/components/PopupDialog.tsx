import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { palette } from "../styles/palette";

type PopupDialogProps = {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

const PopupDialog: React.FC<PopupDialogProps> = ({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "はい",
  cancelText = "いいえ",
  children,
}) => (
  <Dialog open={open} onClose={onCancel}>
    {/* 後にタイトルを見出しに出したければ使用する */}
    {/* <DialogTitle sx={{ justifyContent: "center", fontWeight: "bold"}}>{title}</DialogTitle> */}
    <DialogContent>
      {description}
      {children}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center",gap: "5rem"}}>
      <Button onClick={onConfirm}
      sx={{
        backgroundColor:palette.orange,
        color: palette.textPrimary,
      }}
      >{confirmText}</Button>
      <Button onClick={onCancel}
      sx={{
        backgroundColor:palette.orange,
        color: palette.textPrimary,
        opacity: 0.5,
      }}
      >{cancelText}</Button>
    </DialogActions>
  </Dialog>
);

export default PopupDialog;
