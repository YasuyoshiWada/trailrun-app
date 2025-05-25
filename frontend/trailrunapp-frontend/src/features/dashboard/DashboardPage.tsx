import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography, useMediaQuery }from '@mui/material';
import RaceCategoryStatusBar from "./components/RaceCategoryStatusBar";
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import { dummyRaceData } from "../../data/dummyRaceData";

//このページに地点表示のmobile対応を書くのが良いのか？
const Dashboard: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
    sx={{
        ml: isMobile ? 0: 6,
        justifyContent:'center',
        width:"100%",
        boxSizing: "border-box",
    }}>
      <DashboardTitle />
      <Box sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
        <Box
        sx={{
          display:'flex',
          flexDirection:'row',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          gap: '2.4rem',
        }}>
          <StatusLegend isMobile={isMobile} />
        </Box>
      </Box>
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

export default Dashboard;
