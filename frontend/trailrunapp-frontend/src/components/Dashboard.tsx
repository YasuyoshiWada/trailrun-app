import React from "react";
import {Box, List,ListItem, ListItemButton, ListItemText, Typography }from '@mui/material';
import StatusLegend from "./StatusLegend";

const Dashboard: React.FC = () => {
  return (
    <Box
    sx={{
        ml: 6,
    }}>
      <Box
        sx={{
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        レース進行状況
      </Box>
      <Box>
          <StatusLegend />
      </Box>
    </Box>
  );
};

export default Dashboard;
