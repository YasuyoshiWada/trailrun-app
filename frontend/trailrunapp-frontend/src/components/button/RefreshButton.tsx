import {Box, IconButton, Tooltip } from "@mui/material";
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { palette } from "../../styles/palette";

type Props = {
  onClick: () => void;
  loading?: boolean;
  tooltip?: string;
}

export function RefreshButton({ onClick, loading, tooltip = "データ再取得"}: Props) {
  return (
    <Tooltip
    title={tooltip}
    //ここは現状非推奨だが必要
    componentsProps={{
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
        }}>
          <AutorenewRoundedIcon
          sx={{
            fontSize:"2.5rem"
          }}
          />
        </IconButton>
      </Box>
    </Tooltip>
  );
}
