import React from "react";
import { RunnersData } from "../../data/runnersTypes";
import { Dialog, DialogContent, DialogActions} from "@mui/material";
import {Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { palette, statusColorMap } from "../../styles/palette";
import DNSButton from "../button/DnsButton";
import DNFButton from "../button/DnfButton";
import DQButton from "../button/DqButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { getElapsed } from"../../utils/getElapsed";

type RunnerTimeDetailMobilePopupProps = {
  open: boolean;
  runner: RunnersData | undefined;
  onDnsClick: (id: number) => void;
  onDnfClick: (id: number) => void;
  onDqClick: (id: number) => void;
  onCancel: () => void;
};

const  TableHeaderSx = {
  fontSize: '1.6rem',
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

const RunnerTimeDetailMobilePopup: React.FC<RunnerTimeDetailMobilePopupProps> = ({
  open,
  runner,
  onDnfClick,
  onDnsClick,
  onDqClick,
  onCancel,
}) => {

if (!open || !runner ) return null;

return (
  <Dialog
  open={open}
  onClose={onCancel}
  >
    <DialogContent
    sx={{
      marginTop: '1.7rem',
      position: 'relative',
      width:"35.5rem",//popupの横幅
      height:"auto"
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
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5rem",
        pb: "2rem",
      }}>
        <DNSButton value={runner.dns} onClick={() => onDnsClick(runner.id)}/>
        <DNFButton value={runner.dnf} onClick={() => onDnfClick(runner.id)}/>
        <DQButton value={runner.dq} onClick={() => onDqClick(runner.id)}/>
      </Box>
      <div
      style={{
        fontWeight: "bold",
        fontSize: "1.6rem",
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
              <TableCell sx={{...TableCellSx, color: statusColorMap[a.place] || palette.darkGray}}>{["未受付", "受付済み", "スタート"].includes(a.place) || !a.time
          ? "-"
          : getElapsed(runner, a.time)
        }
              </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      )};

export default RunnerTimeDetailMobilePopup;
