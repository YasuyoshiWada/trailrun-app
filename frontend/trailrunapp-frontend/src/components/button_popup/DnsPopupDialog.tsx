import React, { useState, useEffect } from "react";
import PopupDialog from "../PopupDialog";
import { RunnersData } from "../../data/dummyRunners";
import { TextField } from "@mui/material";

type DnsDialogProps = {
  open: boolean;
  runner: RunnersData | undefined;
  onCancel: () => void;
  onConfirm: (dnsReason: string) => void;
};

const DnsPopupDialog: React.FC<DnsDialogProps> =({
  open,
  runner,
  onCancel,
  onConfirm,
}) => {
  const [ dnsReason, setDnsReason ] = useState("");

  //選手が切り替わった時にDNSの理由をリセット
  useEffect(() => {
    setDnsReason("");
  }, [runner]);

  return (
    <PopupDialog
    open={open}
    title="DNS登録"
    description={
      runner ? (
        <>
          <div style={{ marginBottom: "2rem", fontWeight: "bold",fontSize:"2rem", textAlign: "center"}}>
            以下の選手をDNS登録しますか？
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
              <span style={{fontSize:"1.4rem"}}>DNS要因</span>
              <TextField
              placeholder="要因を記入してください"
              value={dnsReason}
              onChange={e => setDnsReason(e.target.value)}
              sx={{ mt: "1rem", width: "14rem" }}
              size="small"
            />
            </div>

          </div>
        </>
      ) : ""
    }
    onConfirm={() => onConfirm(dnsReason)}
    onCancel={onCancel}
    />
  )
}

export default DnsPopupDialog;
