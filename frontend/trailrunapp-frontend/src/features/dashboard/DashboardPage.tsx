import React from "react";
import { Box } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
import { allRunners } from "../../data/all_Runners";
import { countStatusByCategory,  getTotalStatusList} from "../../utils/aggregateRaceData";
import { Link } from "react-router-dom";
import { useRunnersData } from "../../hooks/useRunnersData";
import { RefreshButton } from "../../components/button/RefreshButton";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
   //地点クリック時のURLパラメータを取得
  const { label } = useParams();
   //AppRoutesの遷移ロジックにnavigateするための定数
  const navigate = useNavigate();

  const {isSmallMobile,isMobile} = useResponsive();
  //リフレッシュボタン用ダミーデータ
  const { data, loading, refresh } = useRunnersData();

const raceCategoryData = countStatusByCategory(allRunners);
const totalStatusList = getTotalStatusList(raceCategoryData);
const totalParticipants = raceCategoryData.reduce((sum, cat) => sum + cat.totalParticipants, 0);
const responsive = {isSmallMobile, isMobile}

  return (
    <Box
      sx={{
        ml: (isSmallMobile || isMobile) ? "2rem" : "2rem",
        mt:"1.5rem",
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        overflow: "auto",//overflowでカテゴリが増えてページに収まらない時に縦スクロールできるようにしている。
        boxSizing: "border-box",
      }}
    >
      <Box
      sx={{
        width: "100%",
      }}
      >
       {/* 横スクロール部分をHorizontalScrollerでまとめる */}
        <HorizontalScroller
        isSmallMobile={isSmallMobile}
        isMobile={isMobile}
        >
          <StatusLegend
          isSmallMobile={isSmallMobile}
          isMobile={isMobile}
          onStatusClick={label => navigate(`/total_category/status/${label}`)}
          selectedStatus={label}
          />
        </HorizontalScroller>
        <Box
        sx={{
          mb: (isSmallMobile || isMobile) ? '1rem' : '3rem',
          textAlign: (isSmallMobile || isMobile)? 'center' : undefined,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem"
          }}
          >
          <RefreshButton
          onClick={refresh}
          loading={loading}
          />
          <DashboardTitle />

        </Box>
        {/* 合計バーを表示 */}
        <Link to="/total_category"
        style={{textDecoration: "none"}}
        >
          <RaceTotalStatusBar
            totalParticipants={totalParticipants}
            totalStatusList={mapStatusWithColor(totalStatusList)}
            responsive={responsive}
            />
          </Link>
        {/* レースステータスバーの表示 */}
        {raceCategoryData.map((data) => (
          <Link to={`/category/${encodeURIComponent(data.categoryName)}`}
          key={data.categoryName}
          style={{textDecoration: "none", background: "red"}}
          >
            <RaceCategoryStatusBar
              key={data.categoryName}
              categoryName={data.categoryName}
              totalParticipants={data.totalParticipants}
              statusList={mapStatusWithColor(data.statusList)}
              responsive={responsive}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPage;
