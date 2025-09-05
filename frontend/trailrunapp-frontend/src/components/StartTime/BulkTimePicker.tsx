// src/components/startTime/BulkTimePicker.tsx
import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import ResponsiveDateTimePicker from "./ResponsiveDateTimePicker";
import SingleLineToolbar from "./SingleLineToolbar"; //pickerの左上の2025 MM/DDの横一列表示のコンポーネント
import { pickerLayoutSx, makeTextFieldSx } from "./styles";
import { palette } from "../../styles/palette";
import type { PickerView } from "./types";

type Props = {
  isHandset: boolean;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  // コントローラ
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAccept: () => void;
  view: PickerView;
  onViewChange: (v: PickerView) => void;
};

const BulkTimePicker: React.FC<Props> = ({
  isHandset, value, onChange,
  open, onOpen, onClose, onAccept,
  view, onViewChange,
}) => (
  <ResponsiveDateTimePicker
    isHandset={isHandset}
    minDate={dayjs().startOf("day")}
    open={open}
    onOpen={onOpen}
    onClose={onClose}
    onAccept={onAccept}
    view={view}
    onViewChange={onViewChange}
    thresholdToRenderTimeInASingleColumn={0}
    value={value}
    onChange={onChange}
    ampm={false}
    views={["year","month","day","hours","minutes","seconds"]}
    format="YYYY/MM/DD HH:mm:ss"
    closeOnSelect={false}
    timeSteps={{ hours:1, minutes:1, seconds:1 }}
    slots={{ toolbar: SingleLineToolbar }}
    slotProps={{
      textField: {
        size: "medium",
        fullWidth: true,
        label: "一括時刻指定",
        //一括時刻指定のフォントサイズ
        InputLabelProps: { sx: { fontSize: isHandset ? "3rem" : "2rem" } },
      sx: makeTextFieldSx(isHandset),
      },
      layout: { sx: pickerLayoutSx },
      openPickerButton: { onClick: onOpen, type: "button" },
      actionBar: {
        actions: ["cancel","accept"],
        sx: { "& .MuiButton-root": { fontSize: "2.6rem", color: palette.navyBlue }},
      },
      toolbar: { toolbarFormat: "YYYY M/D" },
    }}
  />
);

export default BulkTimePicker;
