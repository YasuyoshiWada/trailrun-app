import React, { useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusLegend from "../../components/StatusLegend";
import HorizontalScroller from "../../components/HorizontalScroller";
import SearchBar from "../../components/SearchBar";
import SortSearch from "../../components/SortSearch";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import { RefreshButton } from "../../components/button/RefreshButton";
import useResponsive from "../../hooks/useResponsive";
import { useRunnersData } from "../../hooks/useRunnersData";
import { countStatusByCategory, getTotalStatusList } from "../../utils/aggregateRaceData";
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
import { palette } from "../../styles/palette";
import { RunnerTableSection } from "./components/RunnerTableSection";
import { useRunnerDialogs } from "./hooks/useRunnerDialogs";
import { useRunnerFilters } from "./hooks/useRunnerFilters";
import { useRunnerState } from "./hooks/useRunnerState";

type Params = {
  label?: string;
};

const TotalCategoryRacePage: React.FC = () => {
  const { label } = useParams<Params>();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useRunnersData();

  const handleRefresh = useCallback(() => {
    void refresh();
  }, [refresh]);

  const raceCategoryData = useMemo(
    () => (data.length > 0 ? countStatusByCategory(data) : []),
    [data],
  );

  const totalStatusList = useMemo(
    () => getTotalStatusList(raceCategoryData),
    [raceCategoryData],
  );

  const totalParticipants = useMemo(
    () => raceCategoryData.reduce((sum, cat) => sum + cat.totalParticipants, 0),
    [raceCategoryData],
  );

  const { runnersState, setRunnersState } = useRunnerState(data);

  const {
    searchText,
    setSearchText,
    sortType,
    setSortType,
    sortedRunners,
  } = useRunnerFilters(runnersState, label);

  const dialog = useRunnerDialogs(runnersState, setRunnersState);

  const { isSmallMobile, isMobile } = useResponsive();
  const responsive = { isSmallMobile, isMobile };

  const boxHeight = isSmallMobile || isMobile
    ? "calc(100vh - 36rem)"
    : "calc(100vh - 26rem)";

  const isInitialLoading = loading && data.length === 0;

  if (isInitialLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          px: "2rem",
        }}
      >
        <Typography component="p" variant="body1">
          ランナーデータを読み込み中です...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: isSmallMobile || isMobile ? "1.5rem" : undefined,
      }}
    >
      <Box>
        <HorizontalScroller isSmallMobile={isSmallMobile} isMobile={isMobile}>
          <StatusLegend
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            onStatusClick={statusLabel => navigate(`/total_category/status/${statusLabel}`)}
            selectedStatus={label}
          />
        </HorizontalScroller>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <RefreshButton onClick={handleRefresh} loading={loading} />
          {error ? (
            <Typography component="p" sx={{ fontSize: "1.2rem", color: palette.coralRed }}>
              データの取得に失敗したためバックアップデータを表示しています。
            </Typography>
          ) : null}
          <Link to="/total_category" style={{ textDecoration: "none" }}>
            <RaceTotalStatusBar
              totalParticipants={totalParticipants}
              totalStatusList={mapStatusWithColor(totalStatusList)}
              responsive={responsive}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SortSearch sortType={sortType} onChange={type => setSortType(type)} />
          <SearchBar value={searchText} onChange={event => setSearchText(event.target.value)} />
        </Box>
      </Box>

      <RunnerTableSection
        runners={sortedRunners}
        allRunners={runnersState}
        responsive={responsive}
        boxHeight={boxHeight}
        dialog={dialog}
      />
    </Box>
  );
};

export default TotalCategoryRacePage;
