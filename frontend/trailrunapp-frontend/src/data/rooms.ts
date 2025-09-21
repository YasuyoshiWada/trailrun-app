import { palette } from "../styles/palette";

export interface Room {
  id: string;
  name: string;
  color: string; // 追加: 各ルームに色を割り当てるプロパティ
}

export const rooms: Room[] = [
  { id: "room1", name: "スタート", color: palette.navyBlue },
  { id: "room2", name: "地点1", color: palette.darkGray },
  { id: "room3", name: "地点2", color: palette.cyan },
  { id: "room4", name: "フィニッシュ", color: palette.limeGreen },
];
