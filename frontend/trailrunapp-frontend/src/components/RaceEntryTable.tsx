import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { palette } from "../styles/palette";
import { RunnersData } from "../data/dummyRunners";
import DNSButton from "./button/DnsButton";
import DNFButton from "./button/DnfButton";
import DQButton from "./button/DqButton";


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
};
// 見出しだけのテーブル
const RaceEntryTable: React.FC<Props> = ({ runners, onDnsClick }) => (
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
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.lastArrival}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.raceNumber}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.name}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.category}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}>{runner.startTime}</TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DNSButton
            value={runner.dns}
            onClick={() => onDnsClick(runner.id)}
            />
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DNFButton
            value={runner.dnf}
            onClick={() => onDnsClick(runner.id)}//ここはCategoryRacePageでDnfClickを実装したら変更
            />
            </TableCell>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}><DQButton
            value={runner.dq}
            onClick={() => onDnsClick(runner.id)}//ここはCategoryRacePageでDqClickを実装したら変更
            />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default RaceEntryTable;
