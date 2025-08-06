import React, {useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TextField
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

return (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>スタート時刻設定</DialogTitle>
    <DialogContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>カテゴリ</TableCell>
            <TableCell>スタート時刻</TableCell>
            <TableCell>一括設定</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edited.map(cat => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                  value={cat.startTime ? dayjs(cat.startTime) : null}
                  onChange={val => handleTimeChange(cat.id, val)}
                  ampm={false}
                  format="YYYY/MM/DD HH:mm:ss"
                  slotProps={{
                    textField: { size:"small", fullWidth: true }
                  }}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell>
                <Checkbox
                checked={checked.includes(cat.id)}
                onChange={() => handleCheck(cat.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "1.6rem"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
          value={bulkTime}
          onChange={setBulkTime}
          ampm={false}
          format="YYYY/MM/DD HH:mm:ss"
          slotProps={{
            textField: { size: "small", label: "一括時刻指定"}
          }}
        />
        </LocalizationProvider>
        <Button variant="outlined" onClick={handleBulkApply} disabled={checked.length === 0 || !bulkTime}>
          一括適用
        </Button>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button onClick={() => onSave(edited)} variant="contained">保存</Button>
    </DialogActions>
  </Dialog>
)
}

export default StartTimeSettingDialog;
