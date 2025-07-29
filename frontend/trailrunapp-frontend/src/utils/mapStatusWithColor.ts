import { palette, statusColorMap } from "../styles/palette";

type StatusItem = {
  label: string;
  value: number;
}
//ステータスバーのlabelにmatchした色を渡す関数
export const mapStatusWithColor = (statusList:StatusItem[]) =>
  statusList.map(status => ({
    ...status,
    color: statusColorMap[status.label] || palette.darkGray,
  }));
