import React, { useState } from "react";
import { Box,Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { RunnersData } from "../data/dummyRunners";
import { palette, statusColorMap } from "../styles/palette";
import { getLastArrivalDisplay } from "../utils/getLastArrivalDisplay";
import ToggleElapsedButton from "./button/ToggleElapsedButton";
import { getElapsed } from "../utils/getElapsed";
import TimeDetailButton from "./button/TimeDetailButton";

type Props = {
  runners: RunnersData[];
  onTimeMobileDetailClick: (id: number) => void;
};

const  TableHeaderSx = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  borderTop: `1px solid ${palette.gray}`,
  borderBottom: `1px solid ${palette.gray}`,
  textAlign: "center",
  pr:"0.8rem",
  py: "0.4rem"
};

const TableRowSx = {
  fontSize: "1.6rem",
  borderTop: `1px solid ${palette.gray}`,
  borderBottom: `1px solid ${palette.gray}`,
  "&:last-child td": {
    borderBottom: `1px solid ${palette.gray} !important`,
  },
}

const TableCellSx = {
  borderLeft: `1px solid ${palette.gray}`,
  borderRight: `1px solid ${palette.gray}`,
  textAlign: 'center',
};

const RaceEntryTableMobile: React.FC<Props> = ({runners,onTimeMobileDetailClick}) => {
  const[showElapsed, setShowElapsed] = useState(false);
  return (
    <Box
    sx={{
      display: "flex",
    }}>
      <Table>
        <TableHead
        sx={{
          position: "sticky",
          top:0,
          zIndex: 9,
          backgroundColor: '#fff',
        }}
        >
          <TableRow>
              <TableCell sx={{...TableHeaderSx,...TableCellSx}}>順位</TableCell>
              <TableCell
              sx={{ ...TableHeaderSx,

              }}>
              <Box
              sx={{
                pt: 0
              }}>
                  <ToggleElapsedButton
                  showElapsed={showElapsed}
                  onToggle={() => setShowElapsed(prev => !prev)}
                  />
              </Box>
              <Box sx={{
                minWidth: "11rem",
                alignItems: "center",
                justifyContent: "center",
                pb: "0.6rem"
              }}>
                  {showElapsed ? "タイム" : "最終到達時刻"}
              </Box>
            </TableCell>
            <TableCell sx={{...TableHeaderSx,...TableCellSx}}>ゼッケン</TableCell>
            <TableCell sx={{...TableHeaderSx,...TableCellSx}}>名前</TableCell>
            <TableCell sx={{...TableHeaderSx,...TableCellSx}}>詳細</TableCell>
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
              ? `${getElapsed(runner, lastTime)}`//地点を同時に表示したければ、ここにlastPlaceを記述
              : "-";
            } else {
              display = getLastArrivalDisplay(runner);//最終到達地点のタイムを出す外部関数
            }
            return (
              <TableRow key={runner.id}>
                  <TableCell sx={{...TableRowSx,...TableCellSx}}>{runner.rank}</TableCell>
                  <TableCell
                  sx={{...TableRowSx,...TableCellSx,
                  color: statusColorMap[lastPlace] || palette.darkGray,
                  fontWeight: "bold"
                  }}>
                    {display}
                    <Box
                    sx={{

                    }}>
                      {lastPlace}
                    </Box>
                  </TableCell>
                  <TableCell sx={{...TableRowSx,...TableCellSx}}>{runner.raceNumber}</TableCell>
                  <TableCell sx={{...TableRowSx,...TableCellSx}}>{runner.name}</TableCell>
                  <TableCell sx={{...TableRowSx,...TableCellSx}}><TimeDetailButton  onClick={ () => onTimeMobileDetailClick(runner.id)}
                  />
                  </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>

  )
}


export default RaceEntryTableMobile;
