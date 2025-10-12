import React, { useState } from "react";
import { Box } from "@mui/material";
import { palette } from "../../styles/palette";
import AuthForm from "./components/AuthForm";
import EventName from "./components/EventName";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

type LocationLike = {
  pathname: string;
  search?: string;
  hash?: string;
  state?: unknown;
};

type LocationState = {
  from?: LocationLike;
} & Record<string, unknown>;

const StaffLogin: React.FC = () => {
  const { isSmallMobile, isMobile } = useResponsive();
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = (location.state as LocationState | undefined)?.from;
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "telnumber", string>>
    >({});

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
          role={"staff"}
          onSubmit={(values) => {
            const trimmedName = values.name.trim();
            const trimmedTelnumber = values.telnumber.trim();
            const trimmedGroup = values.group?.trim();

            const nextFieldErrors:
              Partial<Record<"name" | "telnumber", string>>
              = {};

            if (!trimmedName) {
              nextFieldErrors.name = "名前を入力してください。";

            }
            if (!trimmedTelnumber) {
              nextFieldErrors.telnumber = "電話番号を入力してください。";
            }

            if (Object.keys(nextFieldErrors).length > 0) {
              setFieldErrors(nextFieldErrors);
              return;
            }

            login("staff", {
              name: trimmedName,
              telnumber: trimmedTelnumber,
              ...(trimmedGroup ? {group: trimmedGroup } : {}),
            });
            setFieldErrors({});
            const destination =
              fromLocation !== undefined
                ? {
                  pathname: fromLocation.pathname,
                  ...(fromLocation.search ? { search: fromLocation.search } : {}),
                  ...(fromLocation.hash ? { hash: fromLocation.hash } : {}),
                }
                : "/";
            navigate(destination, { replace: true, state: fromLocation?.state });
          }}
          fieldErrors={fieldErrors}
        />
      </Box>
    </Box>
  )
}

export default StaffLogin;
