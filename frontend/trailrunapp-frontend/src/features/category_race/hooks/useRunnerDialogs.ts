import { useCallback, useMemo, useState } from "react";
import { palette } from "../../../styles/palette";
import { RunnersData } from "../../../data/runnersTypes";

type DialogType = "DNS" | "DNF" | "DQ";
type DialogMode = "register" | "remove";

interface DialogProps {
  reasonLabel: string;
  confirmColor: string;
  cancelColor: string;
}

export interface RunnerDialogController {
  dialogOpen: boolean;
  dialogType: DialogType;
  dialogMode: DialogMode;
  dialogProps: DialogProps;
  selectedRunner: RunnersData | undefined;
  timeDialogOpen: boolean;
  timeMobileDialogOpen: boolean;
  handleDnsClick: (runnerId: number) => void;
  handleDnfClick: (runnerId: number) => void;
  handleDqClick: (runnerId: number) => void;
  handleTimeDetailClick: (runnerId: number) => void;
  handleTimeMobileDetailClick: (runnerId: number) => void;
  handleConfirm: (reason: string) => void;
  handleDialogCancel: () => void;
  handleDialogExited: () => void;
  handleTimeDialogCancel: () => void;
  handleTimeMobileDialogCancel: () => void;
}

const getDialogProps = (type: DialogType, mode: DialogMode): DialogProps => {
  const isRegister = mode === "register";

  switch (type) {
    case "DNS":
      return {
        reasonLabel: "DNS要因",
        confirmColor: isRegister ? palette.orange : palette.gray,
        cancelColor: isRegister ? palette.gray : palette.orange,
      };
    case "DNF":
      return {
        reasonLabel: "DNF要因",
        confirmColor: isRegister ? palette.mustardYellow : palette.gray,
        cancelColor: isRegister ? palette.gray : palette.mustardYellow,
      };
    case "DQ":
      return {
        reasonLabel: "DQ要因",
        confirmColor: isRegister ? palette.coralRed : palette.gray,
        cancelColor: isRegister ? palette.gray : palette.coralRed,
      };
    default:
      return {
        reasonLabel: "",
        confirmColor: palette.gray,
        cancelColor: palette.gray,
      };
  }
};

const isDialogActive = (runner: RunnersData | undefined, type: DialogType): boolean => {
  if (!runner) return false;

  switch (type) {
    case "DNS":
      return !!runner.dns;
    case "DNF":
      return !!runner.dnf;
    case "DQ":
      return !!runner.dq;
    default:
      return false;
  }
};

export const useRunnerDialogs = (
  runners: RunnersData[],
  setRunners: React.Dispatch<React.SetStateAction<RunnersData[]>>,
): RunnerDialogController => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>("DNS");
  const [dialogMode, setDialogMode] = useState<DialogMode>("register");
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [timeMobileDialogOpen, setTimeMobileDialogOpen] = useState(false);
  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  const openDialog = useCallback((runnerId: number, type: DialogType) => {
    const runner = runners.find(r => r.id === runnerId);
    const shouldRemove = isDialogActive(runner, type);

    setSelectedRunnerId(runnerId);
    setDialogType(type);
    setDialogMode(shouldRemove ? "remove" : "register");
    setDialogOpen(true);
  }, [runners]);

  const handleDnsClick = useCallback((runnerId: number) => {
    openDialog(runnerId, "DNS");
  }, [openDialog]);

  const handleDnfClick = useCallback((runnerId: number) => {
    openDialog(runnerId, "DNF");
  }, [openDialog]);

  const handleDqClick = useCallback((runnerId: number) => {
    openDialog(runnerId, "DQ");
  }, [openDialog]);

  const handleTimeDetailClick = useCallback((runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setTimeDialogOpen(true);
  }, []);

  const handleTimeMobileDetailClick = useCallback((runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setTimeMobileDialogOpen(true);
  }, []);

  const handleDialogCancel = useCallback(() => {
    setDialogOpen(false);
    setSelectedRunnerId(null);
  }, []);

  const handleTimeDialogCancel = useCallback(() => {
    setTimeDialogOpen(false);
    setSelectedRunnerId(null);
  }, []);

  const handleTimeMobileDialogCancel = useCallback(() => {
    setTimeMobileDialogOpen(false);
    setSelectedRunnerId(null);
  }, []);

  const handleDialogExited = useCallback(() => {
    setSelectedRunnerId(null);
  }, []);

  const handleConfirm = useCallback((reason: string) => {
    if (selectedRunnerId === null) return;

    setRunners(prev => prev.map(r => {
      if (r.id !== selectedRunnerId) return r;

      if (dialogType === "DNS") {
        return dialogMode === "register"
          ? { ...r, dns: true, dnsContent: reason }
          : { ...r, dns: false, dnsContent: undefined };
      }

      if (dialogType === "DNF") {
        return dialogMode === "register"
          ? { ...r, dnf: true, dnfContent: reason }
          : { ...r, dnf: false, dnfContent: undefined };
      }

      if (dialogType === "DQ") {
        return dialogMode === "register"
          ? { ...r, dq: true, dqContent: reason }
          : { ...r, dq: false, dqContent: undefined };
      }

      return r;
    }));

    setDialogOpen(false);
    setSelectedRunnerId(null);
  }, [dialogMode, dialogType, selectedRunnerId, setRunners]);

  const selectedRunner = useMemo(
    () => runners.find(r => r.id === selectedRunnerId),
    [runners, selectedRunnerId],
  );

  return {
    dialogOpen,
    dialogType,
    dialogMode,
    dialogProps: getDialogProps(dialogType, dialogMode),
    selectedRunner,
    timeDialogOpen,
    timeMobileDialogOpen,
    handleDnsClick,
    handleDnfClick,
    handleDqClick,
    handleTimeDetailClick,
    handleTimeMobileDetailClick,
    handleConfirm,
    handleDialogCancel,
    handleDialogExited,
    handleTimeDialogCancel,
    handleTimeMobileDialogCancel,
  };
};
