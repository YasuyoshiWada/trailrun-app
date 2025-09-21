import { RunnersData } from "../data/runnersTypes";
import { palette, statusColorMap } from "../styles/palette";
import { sortByStatusOrder } from "./statusOrder";

//カテゴリーごとにランナーをグループ化する関数
function groupByCategory(runners: RunnersData[]): Record<string, RunnersData[]> {
  //acc(アキュムレータ)は「オブジェクト（連想配列）要素を順番に格納していく
  return runners.reduce(
    (acc: Record<string,RunnersData[]>,  runner: RunnersData) => {
    const key = runner.category;
    (acc[key] ??= []).push(runner); //??= は「左が null/undefined のときだけ右を代入」する演算子。 acc は「カテゴリ名をキーに、該当ランナー配列を値に持つオブジェクト」です。??= でキー未作成時のみ空配列を作成し、push で追加します。入力を一度走査して、カテゴリーごとの配列にグルーピングしたオブジェクトを返します。
    return acc;
  }, {} as Record<string, RunnersData[]>);
}

export type StatusItem = {
  label: string;
  value: number;
};

export type RaceCategoryData = {
  categoryName: string;
  totalParticipants:number;
  statusList: StatusItem[];
};

export function countStatusByCategory(
  runners: RunnersData[],
  statusOrder?: string[],
): RaceCategoryData[] {
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
      else lastPlace = runner.arrivals[runner.arrivals.length - 1]?.place || "未受付";
      statusCount[lastPlace] = (statusCount[lastPlace] || 0) +1;
    });
    const statusList = sortByStatusOrder(
      Object.entries(statusCount).map(([label, value]) =>({label, value})),
      statusOrder,
    );
    return {
    categoryName: category,
    totalParticipants: categoryRunners.length,
    statusList,
    };
    });
  }
//ステータスバー合計値ロジック
export function getTotalStatusList(
  raceCategoryList:RaceCategoryData[],
  statusOrder?:string[],
) {
  const totals:{ [label: string]: {value:number; color:string}} = {};
  raceCategoryList.forEach(category => {
    category.statusList.forEach(status => {
      const label = status.label;
      totals[label] ??= { value:0, color: statusColorMap[label] ?? palette.darkGray };
      totals[label]!.value += status.value;
    });
  });
  return sortByStatusOrder(
    Object.entries(totals).map(([label, { value, color }]) => ({
      label,
      value,
      color
    })),
    statusOrder,
  );
}
