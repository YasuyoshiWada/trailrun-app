import React, {useState} from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { RunnersData } from "../data/dummyRunners";
import DNSButton from "./button/DnsButton";
import DNFButton from "./button/DnfButton";
import DQButton from "./button/DqButton";
import TimeDetailButton from "./button/TimeDetailButton";
import { palette, statusColorMap } from "../styles/palette";
import { getElapsed } from "../utils/getElapsed";
import { getLastArrivalDisplay } from "../utils/getLastArrivalDisplay";
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import IconButton from "@mui/material/IconButton";


const  TableHeaderSx = {
  fontSize: '2rem',
  fontWeight: 'bold',
  borderTop: `1px solid ${palette.lightGray}`,
  borderBottom: `1px solid ${palette.lightGray}`,
};
const TableRowSx = {
  fontSize: '2rem',
  borderTop: `1px solid ${palette.lightGray}`,
  borderBottom: `1px solid ${palette.lightGray}`,
}
const TableCellSx = {
  borderLeft: `1px solid ${palette.lightGray}`,
  borderRight: `1px solid ${palette.lightGray}`,
  textAlign: 'center',
};

type Props = {
  runners: RunnersData[];
  onDnsClick: (id: number) => void;
  onDnfClick: (id: number) => void;
  onDqClick: (id: number) => void;
  onTimeDetailClick: (id: number) => void;
};

//RunnersDataからスタートを取得する関数
const getStartTime = (runner:RunnersData) => {
  const startArrival = runner.arrivals.find(a => a.place === "スタート");
  return startArrival ? startArrival.time : "-";
}

// 見出しだけのテーブル
const RaceEntryTable: React.FC<Props> = ({ runners, onDnsClick, onDnfClick, onDqClick, onTimeDetailClick }) => {
  const [ showElapsed, setShowElapsed ] = useState(false);

return (
  <Box
  sx={{ mt: 2, mb: 4,
  }}>
    <Table>
      <TableHead
      sx={{
        position: "sticky",
        top:"0rem",
        zIndex: 9,
        backgroundColor: '#fff',
      }}>
        <TableRow>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>順位</TableCell>
          <TableCell
          sx={{ ...TableHeaderSx, ...TableCellSx}}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap:"2.5rem"
            }}>
            {showElapsed ? "タイム" : "最終到達時刻"}
            <IconButton
            aria-label="toggle"
            onClick={() => setShowElapsed( prev =>!prev)}
            >
            {showElapsed  ? (
            <ToggleOnTwoToneIcon
            sx={{
              fontSize:"2.4rem",
              color:  palette.limeGreen,
            }} />
            ) : (
            <ToggleOffTwoToneIcon
            sx={{
              fontSize:"2.4rem",
              color: palette.darkGray,
            }}
            />
            )}
            </IconButton>
            </Box>
          </TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>ゼッケン</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>名前</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>カテゴリ</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>スタート時刻</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>DNS</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>DNF</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>DQ</TableCell>
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>詳細</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {runners.map(runner => {
          // 最後の地点を取得する
          const last = runner.arrivals[runner.arrivals.length -1];

          //lastやlast.placeがない場合も考慮
          const lastPlace = last?.place ?? "";
          const lastTime = last?.time;

          // 表示内容の切り替え
          let display;
          if (showElapsed) {
            display = (lastTime)
            ? `${getElapsed(runner, lastTime)} (${lastPlace})`
            : "-";
          } else {
            display = getLastArrivalDisplay(runner);
          }

          return (
          <TableRow
          key={runner.id}>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.rank}</TableCell>
            <TableCell sx={{
              ...TableRowSx,
              ...TableCellSx,
              //最終到達の色の定義はpaletteでしていて、ダミーデータのlastArrivalPlaceと同じ値が見つかった場合に色を適用している仕様。
              color:statusColorMap[
                runner.arrivals.length
                ? last.place
                :""
              ] || palette.darkGray
              }}
              >
              {display}
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.raceNumber}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.name}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.category}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{getStartTime(runner)}</TableCell>
            {/* onClick時にDns,Dnf,Dq,Timeそれぞれ渡す値を変えてそれぞれに対応したpopupを開くロジックになっている.
            onDnsClick{runner.id}でクリックした選手のデータのpopup(Dns,Dnf,Dq,Timeなどの)が開く仕組み */}
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DNSButton
            value={runner.dns}
            onClick={() => onDnsClick(runner.id)}
            />
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DNFButton
            value={runner.dnf}
            onClick={() => onDnfClick(runner.id)}
            />
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DQButton
            value={runner.dq}
            onClick={() => onDqClick(runner.id)}
            />
            </TableCell>
            {/* Time詳細ボタン */}
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><TimeDetailButton
            onClick={ () => onTimeDetailClick(runner.id)}
            />
            </TableCell>
          </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </Box>
);
};
export default RaceEntryTable;
