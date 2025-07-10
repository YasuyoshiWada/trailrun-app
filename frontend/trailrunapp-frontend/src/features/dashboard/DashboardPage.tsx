import React from "react";
import { Box } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import { dummyRaceData } from "../../data/dummyRaceData";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";

const DashboardPage: React.FC = () => {
  const isMobile = useResponsive();

  return (
    <Box
      sx={{
        ml: isMobile ? 0 : 4,
        justifyContent: 'center',
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ textAlign: isMobile ? 'center' : undefined }}>
        <DashboardTitle />
      </Box>
      {/* 横スクロール部分をHorizontalScrollerでまとめる */}
      <HorizontalScroller isMobile={isMobile}>
        <StatusLegend isMobile={isMobile} />
      </HorizontalScroller>
      {/* レースステータスバーの表示 */}
      {dummyRaceData.map((data) => (
        <RaceCategoryStatusBar
          key={data.categoryName}
          categoryName={data.categoryName}
          totalParticipants={data.totalParticipants}
          statusList={data.statusList}
        />
      ))}
    </Box>
  );
};

export default DashboardPage;
