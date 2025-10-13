import React from "react";
import { Box } from "@mui/material";
import RaceEntryTableDesktop from "../../../components/RaceEntryTableDesktop";
import RaceEntryTableMobile from "../../../components/RaceEntryTableMobile";
import RunnerStatusPopupDialog from "../../../components/button_popup/RunnerStatusPopupDialog";
import RunnerTimeDetailPopup from "../../../components/button_popup/RunnerTimeDetailPopup";
import RunnerTimeDetailMobilePopup from "../../../components/button_popup/RunnerTimeDetailMobilePopup";
import { RunnersData } from "../../../data/runnersTypes";
import { RunnerDialogController } from "../hooks/useRunnerDialogs";

interface RunnerTableSectionProps {
  runners: RunnersData[];
  allRunners: RunnersData[];
  responsive: { isSmallMobile: boolean; isMobile: boolean };
  boxHeight: string;
  dialog: RunnerDialogController;
}

export const RunnerTableSection: React.FC<RunnerTableSectionProps> = ({
  runners,
  allRunners,
  responsive,
  boxHeight,
  dialog,
}) => {
  const { isSmallMobile, isMobile } = responsive;

  return (
    <Box
      sx={{
        maxHeight: boxHeight,
        overflowY: "auto",
        mt: "1.4rem",
      }}
    >
      {isSmallMobile || isMobile ? (
        <RaceEntryTableMobile
          runners={runners}
          onTimeMobileDetailClick={dialog.handleTimeMobileDetailClick}
        />
      ) : (
        <RaceEntryTableDesktop
          runners={runners}
          onDnsClick={dialog.handleDnsClick}
          onDnfClick={dialog.handleDnfClick}
          onDqClick={dialog.handleDqClick}
          onTimeDetailClick={dialog.handleTimeDetailClick}
        />
      )}
      <RunnerStatusPopupDialog
        open={dialog.dialogOpen}
        runner={dialog.selectedRunner}
        type={dialog.dialogType}
        reasonLabel={dialog.dialogProps.reasonLabel}
        onConfirm={dialog.handleConfirm}
        onCancel={dialog.handleDialogCancel}
        onExited={dialog.handleDialogExited}
        confirmColor={dialog.dialogProps.confirmColor}
        cancelColor={dialog.dialogProps.cancelColor}
        mode={dialog.dialogMode}
      />
      <RunnerTimeDetailPopup
        open={dialog.timeDialogOpen}
        runner={dialog.selectedRunner}
        onCancel={dialog.handleTimeDialogCancel}
      />
      <RunnerTimeDetailMobilePopup
        open={dialog.timeMobileDialogOpen}
        runner={dialog.selectedRunner}
        onDnsClick={dialog.handleDnsClick}
        onDnfClick={dialog.handleDnfClick}
        onDqClick={dialog.handleDqClick}
        onCancel={dialog.handleTimeMobileDialogCancel}
        allRunners={allRunners}
      />
    </Box>
  );
};
