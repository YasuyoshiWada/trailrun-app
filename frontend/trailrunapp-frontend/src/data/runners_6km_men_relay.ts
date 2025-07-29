import { RunnersData } from "./runnersTypes";

export const runners6kmMenRelay: RunnersData[] = [
  // 未受付
  {
    id: 201,
    rank: 1,
    raceNumber: 201,
    name: "山田 裕太",
    category: "6km男子リレー",
    arrivals: [{ place: "未受付" }],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 受付のみ
  {
    id: 202,
    rank: 2,
    raceNumber: 202,
    name: "佐藤 健",
    category: "6km男子リレー",
    arrivals: [{ place: "受付済み", time: "9:50:00" }],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // スタート
  {
    id: 203,
    rank: 3,
    raceNumber: 203,
    name: "田中 智",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "9:52:00" },
      { place: "スタート", time: "10:00:00" },
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点1
  {
    id: 204,
    rank: 4,
    raceNumber: 204,
    name: "鈴木 剛",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "9:54:00" },
      { place: "スタート", time: "10:02:00" },
      { place: "地点1", time: "10:17:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点2
  {
    id: 205,
    rank: 5,
    raceNumber: 205,
    name: "松本 亮",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "9:56:00" },
      { place: "スタート", time: "10:04:00" },
      { place: "地点1", time: "10:19:00" },
      { place: "地点2", time: "10:34:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // フィニッシュ
  {
    id: 206,
    rank: 6,
    raceNumber: 206,
    name: "高橋 淳",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "9:57:00" },
      { place: "スタート", time: "10:07:00" },
      { place: "地点1", time: "10:22:00" },
      { place: "地点2", time: "10:36:00" },
      { place: "フィニッシュ", time: "10:52:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // DNS
  {
    id: 207,
    rank: 7,
    raceNumber: 207,
    name: "井上 大輔",
    category: "6km男子リレー",
    arrivals: [{ place: "未受付" }],
    dns: true, dnf: null, dq: null,
    dnsContent: "連絡なし", dnfContent: undefined, dqContent: undefined,
  },
  // DNF
  {
    id: 208,
    rank: 8,
    raceNumber: 208,
    name: "小林 徹",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "10:00:00" },
      { place: "スタート", time: "10:10:00" },
      { place: "地点1", time: "10:25:00" },
    ],
    dns: null, dnf: true, dq: null,
    dnsContent: undefined, dnfContent: "体調不良", dqContent: undefined,
  },
  // DQ
  {
    id: 209,
    rank: 9,
    raceNumber: 209,
    name: "斎藤 剛",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "10:02:00" },
      { place: "スタート", time: "10:12:00" },
    ],
    dns: null, dnf: null, dq: true,
    dnsContent: undefined, dnfContent: undefined, dqContent: "ルール違反",
  },
  // 完走
  {
    id: 210,
    rank: 10,
    raceNumber: 210,
    name: "中村 新",
    category: "6km男子リレー",
    arrivals: [
      { place: "受付済み", time: "10:04:00" },
      { place: "スタート", time: "10:14:00" },
      { place: "地点1", time: "10:29:00" },
      { place: "地点2", time: "10:44:00" },
      { place: "フィニッシュ", time: "11:01:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  }
];
