import React from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../styles/palette";


const statusList = [
  { label: '未受付', color: palette.gray},
  { label: '受付済み', color: palette.aquaLight},
  { label: 'DNS', color: palette.orange},
  { label: 'スタート', color: palette.navyBlue},
  { label: '地点1', color: palette.darkGray},
  { label: '地点2', color: palette.cyan},
  { label: 'DNF', color: palette.mustardYellow},
  { label: 'フィニッシュ', color: palette.limeGreen},
  { label: 'DQ', color: palette.coralRed}
];

const StatusLegend: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.4rem',
        mb: '2.4rem',
        justifyContent: 'left',
      }}
      >
        {/* mapでstausListの中身を順番に取得、親要素のboxの中にcolorとlabelを挟む */}
        {statusList.map((status) => (
        <Box
            key={status.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
          <Box
          sx={{
            width:'2rem',
            height: '2rem',
            backgroundColor: status.color,
          }}
          />
          <Typography
          sx={{
            fontSize:'2rem',
          }}
          color="textPrimary">
            {status.label}
          </Typography>
      </Box>
    ))}
  </Box>
  )
}

export default StatusLegend;
