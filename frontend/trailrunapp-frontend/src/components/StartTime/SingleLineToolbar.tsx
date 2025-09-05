import React from "react";
import { DateTimePickerToolbar, type DateTimePickerToolbarProps } from "@mui/x-date-pickers/DateTimePicker";

const SingleLineToolbar = (props: DateTimePickerToolbarProps) => (
  <DateTimePickerToolbar
    {...props}
    sx={{
      ...props.sx,
      "& .MuiDateTimePickerToolbar-dateContainer": {
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
      },
      "& .MuiDateTimePickerToolbar-dateContainer > :first-of-type": {
        display: "none",
      },
    }}
    />
)

export default SingleLineToolbar;
