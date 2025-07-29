import { RunnersData } from "../data/runnersTypes";
import { palette, statusColorMap } from "../styles/palette";

function groupByCategory(runners: RunnersData[]): Record<string, RunnersData[]> {
  return runners.reduce((acc,  runner) => {
    acc[runner.category] = acc[runner.category] || [];
    acc[runner.category].push(runner);
    return acc;
  }, {} as Record<string, RunnersData[]>);
}

export type StatusItem = {
  label: string;
  value: number;
}

export type RaceCategoryData = {
  categoryName: string;
  totalParticipants:number;
  statusList: StatusItem[];
}

export function countStatusByCategory(runners: RunnersData[]): RaceCategoryData[] {
  const byCategory = groupByCategory(runners);

  return Object.entries(byCategory).map(([category, categoryRunners]) => {
    //lastPlaceをカウント
    const statusCount: Record<string, number> = {};
    categoryRunners.forEach(runner => {
      //DNS,DNF,DQ優先で判定
      let lastPlace = "";
      if (runner.dns) lastPlace = "DNS";
      else if (runner.dnf) lastPlace ="DNF";
      else if (runner.dq) lastPlace = "DQ";
      else lastPlace = runner.arrivals[runner.arrivals.length - 1] ?.place || "未受付";
      statusCount[lastPlace] = (statusCount[lastPlace] || 0) +1;
    });
    return {
    categoryName: category,
    totalParticipants: categoryRunners.length,
    statusList: Object.entries(statusCount).map(([label, value]) => ({
      label, value
    })),
  };
});
}

//ステータスバー合計値ロジック
export function getTotalStatusList(raceCategoryList:RaceCategoryData[]) {
  const totals:{ [label: string]: {value:number; color:string}} = {};
  raceCategoryList.forEach(category => {
    category.statusList.forEach(status => {
      if (!totals[status.label]) {
        totals[status.label] = { value: 0, color: statusColorMap[status.label] || palette.darkGray };
      }
      totals[status.label].value += status.value;
    });
  });
  return Object.entries(totals).map(([label, { value, color }]) => ({
    label,
    value,
    color
  }));
}
