import React from "react";
import { RunnersData } from "../../data/dummyRunners";
import { Dialog, DialogContent, DialogActions} from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { palette, statusColorMap } from "../../styles/palette";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { getElapsed } from"../../utils/getElapsed";

type RunnerTimeDetailPopupProps = {
  open: boolean;
  runner: RunnersData | undefined;
  onCancel: () => void;
};

const  TableHeaderSx = {
  fontSize: '2rem',
  fontWeight: 'bold',
  border: `1px solid ${palette.gray}`,
  textAlign: 'center'
};

const TableCellSx = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  border: `1px solid ${palette.gray}`,
  textAlign: 'center'
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
  >
    <DialogContent
    sx={{
      marginTop: '1.7rem',
      position: 'relative',
      width:"55rem",//popupの横幅
      height:"35rem"
    }}>
      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position:"absolute",
          right: "1rem",
          top: "-1rem",
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
        {runner?.name} 地点通過記録
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
