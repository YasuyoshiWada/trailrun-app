import { RunnersData } from "../data/runnersTypes";

//最終到達時刻の表示
export function getLastArrivalDisplay(runner: RunnersData): string {
  // 未受付なら"-""
  if (!runner.arrivals || runner.arrivals.length === 0) {
    return "-";
  }
  const lastArrival = runner.arrivals[runner.arrivals.length -1];
  //timeがなければ"-""
  return lastArrival.time || "-";
}

// 最終到達地点の表示
export function getLastPlaceDisplay(runner: RunnersData): string {
  if (!runner.arrivals || runner.arrivals.length === 0) {
    return "未受付";
  }
  const lastArrival = runner.arrivals[runner.arrivals.length -1];
  //timeがなければ"-""
  return lastArrival.place || "-";
}
