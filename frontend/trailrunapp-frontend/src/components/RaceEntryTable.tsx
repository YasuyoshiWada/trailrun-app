import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const  TableHeaderSx = {fontSize: '2rem', fontWeight: 'bold'};
// 見出しだけのテーブル
const RaceEntryTable: React.FC = () => (
  <Box sx={{ mt: 2, mb: 4, overflowX: "auto" }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={TableHeaderSx}>順位</TableCell>
          <TableCell sx={TableHeaderSx}>ゼッケン</TableCell>
          <TableCell sx={TableHeaderSx}>名前</TableCell>
          <TableCell sx={TableHeaderSx}>カテゴリ</TableCell>
          <TableCell sx={TableHeaderSx}>最終到達</TableCell>
          <TableCell sx={TableHeaderSx}>DNS</TableCell>
          <TableCell sx={TableHeaderSx}>DNF</TableCell>
          <TableCell sx={TableHeaderSx}>DQ</TableCell>
          <TableCell sx={TableHeaderSx}>スタート時刻</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* ここに選手データをmapで出力していく */}
      </TableBody>
    </Table>
  </Box>
);

export default RaceEntryTable;
