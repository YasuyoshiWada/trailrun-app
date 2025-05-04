import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography }from '@mui/material';
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "./RaceCategoryStatusBar";
import { dummyRaceData } from "../../data/dummyRaceData";

const Dashboard: React.FC = () => {
  return (
    <Box
    sx={{
        ml: 6,
    }}>
      <Box
        sx={{
          fontSize: '3.2rem',
          fontWeight: 'bold',
          mb: '4rem',
        }}
      >
        レース進行状況
      </Box>
      <Box
      sx={{
        mb:4,
      }}
      >
          <StatusLegend />
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
