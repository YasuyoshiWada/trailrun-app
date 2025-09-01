import React from "react";
import { Box } from "@mui/material";
import { palette } from "../../styles/palette";
import AuthForm from "./components/AuthForm";
import EventName from "./components/EventName";
import useResponsive from "../../hooks/useResponsive";


const AdminLogin: React.FC = () => {
  const { isSmallMobile,isMobile } = useResponsive();
  return (
    <Box
    sx={{
      minHeight: "100vh",
      background: palette.cyan,
      display: "flex",
      alignItems: "center",
      justifyContent:"center",
    }}>
      <Box
      sx={{
        width: 750,
        maxWidth: (isSmallMobile || isMobile) ? "70vw" : "92vw",
        maxHeight: (isSmallMobile || isMobile) ? "85vh" : "92vh",
        height:700,
        justifyContent: "center",
        alignItems: "center",
        m:"auto",
        border: 1,
        borderColor: palette.textPrimary,
        borderRadius:3,
        boxShadow: 3,
        background: palette.white
      }}>
        {/* eventNameには大会ごとの名前が入る */}
        <EventName
        eventName={"eventName"}/>
        <AuthForm
        role={"admin"} />
      </Box>
    </Box>
  )
}

export default AdminLogin;
