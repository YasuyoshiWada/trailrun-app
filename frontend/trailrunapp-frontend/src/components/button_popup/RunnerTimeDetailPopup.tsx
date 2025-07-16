import React from "react";
import { RunnersData } from "../../data/dummyRunners";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

type RunnerTimeDetailPopupProps = {
  open: boolean;
  runner: RunnersData | undefined;
  onCancel: () => void;
};

const RunnerTimeDetailPopup: React.FC<RunnerTimeDetailPopupProps> = ({
  open,
  runner,
  onCancel,
}) => {

return (
  <Dialog open={open} onClose={onCancel}>
    <DialogContent>
      {runner?.name}
    </DialogContent>
  </Dialog>
)};

export default RunnerTimeDetailPopup;
