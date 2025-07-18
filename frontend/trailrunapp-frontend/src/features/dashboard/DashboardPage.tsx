import React from "react";
import { Box } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import {StatusItem, RaceCategoryData, dummyRaceData } from "../../data/dummyRaceData";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { palette, statusColorMap } from "../../styles/palette";

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
//ステータスバーのlabelにmatchした色を渡す関数
export const mapStatusWithColor = (statusList:StatusItem[]) =>
  statusList.map(status => ({
    ...status,
    color: statusColorMap[status.label] || palette.darkGray,
  }));

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
        height: "100%",
        overflow: "auto",//overflowでカテゴリが増えてページに収まらない時に縦スクロールできるようにしている。
        boxSizing: "border-box",
      }}
    >
      <Box
      sx={{
        // overflowX: isMobile ? "auto" : "visible",
        overflowX: "auto",
        width: "100%",
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
          totalStatusList={mapStatusWithColor(totalStatusList)}
          />
        {/* レースステータスバーの表示 */}
        {dummyRaceData.map((data) => (
          <RaceCategoryStatusBar
            key={data.categoryName}
            categoryName={data.categoryName}
            totalParticipants={data.totalParticipants}
            statusList={mapStatusWithColor(data.statusList)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPage;
