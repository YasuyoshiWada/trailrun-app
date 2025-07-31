import React, { useState }from "react";
import StatusLegend from "../../components/StatusLegend";
import { Box } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { useParams } from "react-router-dom";
import { allRunners } from "../../data/all_Runners";
import { countStatusByCategory } from "../../utils/aggregateRaceData";
import { RunnersData } from "../../data/runnersTypes"
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceEntryTableDesktop from "../../components/RaceEntryTableDesktop";
import RaceEntryTableMobile from "../../components/RaceEntryTableMobile";
import SearchBar from "../../components/SearchBar";
import RunnerStatusPopupDialog from "../../components/button_popup/RunnerStatusPopupDialog";
import { palette } from "../../styles/palette";
//ステータスバーのlabelにmatchした色を渡す関数mapStatusWithColorのimport
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
import RunnerTimeDetailPopup from "../../components/button_popup/RunnerTimeDetailPopup";
import RunnerTimeDetailMobilePopup from "../../components/button_popup/RunnerTimeDetailMobilePopup";
import SortSearch from "../../components/SortSearch";



//昇順、降順のタイプ
type SortType = "rankAsc" | "rankDesc" | "numAsc" | "numDesc";


const CategoryRacePage:React.FC =() => {
  //URLパラメータを取得
  const { categoryName } =useParams<{categoryName: string}>();
//DNS,DNF,DQ popupのopen
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"DNS" | "DNF" | "DQ">("DNS");
  //Time詳細popup open
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  //MobileのTime詳細popup open
  const [timeMobileDialogOpen, setTimeMobileDialogOpen] = useState(false);

  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  //カテゴリの選手データ取得
  const runners = allRunners.filter(r => r.category === categoryName);
  const categoryStatus = countStatusByCategory(allRunners).find(data => data.categoryName === categoryName);

  const [runnersState, setRunners] = useState<RunnersData[]>(runners);

  //RaceEntryTableにタイムと最終到達時刻を切り替えるイベントを渡す
  const [showElapsed, setShowElapsed] = useState(false);

  //検索ワード
  const [searchText, setSearchText] = useState("");
  //昇順、降順
  const[sortType, setSortType] = useState<SortType>("rankAsc");

//順位、ゼッケン、名前、カテゴリの検索ロジック
const filteredRunners = runners.filter(r => {
  const keyword = searchText.toLowerCase();
  const category = (r.category || "").toLowerCase();

  return (
    String(r.rank).includes(keyword) ||
    String(r.raceNumber).includes(keyword) ||
    r.name.toLowerCase().includes(keyword) ||
    category.includes(keyword)
  );
});

//昇順、降順検索
const sortedRunners = React.useMemo(() => {
  const copied = [...filteredRunners];
  switch (sortType) {
    case "rankAsc":
      return copied.sort((a, b) => a.rank - b.rank);
    case "rankDesc":
      return copied.sort((a, b) => b.rank - a.rank);
    case "numAsc":
      return copied.sort((a, b) => a.raceNumber - b.raceNumber);
    case "numDesc":
      return copied.sort((a, b) => b.raceNumber - a.raceNumber);
    default:
    return copied;
  }
}, [filteredRunners, sortType]);

  //runner取得
  const selectedRunner = runners.find(r => r.id === selectedRunnerId);

// ボタンクリック時どのpopupを開くかクリックするボタンの場所と連動させる。
  const handleDnsClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setDialogType("DNS");
    setDialogOpen(true);
  };

  const handleDnfClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setDialogType("DNF");
    setDialogOpen(true);
  };

  const handleDqClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setDialogType("DQ");
    setDialogOpen(true);
  };
  //TimeDetailPopup
  const handleTimeDetailClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setTimeDialogOpen(true);
  }
  //TimeMobileDetailPopup
  const handleTimeMobileDetailClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setTimeMobileDialogOpen(true);
  }


//ダイアログ「はい」押下時のstate更新
const handleConfirm = (reason: string) => {
  if (selectedRunnerId ! == null) {
    setRunners(prev =>
      prev.map(r => {
        if (r.id == selectedRunnerId) return r;
        if (dialogType === "DNS") return { ...r, dns: true, dnsContent: reason};
        if (dialogType === "DNF") return { ...r, dnf: true, dnsContent: reason};
        if (dialogType === "DQ") return { ...r, dq: true, dnsContent: reason};
        return r;
      })
      );
      setDialogOpen(false);
      setSelectedRunnerId(null);
  }
};

