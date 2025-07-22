import { palette, statusColorMap } from "../styles/palette";
import {StatusItem} from "../data/dummyRaceData";
//ステータスバーのlabelにmatchした色を渡す関数
export const mapStatusWithColor = (statusList:StatusItem[]) =>
  statusList.map(status => ({
    ...status,
    color: statusColorMap[status.label] || palette.darkGray,
  }));
