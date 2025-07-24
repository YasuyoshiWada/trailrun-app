import React from "react";
import { Box } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import { RaceCategoryData, dummyRaceData } from "../../data/dummyRaceData";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { palette, statusColorMap } from "../../styles/palette";
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";

//ステータスバー合計値ロジック
function getTotalStatusList(raceCategoryList:RaceCategoryData[]) {
  const totals:{ [label: string]: {value:number; color:string}} = {};
  raceCategoryList.forEach(category => {
    category.statusList.forEach(status => {
      if (!totals[status.label]) {
        totals[status.label] = { value: 0, color: statusColorMap[status.label] || palette.darkGray };
      }
      totals[status.label].value += status.value;
    });
  });
  return Object.entries(totals).map(([label, { value, color }]) => ({
    label,
    value,
    color
  }));
}


const DashboardPage: React.FC = () => {
  const {isSmallMobile,isMobile} = useResponsive();

  //現在はdummyRaceDataを使用しているが、APIでデータを取得する予定
const totalStatusList = getTotalStatusList(dummyRaceData);
const totalParticipants = dummyRaceData.reduce((sum, cat) => sum + cat.totalParticipants, 0);
const responsive = {isSmallMobile, isMobile}

  return (
    <Box
      sx={{
        ml: isMobile ? 0 : 4,
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        overflow: "auto",//overflowでカテゴリが増えてページに収まらない時に縦スクロールできるようにしている。
        boxSizing: "border-box",
      }}
    >
      <Box
      sx={{
        overflow: "auto",
        width: "100%",
      }}
      >
       {/* 横スクロール部分をHorizontalScrollerでまとめる */}
        <HorizontalScroller
        isSmallMobile={isSmallMobile}
        isMobile={isMobile}
        >
          <StatusLegend
          isSmallMobile={isSmallMobile}
          isMobile={isMobile}
          />
        </HorizontalScroller>
        <Box
        sx={{
          mb: (isSmallMobile || isMobile) ? 'undefined' : '3rem',
          textAlign: (isSmallMobile || isMobile)? 'center' : undefined
          }}
          >
          <DashboardTitle />
        </Box>
        {/* 合計バーを表示 */}
        <RaceTotalStatusBar
          totalParticipants={totalParticipants}
          totalStatusList={mapStatusWithColor(totalStatusList)}
          responsive={responsive}
          />
        {/* レースステータスバーの表示 */}
        {dummyRaceData.map((data) => (
          <RaceCategoryStatusBar
            key={data.categoryName}
            categoryName={data.categoryName}
            totalParticipants={data.totalParticipants}
            statusList={mapStatusWithColor(data.statusList)}
            responsive={responsive}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPage;
