import React from "react";
import { Box, Typography } from "@mui/material";
import { palette } from "../../../styles/palette";
import useResponsive from "../../../hooks/useResponsive";

type Props = {
  eventName?: string;
}

const EventName:React.FC<Props> = ({eventName}) => {
  const {isSmallMobile, isMobile } = useResponsive();
  const appTitle = "みなみえるステータス";
  return (
    <>
      <Box
      sx={{
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
        gap: (isSmallMobile || isMobile) ? "3rem" :"3rem",
        width: "100%",
        maxWidth: "40rem",
        mx:"auto",
        mt:"5rem",
        mb: "1.5rem",
      }}>
        <Typography
        sx={{
          fontSize:(isSmallMobile || isMobile) ? "2.6rem" : "3.5rem",
          color: palette.textPrimary,
          fontWeight: "bold"
        }}>{appTitle}</Typography>
        <Typography
        sx={{
          fontSize: "3rem",
          color: palette.navyBlue,
          fontWeight: "bold"
        }}>{eventName ?? "大会名を読み込み中"}</Typography>
      </Box>
    </>
  )
}

export default EventName;
