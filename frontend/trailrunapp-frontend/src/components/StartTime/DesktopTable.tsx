// src/components/startTime/DesktopTable.tsx
import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDateTimePicker from "./ResponsiveDateTimePicker";
import { pickerLayoutSx, makeTextFieldSx } from "./styles";
import { palette } from "../../styles/palette";
import type { Category, OnTimeChange, PickerView } from "./types";
import SingleLineToolbar from "./SingleLineToolbar";//pickerの左上の2025 MM/DDの横一列表示のコンポーネント

type Props = {
  items: Category[];
  isHandset: boolean;
  tableCellSx: any;
  // 行ピッカー制御
  isOpen: (id: string) => boolean;
  open: (id: string) => void;
  close: () => void;
  view: PickerView;
  onViewChange: (v: PickerView) => void;
  // 値操作
  onTimeChange: OnTimeChange;
  checked: string[];
  onToggleCheck: (id: string) => void;
};

const DesktopTable: React.FC<Props> = ({
  items, isHandset, tableCellSx,
  isOpen, open, close, view, onViewChange,
  onTimeChange, checked, onToggleCheck,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={tableCellSx}>カテゴリ</TableCell>
        <TableCell sx={tableCellSx}>スタート時刻</TableCell>
        <TableCell sx={tableCellSx}>一括設定</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((cat) => (
        <TableRow key={cat.id}>
          <TableCell sx={tableCellSx}>{cat.name}</TableCell>
          <TableCell>
            <ResponsiveDateTimePicker
              isHandset={isHandset}
              minDate={dayjs().startOf("day")}
              open={isOpen(cat.id)}
              onOpen={() => open(cat.id)}
              onClose={close}
              onAccept={close}
              view={view}
              onViewChange={onViewChange}
              thresholdToRenderTimeInASingleColumn={0}
              value={cat.startTime ? dayjs(cat.startTime) : null}
              onChange={(val) => onTimeChange(cat.id, val)}
              ampm={false}
              views={["year","month","day","hours","minutes","seconds"]}
              format="YYYY/MM/DD HH:mm:ss"
              timeSteps={{ hours:1, minutes:1, seconds:1 }}
              closeOnSelect={false}
              slots={{ toolbar: SingleLineToolbar }}
              slotProps={{
                toolbar: { toolbarFormat: "YYYY/M/D" },
                textField: {
                  size: "medium",
                  fullWidth: true,
                  onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
                  sx: makeTextFieldSx(isHandset),
                },
                layout: { sx: pickerLayoutSx },
                openPickerButton: { onClick: () => open(cat.id), type:"button" },
                dialog: { keepMounted: true },
                actionBar: {
                  actions: ["cancel","accept"],
                  sx: { "& .MuiButton-root": { fontSize: "2.6rem", color: palette.navyBlue }},
                },
              }}
            />
          </TableCell>
          <TableCell sx={tableCellSx}>
            <Checkbox
              sx={{ ...tableCellSx, "& .MuiSvgIcon-root": { fontSize: 28 } }}
              checked={checked.includes(cat.id)}
              onChange={() => onToggleCheck(cat.id)}
              inputProps={{"aria-label": "一括指定"}}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DesktopTable;
