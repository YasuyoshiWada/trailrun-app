import type { Dayjs } from "dayjs";
//ui/x-date-pickers"がv8なのでmodelsから型をimport,DateOrTimeView型(DateView（"year" | "month" | "day"）TimeView（"hours" | "minutes" | "seconds"）それらを合わせたユニオン型 DateOrTimeView)をPickerViewという名前に変えてimport
import type { DateOrTimeView as PickerView } from "@mui/x-date-pickers/models";

export type Category = {
  id: string;
  name: string;
  startTime: string | null; //ISO
};

export type OnTimeChange = (catId: string, value: Dayjs | null) => void;

export type {PickerView};
