import React, { JSX,useState } from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../styles/palette";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';       // 未受付
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';   // 受付済み
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // DNS
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';   // スタート
import LocationOnIcon from '@mui/icons-material/LocationOn';         // 地点1,2
import NotInterestedIcon from '@mui/icons-material/NotInterested';   //DNF
import HighlightOffIcon from '@mui/icons-material/HighlightOff';     //  DQ
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';       // フィニッシュ

type StatusLegendProps = {
  isSmallMobile?: boolean,
  isMobile?:boolean,
  onStatusClick?: (statusLabel: string) => void;
  selectedStatus?: string | undefined;
}

type statusList ={
  label: string;
  color: string;
  icon: JSX.Element;
}

const statusList : statusList[] = [
  { label: '未受付', color: palette.gray, icon: <HelpOutlineIcon />},
  { label: '受付済み', color: palette.aquaLight, icon: <PersonAddAlt1Icon />},
  { label: 'スタート', color: palette.navyBlue, icon: <DirectionsRunIcon />},
  { label: '地点1', color: palette.darkGray, icon: <LocationOnIcon />},
  { label: '地点2', color: palette.cyan, icon: < LocationOnIcon />},
  { label: 'フィニッシュ', color: palette.limeGreen, icon: <EmojiEventsIcon />},
  { label: 'DNS', color: palette.orange, icon: <RemoveCircleOutlineIcon />},
  { label: 'DNF', color: palette.mustardYellow, icon: <NotInterestedIcon />},
  { label: 'DQ', color: palette.coralRed, icon: <HighlightOffIcon />}
];

const StatusLegend: React.FC< StatusLegendProps> = ({
  isSmallMobile,
  isMobile,
  onStatusClick,
  selectedStatus,
}) => {
   // hover中のstatus labelを記憶
  const [ hovered, setHovered ] = useState<string | null>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: (isSmallMobile || isMobile) ? 'nowrap' : 'wrap',
        gap: '2.4rem',
        mb: '2.4rem',
        justifyContent:(isSmallMobile || isMobile) ? 'flex-start' :'left',
        width:"100%",
        minWidth: (isSmallMobile || isMobile) ? `${statusList.length * 120}px` : '0',
      }}
      >
        {/* mapでstatusListの中身を順番に取得、親要素のboxの中にcolorとlabelを挟む */}
        {statusList.map((status) => {
          const isActive = status.label === selectedStatus;


      return (
        <Box
            key={status.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              flex: '0 0 auto',
              minWidth: (isSmallMobile || isMobile) ? '120px' : 'undefined',
              whiteSpace: 'nowrap',
              background: isActive ? status.color : palette.white,
              color: isActive ? palette.white : status.color,
              fontWeight: isActive ? "bold" : "normal",
            opacity: hovered ===status.label ? 0.5 :1,//現在どのlabelにhoveredしているかstatus.labelで判定
            }}
            onClick={() => onStatusClick?. (status.label)}//labelをクリック
            style={{ cursor: onStatusClick ? "pointer" : "default"}}
            onMouseEnter={() => setHovered(status.label)}
            onMouseLeave={() => setHovered(null)}
          >
          <Box
          sx={{
            Color: status.color,
          }}
          >
            {React.cloneElement(status.icon, {
              sx: {
                fontSize: 28,
                color: isActive ? palette.white : status.color,
                }
                })}
          </Box>
          <Typography
          sx={{
            fontSize:'1.6rem',
            color: isActive ? palette.white : status.color,
            fontWeight: isActive ? "bold" : "normal",
            whiteSpace: 'nowrap'
          }}
          >
            {status.label}
          </Typography>
      </Box>
      );
    })}
  </Box>
  )
}

export default StatusLegend;
