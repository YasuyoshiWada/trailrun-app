import React, { useState, useEffect } from "react";
import PopupDialog from "../PopupDialog";
import { RunnersData } from "../../data/dummyRunners";
import { TextField } from "@mui/material";

type RunnerStatusPopupProps = {
  open: boolean;
  runner: RunnersData | undefined;
  type: "DNS" | "DNF" | "DQ";
  reasonLabel: string;
  onCancel: () => void;
  onConfirm: (Reason: string) => void;
  onExited?: () => void;//親で閉じるpopupの一瞬popupが小さくなる現象を解消する値
  confirmColor: string;
  cancelColor: string;
};

const RunnerStatusPopupDialog: React.FC<RunnerStatusPopupProps> =({
  open,
  runner,
  type,
  reasonLabel,
  onCancel,
  onConfirm,
  onExited,
  confirmColor,
  cancelColor,
}) => {
  const [ reason, setReason ] = useState("");

  //選手が切り替わった時に理由をリセット
  useEffect(() => {
    setReason("");
  }, [runner]);

  return (
    <PopupDialog
    open={open}
    onExited={onExited}
    description={
      runner ? (
        <>
          <div style={{ marginBottom: "2rem", fontWeight: "bold",fontSize:"2rem", textAlign: "center"}}>
            以下の選手を{type}登録しますか？
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "7rem"
              }}>
              <span style={{ fontSize: "1.4rem", marginBottom: "1.6rem"}}>ゼッケン</span>
              <span style={{ fontSize: "1.8rem"}}>{runner.raceNumber}</span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "10rem"
              }}>
              <span style={{ fontSize: "1.4rem", marginBottom: "1.4rem"}}>名前</span>
              <span style={{ fontSize: "1.8rem"}}>{runner.name}</span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "16rem"
              }}>
              <span style={{fontSize:"1.4rem"}}>{reasonLabel}</span>
              <TextField
              placeholder="要因を記入してください"
              value={reason}
              onChange={e => setReason(e.target.value)}
              sx={{ mt: "1rem", width: "14rem" }}
              size="small"
            />
            </div>

          </div>
        </>
      ) : ""
    }
    onConfirm={() => onConfirm(reason)}
    onCancel={onCancel}
    confirmColor={confirmColor}
    cancelColor={cancelColor}
    />
  )
}

export default RunnerStatusPopupDialog;
