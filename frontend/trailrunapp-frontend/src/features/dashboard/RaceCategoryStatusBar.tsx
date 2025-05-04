import React from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../../styles/palette";

type StatusData = {
  label: string; // 例: "DNS", "スタート"
  value: number; // 例: 30人
  color: string; // paletteから取得（MUI sxで使える）
};

type Props = {
  categoryName: string;
  totalParticipants: number;
  statusList: StatusData[];
};

const RaceCategoryStatusBar: React.FC<Props> = ({ categoryName, totalParticipants, statusList}) => {
  return (
    <Box sx={{ display: 'flex', alignItems:'center', width: '40rem', height:'3rem', mb: '3.2rem'}}>
      {/* 左側カテゴリ名+人数 */}
      <Box sx={{width: '33%' }}>
        <Typography
          color="textPrimary"
          sx={{
            fontSize: '1.4rem',
            opacity: 0.5,
          }}
        >
          (参加人数 {totalParticipants})
        </Typography>
        <Typography
          color="textPrimary"
          sx={{
            fontSize:'2.4rem',
          }}
          >
            {categoryName}
        </Typography>
      </Box>

      {/* 右側ステータスバー */}
      <Box sx={{ display: 'flex', width: '30rem', height: '4rem' }}>
        {statusList.map((status,idx) => (
          <Box
            key={idx}
            color="textPrimary"
            sx={{
              width: `${(status.value / totalParticipants) * 100}%`,
              backgroundColor: status.color,
              fontSize:'1.6rem',
            }}
          >
            {status.value}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RaceCategoryStatusBar;
