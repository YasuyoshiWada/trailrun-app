import { palette } from "../styles/palette";

type StatusItem = {
  label: string;
  value: number;
  color: string;
};

export type RaceCategoryData = {
  categoryName: string;
  totalParticipants: number;
  statusList: StatusItem[];
};


export const dummyRaceData: RaceCategoryData[] = [
  {
    categoryName: "6Km 男子",
    totalParticipants: 200,
    statusList: [
      { label: "未受付", value: 30, color: palette.gray },
      { label: "受付済み", value: 70, color: palette.aquaLight },
      { label: "DNS", value: 20, color: palette.orange },
      { label: "スタート", value: 80, color: palette.navyBlue }
    ]
  },
  {
    categoryName: "6Km 女子",
    totalParticipants: 180,
    statusList: [
      { label: "未受付", value: 40, color: palette.gray },
      { label: "受付済み", value: 60, color: palette.aquaLight },
      { label: "DNS", value: 10, color: palette.orange },
      { label: "スタート", value: 70, color: palette.navyBlue }
    ]
  }
];