//ダイアログ「キャンセル」Dns,Dnf,Dq
const handleDialogCancel = () => {
  setDialogOpen(false);
  setSelectedRunnerId(null);
};
//ダイアログ「キャンセル」Time
const handleTimeDialogCancel = () => {
  setTimeDialogOpen(false);
  setSelectedRunnerId(null);
}
//ダイアログ「キャンセル」TimeMobile
const handleTimeMobileDialogCancel = () => {
  setTimeMobileDialogOpen(false);
  setSelectedRunnerId(null);
}

const dialogProps = {
  DNS: {
    reasonLabel: "DNS要因",
    confirmColor: palette.orange,
    cancelColor: palette.orange,
  },
  DNF: {
    reasonLabel: "DNF要因",
    confirmColor: palette.mustardYellow,
    cancelColor: palette.mustardYellow,
  },
  DQ: {
    reasonLabel: "DQ要因",
    confirmColor: palette.coralRed,
    cancelColor: palette.coralRed,
  },
}[dialogType];

  const {isSmallMobile, isMobile} = useResponsive();
  //6km男子の定数での定義
  const responsive = {isSmallMobile, isMobile}

  //tableの高さをmobileとそれ以上で分岐している。それによりテーブル内のスクロールで全ての選手が表示される。
  const boxHeight = isSmallMobile || isMobile
  ? 'calc(100vh - 36rem)'
  : 'calc(100vh - 26rem)';
  return(
      <Box
      sx={{
      mt: (isSmallMobile || isMobile) ? "1.5rem" : undefined,
      }}>
        <Box>
              <HorizontalScroller
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              >
                <StatusLegend
                isSmallMobile={isSmallMobile}
                isMobile={isMobile}
                />
              </HorizontalScroller>
              {/* ここはバックエンドからAPIを取得し、データを表示させる部分 */}
              <Box
              sx={{
                ml: (isSmallMobile || isMobile) ? "2rem" : undefined,
              }}>
                {categoryStatus&& (
                <RaceCategoryStatusBar
                  categoryName={categoryStatus.categoryName}
                  totalParticipants={categoryStatus.totalParticipants}
                  statusList={mapStatusWithColor(categoryStatus.statusList)}
                  responsive={responsive}
                />
                )}
              </Box>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
                <SortSearch sortType={sortType} onChange={setSortType}/>
                <SearchBar value={searchText} onChange={e => setSearchText(e.target.value)}

                />
              </Box>

        </Box>
        {/* mobileとタブレット以上で,tableにとる高さを変更している（header要素がmobileと違うため） */}
        <Box
        sx={{
          maxHeight: boxHeight,//tableの高さをmobileとそれ以上で分岐している。それによりテーブル内のスクロールで全ての選手が表示される。
          overflowY: 'auto',
          mt: '1.4rem',
        }}
      >
          {/* Dns,Dnf,Dq,TimeのボタンがRaceEntryTableでクリックされた時に渡ってくる値で開くdialogを決定している。onDnsClickなどが渡ってくる。それに対応したhandleDnsClick関数が反応して指定したpopupが開く仕組み */}
          {isSmallMobile || isMobile ? (
            <RaceEntryTableMobile
            runners={sortedRunners}
            onTimeMobileDetailClick={handleTimeMobileDetailClick}
            />
          ) : (
          <RaceEntryTableDesktop
            runners={sortedRunners}
            onDnsClick={handleDnsClick}
            onDnfClick={handleDnfClick}
            onDqClick={handleDqClick}
            onTimeDetailClick={handleTimeDetailClick}
          />
          )}
          {/* DNS,DNF,DQダイアログ表示 */}
        <RunnerStatusPopupDialog
        open={dialogOpen}
        runner={selectedRunner}
        type={dialogType}
        reasonLabel={dialogProps.reasonLabel}
        onConfirm={handleConfirm}
        onCancel={handleDialogCancel}
        onExited={() => setSelectedRunnerId(null)}
        confirmColor={dialogProps.confirmColor}
        cancelColor={dialogProps.cancelColor}
        />
        <RunnerTimeDetailPopup
        open={timeDialogOpen}
        runner={selectedRunner}
        onCancel={handleTimeDialogCancel}
        />
        <RunnerTimeDetailMobilePopup
        open={timeMobileDialogOpen}
        runner={selectedRunner}
        onDnsClick={handleDnsClick}
        onDnfClick={handleDnfClick}
        onDqClick={handleDqClick}
        onCancel={handleTimeMobileDialogCancel}
        />
        </Box>
      </Box>
    )
  }

export default CategoryRacePage;
