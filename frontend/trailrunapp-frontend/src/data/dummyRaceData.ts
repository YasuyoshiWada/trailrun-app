import { palette } from "../styles/palette";

export type StatusItem = {
  label: string;
  value: number;
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
      { label: "未受付", value: 30},
      { label: "受付済み", value: 70},
      { label: "DNS", value: 20},
      { label: "スタート", value: 80}
    ]
  },
  {
    categoryName: "6Km 女子",
    totalParticipants: 180,
    statusList: [
      { label: "未受付", value: 40},
      { label: "受付済み", value: 60},
      { label: "DNS", value: 10},
      { label: "スタート", value: 70}
    ]
  },
  {
    categoryName: "リレー男子",
    totalParticipants: 400,
    statusList: [
      { label: "地点1", value: 60},
      { label: "地点2", value: 140},
      { label: "フィニッシュ", value: 160},
      { label: "DNF", value: 40}
    ]
  },
  {
    categoryName: "リレー女子",
    totalParticipants: 400,
    statusList: [
      { label: "DNS", value: 60},
      { label: "スタート", value: 140},
      { label: "地点1", value: 160},
      { label: "DNF", value: 40}
    ]
  },
];
