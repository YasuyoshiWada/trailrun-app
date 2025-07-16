import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { RunnersData } from "../data/dummyRunners";
import DNSButton from "./button/DnsButton";
import DNFButton from "./button/DnfButton";
import DQButton from "./button/DqButton";
import TimeDetailButton from "./button/TimeDetailButton";
import { palette, statusColorMap } from "../styles/palette";


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

//最終到達の時間と場所
export const getLastArrivalDisplay = (runner: RunnersData) => {
  if (!runner.arrivals.length) return "";
  const last = runner.arrivals[runner.arrivals.length -1];
  return `${last.time} (${last.place})`;
}

//RunnersDataからスタートを取得する関数
const getSartTime = (runner:RunnersData) => {
  const startArrival = runner.arrivals.find(a => a.place === "スタート");
  return startArrival ? startArrival.time : "-";
}


// 見出しだけのテーブル
const RaceEntryTable: React.FC<Props> = ({ runners, onDnsClick, onDnfClick, onDqClick, onTimeDetailClick }) => (
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
          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>最終到達</TableCell>
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
        {runners.map(runner => (
          <TableRow
          key={runner.id}>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.rank}</TableCell>
            <TableCell sx={{
              ...TableRowSx,
              ...TableCellSx,
              //最終到達の色の定義はpaletteでしていて、ダミーデータのlastArrivalPlaceと同じ値が見つかった場合に色を適用している仕様。
              color:statusColorMap[
                runner.arrivals.length
                ? runner.arrivals[runner.arrivals.length -1].place
                :""
              ] || palette.darkGray
              }}
              >
              {getLastArrivalDisplay(runner)}
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.raceNumber}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.name}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.category}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{getSartTime(runner)}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default RaceEntryTable;
