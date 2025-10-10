import React, { useCallback, useMemo } from "react";
import { Box, Typography, useTheme } from '@mui/material';
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceTotalStatusBar from "../../components/RaceTotalStatusBar";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
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

  const theme = useTheme();
  const {isSmallMobile,isMobile} = useResponsive();
  //importとしたhook,useRunnerDataで定義してある、apiから選手情報を取得したりする定数の宣言
  const { data, loading, error, refresh } = useRunnersData();
  const handleRefresh = useCallback(() => {
    void refresh();
  }, [refresh])

const raceCategoryData = useMemo(
  () => (data.length > 0 ? countStatusByCategory(data) : []),
  [data],
);

const totalStatusList = useMemo(
  () => getTotalStatusList(raceCategoryData),
  [raceCategoryData]
);

const totalParticipants = useMemo(
  () => raceCategoryData.reduce((sum, cat) => sum + cat.totalParticipants, 0),
  [raceCategoryData]
);
  const isInitialLoading = loading && data.length === 0;
const responsive = {isSmallMobile, isMobile}

// toolbarHeight関数の狙い
// 第1引数 → 計算する関数（戻り値がキャッシュされる）
// 第2引数 → 依存配列。この配列の要素を前回と Object.is で比較する
// 依存配列の要素に変化がなければ、前回の return 値をそのまま再利用する
// 変化があった場合は関数を再実行して新しい値を返す
const toolbarHeightRem = React.useMemo(() => {
  //ツールバーの高さを反映した余白を作るためのプリセット。
  //例えば <AppBar> + <Toolbar> を使ったとき、ツールバーの高さはデフォルトで モバイル=56px / デスクトップ=64px。
  //画面上部に固定した AppBar の下に余白を作りたいときに、よく使われます
  const toolbar = theme.mixins.toolbar as {
  minHeight?: string | number;
} & Record<string, { minHeight?: string | number }>;

//基本値を取得
let raw = (isSmallMobile || isMobile)
  ? toolbar.minHeight?? 56
  : (toolbar[theme.breakpoints.up('sm')]?.minHeight ?? 64);
//数値ならpxとみなしremに変換
if ( typeof raw === "number") {
  return `${raw / 10}rem`;
}
if ( typeof raw === "string") {
  return `${parseInt(raw,10) / 10}rem`;
}
return raw;
}, [theme, isSmallMobile, isMobile]);//、第2引数の依存配列の中身が前回と同じなら「第1引数の関数を再実行せず、前回の return 結果を再利用する」です。


  const headerOffset = (isSmallMobile || isMobile ? "0.5rem" : "0rem");
  const listSpacing = (isSmallMobile || isMobile ? "2.4rem" : "3.2rem");
  const pagePaddingBottom = (isSmallMobile || isMobile ? "3.2rem" : "2rem");
  const horizontalPadding = (isSmallMobile || isMobile ? "2.6rem" : "3.2rem");
  const statusListMaxHeight = `calc(100vh - ${toolbarHeightRem} - ${headerOffset} - ${listSpacing} - ${pagePaddingBottom})`;

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
          ランナーデータを読み込み中です…
        </Typography>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        pt: `calc(${toolbarHeightRem}`,
        pb: pagePaddingBottom,
        px: horizontalPadding,
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
              mt: (isSmallMobile || isMobile ? "1.6rem" : "2.4rem"),
              textAlign: (isSmallMobile || isMobile)? 'center' : undefined,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: "1.6rem",
              justifyContent:  'flex-start',
              flexWrap: 'wrap',
              rowGap: "1.6rem",
            }}
          >
          <RefreshButton
          onClick={handleRefresh}
          loading={loading}
          />
          {error ? (
            <Typography component="p" color="error" variant="body2">
              データの取得に失敗したためバックアップデータを表示しています。
            </Typography>
          ) : null}
          <DashboardTitle />
        </Box>
      </Box>
        <Box
          sx={{
            mt: listSpacing,
            maxHeight: statusListMaxHeight,
            overflowY: 'auto',
            px: 'auto',
            pb: (isSmallMobile || isMobile ? "4rem" : "2rem"),
          }}
        >
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
