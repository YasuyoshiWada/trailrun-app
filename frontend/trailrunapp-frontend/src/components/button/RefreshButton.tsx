import {Box, IconButton, Tooltip } from "@mui/material";
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { palette } from "../../styles/palette";
import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  loading?: boolean;
  tooltip?: string;
  icon?: ReactNode;
}

export function RefreshButton({
  onClick,
  loading,
  tooltip = "データ再取得",
  icon,
}: Props) {
  return (
    <Tooltip
    title={tooltip}
    slotProps={{
      tooltip: {
        sx: { fontSize: "1.5rem"}
      }
    }}
    >
      <Box
      sx={{
        backgroundColor: palette.lightGray,
        borderRadius: "1.2rem"
      }}>
        <IconButton
        onClick={onClick}
        disabled={loading}
        sx={{
          fontSize:"2.5rem"
        }}
        >
          {icon ?? (
            <AutorenewRoundedIcon
          sx={{
            fontSize:"2.5rem"
          }}
          />
          )}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
