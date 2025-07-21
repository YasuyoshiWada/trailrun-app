import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { palette } from "../styles/palette";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

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
  onExited?: () => void; //親で閉じるpopupの一瞬popupが小さくなる現象を解消する値
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
  onExited,
}) => {
// open=false または descriptionが空nullの場合はDialog自体を出さない
if (!open || !description) return null;

return (
  <Dialog
  open={open}
  onClose={onCancel}
  slotProps={{
    transition:{
      onExited,
    }
  }}
  >
    <DialogContent
    sx={{
      position: 'relative'
    }}>
      {description}
      {children}
      <IconButton
      aria-label="close"
      onClick={onCancel}
      sx={{
        position: "absolute",
        right: "1rem",
        top: "1rem"
      }}
    >
      <CloseIcon
      sx={{
        fontSize:"2rem"
      }}
      />
    </IconButton>
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
};

export default PopupDialog;
