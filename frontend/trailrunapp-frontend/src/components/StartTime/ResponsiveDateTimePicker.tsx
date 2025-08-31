// src/components/startTime/ResponsiveDateTimePicker.tsx
import React from "react";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import type { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import type { Dayjs } from "dayjs";

type Props = DateTimePickerProps<false> & {
  isHandset: boolean;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
};

const ResponsiveDateTimePicker: React.FC<Props> = ({ isHandset, ...props }) =>
  isHandset ? <MobileDateTimePicker {...props} /> : <DateTimePicker {...props} />;

export default ResponsiveDateTimePicker;
