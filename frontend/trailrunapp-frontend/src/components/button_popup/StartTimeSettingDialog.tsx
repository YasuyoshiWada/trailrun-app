import React, {useState, useEffect } from "react";
import { palette } from "../../styles/palette";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Box
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

type Category = {
  id: string;
  name: string;
  startTime: string | null; //ISO文字列
};

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSave: (categories: Category[]) => void;
};

const StartTimeSettingDialog: React.FC<Props> = ({ open,categories, onClose,onSave }) => {
  const [edited, setEdited] = useState<Category[]>([]);
  const [checked, setChecked ] = useState<string[]>([]);
  //一括編集用の時刻
  const [bulkTime, setBulkTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    setEdited(categories);
    setChecked([])
  }, [categories, open]);

//各カテゴリの時刻更新
const handleTimeChange = (catId: string, value: Dayjs | null ) => {
  setEdited((prev: Category[])  =>
    prev.map(cat => cat.id === catId ? { ...cat, startTime: value ? value.toISOString() : null } : cat)
    );
};

//チェックボックスのハンドラ
const handleCheck = (catId: string) => {
  setChecked((prev: string[]) => prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]);
};

// 一括適用
const handleBulkApply = () => {
  if (!bulkTime) return;
  setEdited((prev: Category[]) =>
  prev.map(cat => checked.includes(cat.id) ? {...cat, startTime: bulkTime.toISOString()} : cat )
  );
};

const TableCellSx = {
  fontSize:"2rem",
  textAlign: "center",
  color: palette.textPrimary
}

return (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle
    sx={{
      textAlign: "center",
      fontSize: "2.4rem",
      fontWeight: "bold",
      color: palette.navyBlue

    }}>
      スタート時刻設定</DialogTitle>
    <DialogContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{...TableCellSx}}>カテゴリ</TableCell>
            <TableCell sx={{...TableCellSx}}>スタート時刻</TableCell>
            <TableCell sx={{...TableCellSx}}>一括設定</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edited.map(cat => (
            <TableRow key={cat.id}>
              <TableCell sx={{...TableCellSx}}>{cat.name}</TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                  value={cat.startTime ? dayjs(cat.startTime) : null}
                  onChange={val => handleTimeChange(cat.id, val)}
                  ampm={false}
                  format="YYYY/MM/DD HH:mm:ss"
                  slotProps={{
                    textField: { size:"medium", fullWidth: true }
                  }}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell sx={{...TableCellSx}}>
                <Checkbox
                sx={{
                  ...TableCellSx,
                  '& .MuiSvgIcon-root': { fontSize: 28 }
                }}
                checked={checked.includes(cat.id)}
                onChange={() => handleCheck(cat.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
    <DialogActions
      sx={{
        px: "2.2rem",
        py: "0.8rem",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem"
      }}
      >
        {/* 左側: 一括時刻指定 + 一括適用 */}
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          flex: 1, // 右のボタン群を右側に押しやる
          flexWrap: "wrap" //画面が狭い時に折り返し
        }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            value={bulkTime}
            onChange={setBulkTime}
            ampm={false}
            format="YYYY/MM/DD HH:mm:ss"
            slotProps={{
              textField: { size: "medium", label: "一括時刻指定"}
            }}
          />
        </LocalizationProvider>

        <Button
        sx={{fontSize: "2rem"}}
        variant="outlined" onClick={handleBulkApply} disabled={checked.length === 0 || !bulkTime}>
          一括適用
        </Button>
        </Box>
        {/* 右側: キャンセル / 保存 */}
        <Box>
          <Button
            onClick={onClose}
            sx={{
              fontSize:"1.8rem",
              color: palette.darkGray,
            }}>キャンセル</Button>
            <Button
            onClick={() => onSave(edited)}
            variant="contained"
            sx={{
              fontSize:"1.8rem",
              color: palette.white,
              background:palette.navyBlue
            }}
            >
              保存
          </Button>
        </Box>
    </DialogActions>
  </Dialog>
)
}

export default StartTimeSettingDialog;
