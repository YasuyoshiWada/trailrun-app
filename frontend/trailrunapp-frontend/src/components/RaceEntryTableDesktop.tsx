import React, {useState} from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { RunnersData } from "../data/runnersTypes";
import DNSButton from "./button/DnsButton";
import DNFButton from "./button/DnfButton";
import DQButton from "./button/DqButton";
import TimeDetailButton from "./button/TimeDetailButton";
import { palette, statusColorMap } from "../styles/palette";
import { getElapsed } from "../utils/getElapsed";
import { getLastArrivalDisplay, getLastPlaceDisplay } from "../utils/getLastArrivalDisplay";
import ToggleElapsedButton from "./button/ToggleElapsedButton";


const  TableHeaderSx = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  borderTop: `1px solid ${palette.gray}`,
  borderBottom: `1px solid ${palette.gray}`,
};
const TableRowSx = {
  fontSize: '1.6rem',
  borderTop: `1px solid ${palette.gray}`,
  borderBottom: `1px solid ${palette.gray}`,
  "&:last-child td": {
    borderBottom: `1px solid ${palette.gray} !important`,
  },
};
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

//RunnersDataからスタートの受信機をタッチした時間を取得する関数
const getStartTime = (runner:RunnersData) => {
  const startArrival = runner.arrivals.find(a => a.place === "スタート");
  return startArrival ? startArrival.time : "-";
}

// 見出しだけのテーブル
const RaceEntryTableDesktop: React.FC<Props> = ({ runners, onDnsClick, onDnfClick, onDqClick, onTimeDetailClick }) => {
  const [ showElapsed, setShowElapsed ] = useState(false);

return (
  <Box
  sx={{
    // mb: "9rem",
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
          <TableCell sx={{ ...TableHeaderSx}}>
              <ToggleElapsedButton
              showElapsed={showElapsed}
              onToggle={() => setShowElapsed(prev => !prev)}
              />
          </TableCell>
          <TableCell
          sx={{ ...TableHeaderSx,
            p: 0,
          }}>
          <Box sx={{
            minWidth: "13rem",
            display: showElapsed ? "inline-block" : "flex",
            transform: showElapsed ? "translateX(2rem)" : "none",
            alignItems: "center",
            justifyContent: "center",
          }}>
              {showElapsed ? "タイム" : "最終到達時刻"}
          </Box>
        </TableCell>

          <TableCell sx={{ ...TableHeaderSx, ...TableCellSx}}>最終到達地点</TableCell>
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
          if(!last) {
            return null;
          }

          //lastやlast.placeがない場合も考慮
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
          <TableRow
          key={runner.id}>
            <TableCell sx={{ ...TableRowSx, ...TableCellSx}}></TableCell>
            <TableCell
            colSpan={2}
            sx={{
              ...TableRowSx,
              ...TableCellSx,
              //最終到達の色の定義はpaletteでしていて、ダミーデータのlastArrivalPlaceの値とstatusColorMapの値が一致した時にstatusColorMap内の色が反映される仕組み
              color:statusColorMap[
                runner.arrivals.length
                ? last.place
                :""
              ] || palette.darkGray
              }}
              >
              {display}
            </TableCell>
            <TableCell
            sx={{
              ...TableRowSx,
              ...TableCellSx,
              color:statusColorMap[
                runner.arrivals.length
                ? last.place
                :""
              ] || palette.darkGray
            }}
              >
                {getLastPlaceDisplay(runner)}</TableCell>
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
export default RaceEntryTableDesktop;
