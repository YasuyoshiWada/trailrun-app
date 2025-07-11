import React, { useState }from "react";
import StatusLegend from "../../components/StatusLegend";
import { Box } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroller from "../../components/HorizontalScroller";
import { dummyRaceData } from "../../data/dummyRaceData";
import { RunnersData, dummyRunners } from "../../data/dummyRunners";
import RaceCategoryStatusBar from "../../components/RaceCategoryStatusBar";
import RaceEntryTable,{ getLastArrivalDisplay} from "../../components/RaceEntryTable";
import SearchBar from "../../components/SearchBar";
import RunnerStatusPopupDialog from "../../components/button_popup/RunnerStatusPopupDialog";
import { palette } from "../../styles/palette";


const CategoryRacePage:React.FC =() => {
//popupのopen
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"DNS" | "DNF" | "DQ">("DNS");
  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  const [runners, setRunners] = useState<RunnersData[]>(dummyRunners);

  //検索ワード
  const [searchText, setSearchText] = useState("");

  //曖昧検索でのfilterをかけている部分
const filteredRunners = runners.filter(r => {
  //最終到達の検索用の定数
  const lastArrivalDisplay = getLastArrivalDisplay(r);
  return Object.values(r).some(val =>
    String(val).toLowerCase().includes(searchText.toLowerCase())
    ) ||
      lastArrivalDisplay.toLowerCase().includes(searchText.toLowerCase());
});

  //runner取得
  const selectedRunner = runners.find(r => r.id === selectedRunnerId);

// ボタンクリック時
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

//ダイアログ「キャンセル」
const handleDialogCancel = () => {
  setDialogOpen(false);
  setSelectedRunnerId(null);
};

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
          statusList={sixKmMaleData.statusList}
        />
        )}
        <SearchBar value={searchText} onChange={e => setSearchText(e.target.value)} />
  </Box>
  <Box
  sx={{
    maxHeight: 'calc(100vh - 16rem)', overflowY: 'auto'
  }}>
    <RaceEntryTable
      runners={filteredRunners}
      onDnsClick={handleDnsClick}
      onDnfClick={handleDnfClick}
      onDqClick={handleDqClick}
    />
    {/* DNSダイアログ表示 */}
  <RunnerStatusPopupDialog
  open={dialogOpen}
  runner={selectedRunner}
  type={dialogType}
  reasonLabel={dialogProps.reasonLabel}
  onConfirm={handleConfirm}
  onCancel={handleDialogCancel}
  confirmColor={dialogProps.confirmColor}
  cancelColor={dialogProps.cancelColor}
  />
  </Box>
</Box>
  )
}
export default CategoryRacePage;
