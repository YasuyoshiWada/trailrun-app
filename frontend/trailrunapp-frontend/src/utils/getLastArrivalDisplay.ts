import { RunnersData } from "../data/dummyRunners";

//最終到達の時間と場所
export const getLastArrivalDisplay = (runner: RunnersData) => {
  if (!runner.arrivals.length) return "";
  const last = runner.arrivals[runner.arrivals.length -1];
  return `${last.time}`;
}
