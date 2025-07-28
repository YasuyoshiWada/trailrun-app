import { RunnersData } from "../data/runnersTypes";

// スタートした時間を取得する
const getStartTime = (runner:RunnersData) =>{
  const startPlace = runner.arrivals.find(a => a.place === "スタート");
  return startPlace ? startPlace.time : "-";
}
//スタートからのタイム差を計算する関数
export const getElapsed = (runner:RunnersData, arrivalTime: string) => {
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
  return `${h}:${m}:${s}`;
  }
