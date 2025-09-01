// src/components/startTime/MobileCards.tsx
import React from "react";
import { Box, Stack, Divider, Typography, Checkbox, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";
import { palette } from "../../styles/palette";
import { pickerLayoutSx, makeTextFieldSx } from "./styles";
import ResponsiveDateTimePicker from "./ResponsiveDateTimePicker";
import type { Category, OnTimeChange, PickerView } from "./types";

type Props = {
  items: Category[];
  isHandset: boolean;
  cardTextSx: any;
  isOpen: (id: string) => boolean;
  open: (id: string) => void;
  close: () => void;
  view: PickerView;
  onViewChange: (v: PickerView) => void;
  onTimeChange: OnTimeChange;
  checked: string[];
  onToggleCheck: (id: string) => void;
};

const MobileCards: React.FC<Props> = ({
  items, isHandset, cardTextSx,
  isOpen, open, close, view, onViewChange,
  onTimeChange, checked, onToggleCheck,
}) => (
  <Stack spacing={2}>
    {items.map((cat) => (
      <Box key={cat.id} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1.2, bgcolor: "background.paper", ...cardTextSx }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 0.6 }}>
          <Typography sx={{ fontSize: "3rem", fontWeight: 600, color: palette.textPrimary }}>{cat.name}</Typography>
          <FormControlLabel
            labelPlacement="start"
            sx={{
              m: 0, gap: "0.2rem",
              ".MuiFormControlLabel-label": { fontSize: "3rem", color: palette.darkGray, fontWeight: "bold" },
            }}
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: "5rem" }, p: 0.5 }}
                checked={checked.includes(cat.id)}
                onChange={() => onToggleCheck(cat.id)}
              />
            }
            label="一括"
          />
        </Box>

        <Divider sx={{ mb: 0.6 }} />

        <ResponsiveDateTimePicker
          isHandset={isHandset}
          disablePast
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
          reduceAnimations
          slotProps={{
            textField: {
              size: "medium",
              fullWidth: true,
              sx: makeTextFieldSx(isHandset),
            },
            layout: { sx: pickerLayoutSx },
            openPickerButton: { onClick: () => open(cat.id) },
            actionBar: {
              actions: ["cancel","accept"],
              sx: { "& .MuiButton-root": { fontSize: "2.6rem", color: palette.navyBlue }},
            },
          }}
        />
      </Box>
    ))}
  </Stack>
);

export default MobileCards;
