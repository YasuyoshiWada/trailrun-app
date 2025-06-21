import React from "react";
import StatusLegend from "../../components/StatusLegend";
import { Box } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { dummyRaceData } from "../../data/dummyRaceData";
import RaceCategoryStatusBar from "../dashboard/components/RaceCategoryStatusBar";
import RaceEntryTable from "../../components/RaceEntryTable";


const CategoryRacePage:React.FC =() => {
  const isMobile = useResponsive();
  const sixKmMaleData = dummyRaceData.find(
    (data) => data.categoryName === "6Km 男子"
  );

  return(
<>
<Box
    sx={{
      ml: isMobile ? 0: 4,
      mt: isMobile ? 2: 4,
      justifyContent:'center',
      width:"100%",
      boxSizing: "border-box",
    }}
    >
      <HorizontalScroller isMobile={isMobile}>
        <StatusLegend isMobile={isMobile} />
      </HorizontalScroller>
      {/* ここはバックエンドからAPIを取得し、データを表示させる部分 */}
      {sixKmMaleData&& (
        <RaceCategoryStatusBar
          categoryName={sixKmMaleData.categoryName}
          totalParticipants={sixKmMaleData.totalParticipants}
          statusList={sixKmMaleData.statusList}
          />
      )}
    </Box>
    <RaceEntryTable />
</>

  )
}
export default CategoryRacePage;
