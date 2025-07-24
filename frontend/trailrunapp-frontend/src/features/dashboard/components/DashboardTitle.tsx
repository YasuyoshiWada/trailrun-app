import React from "react";
import { Box } from '@mui/material';


const DashboardTitle:React.FC= () => {

  return(
  <>
    <Box
    sx={{
      fontSize: '3.2rem',
      fontWeight: 'bold',
    }}
  >
    レース進行状況
    </Box>
  </>

  )
}

export default DashboardTitle;
