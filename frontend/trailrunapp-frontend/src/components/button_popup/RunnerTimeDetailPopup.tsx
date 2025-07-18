import React from "react";
import { RunnersData } from "../../data/dummyRunners";
import { Dialog, DialogContent, DialogActions} from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { palette, statusColorMap } from "../../styles/palette";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

type RunnerTimeDetailPopupProps = {
  open: boolean;
  runner: RunnersData | undefined;
  onCancel: () => void;
};

const  TableHeaderSx = {
  fontSize: '2rem',
  fontWeight: 'bold',
  border: `1px solid ${palette.lightGray}`,
  textAlign: 'center'
};

const TableCellSx = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  border: `1px solid ${palette.lightGray}`,
  textAlign: 'center'
}

// スタートした時間を取得する
const getStartTime = (runner:RunnersData) =>{
  const startPlace = runner.arrivals.find(a => a.place === "スタート");
  return startPlace ? startPlace.time : "-";
}

//スタートからのタイム差を計算する関数
const getElapsed = (runner:RunnersData, arrivalTime: string) => {
  const startTime = getStartTime(runner);
  if(!startTime) return "-";
  //時刻差計算。まずはsplitでstringを時間、分、秒に分割してNumber型に変換
  const [sh, sm, ss] = startTime.split(":").map(Number);
  const [eh, em, es] = arrivalTime.split(":").map(Number);
  //一度全て秒数に換算
  const startSec = sh * 3600 + sm *60 + ss;
  const endSec = eh * 3600 + em * 60 + es;
  if (isNaN(startSec) || isNaN(endSec)) return "-";
  //地点に到達した時間からスタートした時間を引く（差分の秒数を出す）
  const diff = endSec - startSec;
  if(diff < 0) return "-";
  //差分の秒数を今度は文字列にし、時間、分、秒にする。
  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");
  // hour:minutes:secondsの形にしてreturnする。
  return `${h} : ${m} : ${s}`;
  }




const RunnerTimeDetailPopup: React.FC<RunnerTimeDetailPopupProps> = ({
  open,
  runner,
  onCancel,
}) => {

if (!open) return null;

return (
  <Dialog
  open={open}
  onClose={onCancel}
  sx={{

  }}
  >
    <DialogContent
    sx={{
      marginBottom: '1rem',
      position: 'relative'
    }}>
      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position:"absolute",
          right: "1rem",
          top: "1rem",
        }}
      >
        <CloseIcon
        sx={{
          fontSize:"2.6rem",
        }}
        />
      </IconButton>
      <div
      style={{
        fontWeight: "bold",
        fontSize: "2.4rem",
        textAlign: "center",
        marginBottom: "1rem"
      }}>
        {runner?.name}_Time詳細
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{...TableHeaderSx}}>地点</TableCell>
            <TableCell sx={{...TableHeaderSx}}>到達時間</TableCell>
            <TableCell sx={{...TableHeaderSx}}>タイム</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runner?.arrivals.map(a => (
            <TableRow
            key={a.place}
            >
              <TableCell sx={{...TableCellSx, color: statusColorMap[a.place] || palette.darkGray}}>{a.place}</TableCell>
              <TableCell sx={{...TableCellSx, color: statusColorMap[a.place] || palette.darkGray}}>{a.time}</TableCell>
              <TableCell sx={{...TableCellSx, color: statusColorMap[a.place] || palette.darkGray}}>{a.place === "スタート" ? "-" : getElapsed(runner,a.time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  </Dialog>
)};

export default RunnerTimeDetailPopup;
