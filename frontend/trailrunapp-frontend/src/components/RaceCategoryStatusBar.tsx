import React,{useState} from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../styles/palette";

type StatusData = {
  label: string; // 例: "DNS", "スタート"
  value: number; // 例: 30人
  color: string; // paletteから取得（MUI sxで使える）
};

//レスポンシブデザイン
type Responsive = {
  isSmallMobile: boolean;
  isMobile: boolean;
}

type Props = {
  categoryName: string;
  totalParticipants: number;
  statusList: StatusData[];
  responsive: Responsive;
};

const RaceCategoryStatusBar: React.FC<Props> = ({ categoryName, totalParticipants, statusList,responsive }) => {
  const { isSmallMobile, isMobile } = responsive;
  const [ hovered,setHovered ] = useState(false);

  return (
    <Box
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    sx={{
    display: 'flex',
    flexDirection: (isSmallMobile || isMobile ) ? 'column' : 'row',
    alignItems:'center',
    width: isSmallMobile ? '40rem' : isMobile ? '45rem' : '80rem',
    height:'auto',
    mb: '1.2rem',
    opacity: hovered ? 0.5 :1,
    cursor: "pointer",
    transition: "opacity 0.2s"
    }}
    >
      {/* 左側カテゴリ名+人数 */}
      <Box
      sx={{
        width:(isSmallMobile || isMobile) ? '100%' : '30%',
        textAlign: (isSmallMobile || isMobile) ? 'center' : 'left',
        ...(isSmallMobile || isMobile//この書き方で、isSmallMobileとisMobileのみにスタイルが適用
          ? { display: 'flex', alignItems: 'center', gap: '1rem' }
          : {}), // 何も指定しない場合は空オブジェクト
        }}
        >
        <Typography
          sx={{
            color:palette.darkGray,
            fontSize: '2rem',
            display:"flex",
            justifyContent: "center",
          }}
        >
          (参加人数 {totalParticipants})
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
            {categoryName}
        </Typography>
      </Box>

      {/* 右側ステータスバー */}
      <Box
      sx={{
        display: 'flex',
        width:(isSmallMobile || isMobile) ? '100%' : '70rem',
        height: '4rem',
        borderRadius: '0.5rem',
        overflow: 'hidden'
        }}>
        {statusList.map((status,idx) => (
          <Box
            key={idx}
            sx={{
              width: `${(status.value / totalParticipants) * 100}%`,
              backgroundColor: status.color,
              color:palette.textPrimary,
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

export default RaceCategoryStatusBar;
