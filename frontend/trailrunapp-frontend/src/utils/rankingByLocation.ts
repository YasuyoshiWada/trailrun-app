import { RunnersData } from "../data/runnersTypes";
import { allRunners } from "../data/all_Runners";

function timeStringToSeconds(t: string): number {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}


function rankingByLocation(runners: RunnersData[], place: string) {
  const result = runners
  .map(runner => {
    //スタート時刻
    const start = runner.arrivals.find(a => a.place === "スタート")?.time;
    //対象地点の到達時刻
    const arrival = runner.arrivals.find(a => a.place === place)?.time;
    //startもしくは、arrivalが無い場合、もしくはarrivalが受付済みの場合はnullを返す。
    if (!start || !arrival || arrival === "受付済み") return null;
    //時刻差を秒に変換して計算
    const diff = timeStringToSeconds(arrival) - timeStringToSeconds(start);

    return {

    }
  })

}
