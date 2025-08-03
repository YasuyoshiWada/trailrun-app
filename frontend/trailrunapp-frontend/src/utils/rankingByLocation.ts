import { RunnersData } from "../data/runnersTypes";

function timeStringToSeconds(t: string): number {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}


export function rankingByLocation(runners: RunnersData[], place: string) {
  //順位付けしない地点名リスト
  const IGNORE_PLACES = ["未受付", "受付済み", "スタート"]

  // 順位付けが必要な地点でなければ空配列を返す
  if (IGNORE_PLACES.includes(place)) return [];

  const filtered = runners
  .map(runner => {
    //スタート時刻
    const start = runner.arrivals.find(a => a.place === "スタート")?.time;
    //対象地点の到達時刻
    const arrival = runner.arrivals.find(a => a.place === place)?.time;
    //startもしくは、arrivalが無い場合、もしくはarrivalが受付済みの場合はnullを返す。
    if (!start || !arrival) return null;
    //時刻差を秒に変換して計算
    const diff = timeStringToSeconds(arrival) - timeStringToSeconds(start);
    return {
      runnerId: runner.id,
      time: diff,
    };
  })
  .filter(Boolean) as {runnerId: number, time: number}[];

  //早い順でソート
  filtered.sort((a, b) => a.time - b.time);

  //同タイムは同順位で、順位がスキップされる実装
  let currentRank = 1;
  let previousTime: number | null = null;
  let sameRankCount = 0;
  const withRank = filtered.map((item, i) => {
    if (previousTime === item.time) {
      sameRankCount++;
      // 同タイムなのでcurrentRankそえ置き
    } else {
      //新しいタイムなら「現在の順位」に”同着数”を加えて進める
      currentRank = i + 1;
      sameRankCount = 1;
      previousTime = item.time;
    }
    return {
      ...item,
      rank: currentRank
    };
  });

  return withRank;
}
