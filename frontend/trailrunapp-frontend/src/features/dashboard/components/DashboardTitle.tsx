import React from "react";
import { Box, Typography, useMediaQuery } from '@mui/material';
import StatusLegend from "../../../components/StatusLegend";

const DashboardTitle:React.FC = () => {

  return(
  <>
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
  </Box>
  </>

  )
}

export default DashboardTitle;
