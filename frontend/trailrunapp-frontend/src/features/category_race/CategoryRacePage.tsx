import React, { useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusLegend from "../../components/StatusLegend";
import HorizontalScroller from "../../components/HorizontalScroller";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import SearchBar from "../../components/SearchBar";
import SortSearch from "../../components/SortSearch";
import { RefreshButton } from "../../components/button/RefreshButton";
import useResponsive from "../../hooks/useResponsive";
import { useRunnersData } from "../../hooks/useRunnersData";
import { countStatusByCategory } from "../../utils/aggregateRaceData";
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
import { palette } from "../../styles/palette";
import { RunnerTableSection } from "./components/RunnerTableSection";
import { useRunnerDialogs } from "./hooks/useRunnerDialogs";
import { useRunnerFilters } from "./hooks/useRunnerFilters";
import { useRunnerState } from "./hooks/useRunnerState";

type Params = {
  categoryName?: string;
  label?: string;
};

const CategoryRacePage: React.FC = () => {
  const { categoryName, label } = useParams<Params>();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useRunnersData();

  const handleRefresh = useCallback(() => {
    void refresh();
  }, [refresh]);

  const runners = useMemo(
    () => (categoryName ? data.filter(r => r.category === categoryName) : []),
    [categoryName, data],
  );

  const categoryStatus = useMemo(() => {
    if (!categoryName || data.length === 0) {
      return undefined;
    }

    return countStatusByCategory(data).find(
      raceData => raceData.categoryName === categoryName,
    );
  }, [categoryName, data]);

  const { runnersState, setRunnersState } = useRunnerState(runners);

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
        }}
      >
        <Typography component="p" variant="body1">
          ランナーデータを読み込み中です....
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
            onStatusClick={statusLabel => navigate(`/category/${categoryName ?? ""}/status/${statusLabel}`)}
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
          <Link
            to={`/category/${encodeURIComponent(categoryStatus?.categoryName ?? "")}`}
            style={{ textDecoration: "none", padding: 0 }}
          >
            {categoryStatus ? (
              <RaceCategoryStatusBar
                categoryName={categoryStatus.categoryName}
                totalParticipants={categoryStatus.totalParticipants}
                statusList={mapStatusWithColor(categoryStatus.statusList)}
                responsive={responsive}
              />
            ) : null}
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

export default CategoryRacePage;
