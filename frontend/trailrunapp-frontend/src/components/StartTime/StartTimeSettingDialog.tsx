// src/components/startTime/StartTimeSettingDialog.tsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import useResponsive from "../../hooks/useResponsive";
import { palette } from "../../styles/palette";
import { makeTableCellSx } from "./styles";
import DesktopTable from "./DesktopTable";
import MobileCards from "./MobileCards";
import BulkTimePicker from "./BulkTimePicker";
import { useRowPickerController, useSinglePickerController } from "./usePickerControllers";
import type { Category } from "./types";

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSave: (categories: Category[]) => void;
};

const StartTimeSettingDialog: React.FC<Props> = ({ open, categories, onClose, onSave }) => {
  const [edited, setEdited] = useState<Category[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [bulkTime, setBulkTime] = useState<Dayjs | null>(null);

  // ピッカー制御（行／一括）
  const rowCtl = useRowPickerController();
  const bulkCtl = useSinglePickerController();

  const { isSmallMobile, isMobile } = useResponsive();
  const isHandset = isSmallMobile || isMobile;
  const tableCellSx = makeTableCellSx(isHandset);

  useEffect(() => {
    dayjs.locale("ja");
    setEdited(categories);
    setChecked([]);
  }, [categories, open]);

  const handleTimeChange = (catId: string, value: Dayjs | null) => {
    setEdited(prev => prev.map(cat => cat.id === catId ? { ...cat, startTime: value ? value.toISOString() : null } : cat));
  };

  const handleCheck = (catId: string) => {
    setChecked(prev => prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]);
  };

  const handleBulkApply = () => {
    if (!bulkTime) return;
    setEdited(prev => prev.map(cat => checked.includes(cat.id) ? { ...cat, startTime: bulkTime.toISOString() } : cat));
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isHandset} maxWidth="md" fullWidth disableEnforceFocus disableRestoreFocus keepMounted>
      <DialogTitle sx={{ textAlign: "center", fontSize: isHandset ? "4rem" : "2.4rem", fontWeight: "bold", color: palette.navyBlue }}>
        スタート時刻設定
      </DialogTitle>

      <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ja"
      localeText={{
        okButtonLabel: "次へ",
        cancelButtonLabel: "キャンセル",
        dateTimePickerToolbarTitle: "スタート時刻選択",
        }}>
        <DialogContent>
          {isHandset ? (
            <MobileCards
              items={edited}
              isHandset={isHandset}
              cardTextSx={tableCellSx}
              isOpen={rowCtl.isOpen}
              open={rowCtl.open}
              close={rowCtl.close}
              view={rowCtl.view}
              onViewChange={rowCtl.onViewChange}
              onTimeChange={handleTimeChange}
              checked={checked}
              onToggleCheck={handleCheck}
            />
          ) : (
            <DesktopTable
              items={edited}
              isHandset={isHandset}
              tableCellSx={tableCellSx}
              isOpen={rowCtl.isOpen}
              open={rowCtl.open}
              close={rowCtl.close}
              view={rowCtl.view}
              onViewChange={rowCtl.onViewChange}
              onTimeChange={handleTimeChange}
              checked={checked}
              onToggleCheck={handleCheck}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ px: "2.2rem", pb: "2rem", display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem", flex: 1, flexWrap: "wrap" }}>
            <BulkTimePicker
              isHandset={isHandset}
              value={bulkTime}
              onChange={setBulkTime}
              open={bulkCtl.open}
              onOpen={bulkCtl.onOpen}
              onClose={bulkCtl.onClose}
              onAccept={bulkCtl.onAccept}
              view={bulkCtl.view}
              onViewChange={bulkCtl.onViewChange}
            />
          </Box>

          <Box sx={{ display: "flex", gap: isHandset ? 1.5 : 1 }}>
            <Button sx={{ fontSize: "2.4rem" }} variant="outlined" onClick={handleBulkApply} disabled={checked.length === 0 || !bulkTime}>
              一括適用
            </Button>
            <Button onClick={onClose} sx={{ fontSize: "2.6rem", color: palette.darkGray }}>
              キャンセル
            </Button>
            <Button onClick={() => onSave(edited)} variant="contained" sx={{ fontSize: isHandset ? "2.4rem" : "1.8rem", color: palette.white, background: palette.navyBlue }}>
              保存
            </Button>
          </Box>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
};

export default StartTimeSettingDialog;
