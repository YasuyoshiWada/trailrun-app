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
import DnsPopupDialog from "../../components/button_popup/DnsPopupDialog";


const CategoryRacePage:React.FC =() => {
//popupのopen
  const [dnsDialogOpen, setDnsDialogOpen] = useState(false);
  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  const [runners, setRunners] = useState<RunnersData[]>(dummyRunners);

  //検索ワード
  const [searchText, setSearchText] = useState("");

  //曖昧検索でのfilterをかけている部分
const filteredRunners = runners.filter(r =>
  Object.values(r).some(val =>
    String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  //runner取得
  const selectedRunner = runners.find(r => r.id === selectedRunnerId);

// DNS登録のコールバック
  const handleDnsClick = (runnerId: number) => {
    setSelectedRunnerId(runnerId);
    setDnsDialogOpen(true);
  };

//DNS登録「はい」押下時のstate更新
const handleDnsComfirm = () => {
  if (selectedRunnerId ! == null) {
    setRunners(prev =>
      prev.map(r =>
        r.id === selectedRunnerId ? {...r, dns: true} : r
        )
      );
      setDnsDialogOpen(false);
      setSelectedRunnerId(null);
  }
};

//DNS登録 「キャンセル」
const handleDnsCancel = () => {
  setDnsDialogOpen(false);
  setSelectedRunnerId(null);
}

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
    />
    {/* DNSダイアログ表示 */}
  <DnsPopupDialog
  open={dnsDialogOpen}
  runner={selectedRunner}
  onConfirm={handleDnsComfirm}
  onCancel={handleDnsCancel}
  />
  </Box>
</Box>
  )
}
export default CategoryRacePage;
