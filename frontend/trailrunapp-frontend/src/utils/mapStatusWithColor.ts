import { palette, statusColorMap } from "../styles/palette";
import type { StatusItem } from "./aggregateRaceData";
import { sortByStatusOrder } from "./statusOrder";


//ステータスバーのlabelにmatchした色を渡す関数
export const mapStatusWithColor = (
  statusList:StatusItem[],
  statusOrder?: string[],
) =>
  sortByStatusOrder(
  statusList, statusOrder).map(status => ({
    ...status,
    color: statusColorMap[status.label] || palette.darkGray,
  }));
