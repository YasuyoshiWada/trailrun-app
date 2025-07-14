import React from "react";
import { Box } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import { RaceCategoryData, dummyRaceData } from "../../data/dummyRaceData";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";

//ステータスバー合計値ロジック
function getTotalStatusList(raceCategoryList:RaceCategoryData[]) {
  const totals:{ [label: string]: {value:number; color:string}} = {};
  raceCategoryList.forEach(category => {
    category.statusList.forEach(status => {
      if (!totals[status.label]) {
        totals[status.label] = { value: 0, color: status.color };
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
  const isMobile = useResponsive();

  //現在はdummyRaceDataを使用しているが、APIでデータを取得する予定
const totalStatusList = getTotalStatusList(dummyRaceData);
const totalParticipants = dummyRaceData.reduce((sum, cat) => sum + cat.totalParticipants, 0);

  return (
    <Box
      sx={{
        ml: isMobile ? 0 : 4,
        justifyContent: 'center',
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 横スクロール部分をHorizontalScrollerでまとめる */}
      <HorizontalScroller isMobile={isMobile}>
        <StatusLegend isMobile={isMobile} />
      </HorizontalScroller>
      <Box sx={{ textAlign: isMobile ? 'center' : undefined }}>
        <DashboardTitle />
      </Box>
      {/* 合計バーを表示 */}
      <RaceTotalStatusBar
        totalParticipants={totalParticipants}
        totalStatusList={totalStatusList}
        />
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
