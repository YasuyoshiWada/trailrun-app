import React, { useState }from "react";
import StatusLegend from "../../components/StatusLegend";
import { Box } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { dummyRaceData } from "../../data/dummyRaceData";
import { RunnersData, dummyRunners } from "../../data/dummyRunners";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceEntryTable from "../../components/RaceEntryTable";
import SearchBar from "../../components/SearchBar";
import RunnerStatusPopupDialog from "../../components/button_popup/RunnerStatusPopupDialog";
import { palette } from "../../styles/palette";
//ステータスバーのlabelにmatchした色を渡す関数mapStatusWithColorのimport
import { mapStatusWithColor } from "../../utils/mapStatusWithColor";
import RunnerTimeDetailPopup from "../../components/button_popup/RunnerTimeDetailPopup";
import { getLastArrivalDisplay } from "../../utils/getLastArrivalDisplay";
import SortSearch from "../../components/SortSearch";

//昇順、降順のタイプ
type SortType = "rankAsc" | "rankDesc" | "numAsc" | "numDesc";


const CategoryRacePage:React.FC =() => {
//DNS,DNF,DQ popupのopen
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"DNS" | "DNF" | "DQ">("DNS");
  //Time詳細popup open
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);

  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  const [runners, setRunners] = useState<RunnersData[]>(dummyRunners);

  //検索ワード
  const [searchText, setSearchText] = useState("");
  //昇順、降順
  const[sortType, setSortType] = useState<SortType>("rankAsc");

  //曖昧検索でのfilterをかけている部分
const filteredRunners = runners.filter(r => {
  //最終到達の検索用の定数
  const lastArrivalDisplay = getLastArrivalDisplay(r);
  return Object.values(r).some(val =>
    String(val).toLowerCase().includes(searchText.toLowerCase())
    ) ||
      lastArrivalDisplay.toLowerCase().includes(searchText.toLowerCase());
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

  const isMobile = useResponsive();
  //6km男子の定数での定義
  const sixKmMaleData = dummyRaceData.find(
    (data) => data.categoryName === "6Km 男子"
  );

  return(
<Box>
  <Box
  sx={{
    ml: isMobile ? 0: 2,
    mt: isMobile ? 2: 0,
  }}>
        <HorizontalScroller isMobile={isMobile}>
          <StatusLegend isMobile={isMobile} />
        </HorizontalScroller>
        {/* ここはバックエンドからAPIを取得し、データを表示させる部分 */}
        {sixKmMaleData&& (
        <RaceCategoryStatusBar
          categoryName={sixKmMaleData.categoryName}
          totalParticipants={sixKmMaleData.totalParticipants}
          statusList={mapStatusWithColor(sixKmMaleData.statusList)}
        />
        )}
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
  <Box
  sx={{
    maxHeight: 'calc(100vh - 16rem)', overflowY: 'auto'
  }}>
    {/* Dns,Dnf,Dq,TimeのボタンがRaceEntryTableでクリックされた時に渡ってくる値で開くdialogを決定している。onDnsClickなどが渡ってくる。それに対応したhandleDnsClick関数が反応して指定したpopupが開く仕組み */}
    <RaceEntryTable
      runners={sortedRunners}
      onDnsClick={handleDnsClick}
      onDnfClick={handleDnfClick}
      onDqClick={handleDqClick}
      onTimeDetailClick={handleTimeDetailClick}
    />
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
  </Box>
</Box>
  )
}
export default CategoryRacePage;
