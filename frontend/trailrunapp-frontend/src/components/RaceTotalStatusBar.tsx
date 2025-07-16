import React from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../styles/palette";

type StatusData = {
  label: string; // 例: "DNS", "スタート"
  value: number; // 例: 30人
  color: string; // paletteから取得（MUI sxで使える）
};

type Props ={
  totalParticipants: number;
  totalStatusList: StatusData[];
}


const RaceTotalStatusBar: React.FC<Props> = ({ totalParticipants, totalStatusList}) => {
  return (
    <Box sx={{ display: 'flex', alignItems:'center', width: '80rem', height:'3rem', mb: '3.2rem'}}>
      {/* 左側カテゴリ名+人数 */}
      <Box sx={{
        width: '30%',
        }}
        >
        <Typography
          sx={{
            color:palette.textPrimary,
            fontSize: '2rem',
            opacity: 0.5,
          }}
        >
          (全体参加人数 {totalParticipants})
        </Typography>
        <Typography
          sx={{
            color:palette.textPrimary,
            fontWeight:"bold",
            fontSize:'2.4rem',
            display:"flex",
            justifyContent: "center",
          }}
          >
            全体
        </Typography>
      </Box>

      {/* 右側ステータスバー */}
      <Box
      sx={{
        display: 'flex',
        width: '70rem',
        height: '4rem',
        }}>
        {totalStatusList.map((status,idx) => (
          <Box
            key={idx}
            color="textPrimary"
            sx={{
              width: `${(status.value / totalParticipants) * 100}%`,
              backgroundColor: status.color,
              fontSize:'1.6rem',
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
            }}
          >
            {status.value}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RaceTotalStatusBar;
