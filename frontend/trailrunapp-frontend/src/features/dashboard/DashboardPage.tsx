import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography }from '@mui/material';
import RaceCategoryStatusBar from "./RaceCategoryStatusBar";
import DashboardTitle from "./DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import { dummyRaceData } from "../../data/dummyRaceData";

const Dashboard: React.FC = () => {
  return (
    <Box
    sx={{
        ml: 6,
    }}>
      <DashboardTitle />
      <StatusLegend />
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
