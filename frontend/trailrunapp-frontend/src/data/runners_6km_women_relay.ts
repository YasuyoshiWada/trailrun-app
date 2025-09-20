import { RunnersData } from "./runnersTypes";

export const runners6kmWomenRelay: RunnersData[] = [
  // 未受付
  {
    id: 301,
    rank: 1,
    raceNumber: 301,
    name: "佐々木 美咲",
    category: "6km女子リレー",
    arrivals: [],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 受付のみ
  {
    id: 302,
    rank: 2,
    raceNumber: 302,
    name: "高橋 彩",
    category: "6km女子リレー",
    arrivals: [{ place: "受付済み", time: "9:50:00" }],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // スタート
  {
    id: 303,
    rank: 3,
    raceNumber: 303,
    name: "田中 里奈",
    category: "6km女子リレー",
    arrivals: [
      { place: "受付済み", time: "9:52:00" },
      { place: "スタート", time: "10:00:00" },
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点1
  {
    id: 304,
    rank: 4,
    raceNumber: 304,
    name: "小林 花",
    category: "6km女子リレー",
    arrivals: [
      { place: "受付済み", time: "9:54:00" },
      { place: "スタート", time: "10:02:00" },
      { place: "地点1", time: "10:18:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点2
  {
    id: 305,
    rank: 5,
    raceNumber: 305,
    name: "山本 由衣",
    category: "6km女子リレー",
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
    id: 306,
    rank: 6,
    raceNumber: 306,
    name: "中村 さくら",
    category: "6km女子リレー",
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
    id: 307,
    rank: 7,
    raceNumber: 307,
    name: "鈴木 美優",
    category: "6km女子リレー",
    arrivals: [],
    dns: true, dnf: null, dq: null,
    dnsContent: "欠場", dnfContent: undefined, dqContent: undefined,
  },
  // DNF
  {
    id: 308,
    rank: 8,
    raceNumber: 308,
    name: "伊藤 華",
    category: "6km女子リレー",
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
    id: 309,
    rank: 9,
    raceNumber: 309,
    name: "加藤 友香",
    category: "6km女子リレー",
    arrivals: [
      { place: "受付済み", time: "10:02:00" },
      { place: "スタート", time: "10:12:00" },
    ],
    dns: null, dnf: null, dq: true,
    dnsContent: undefined, dnfContent: undefined, dqContent: "ルール違反",
  },
  // 完走
  {
    id: 310,
    rank: 10,
    raceNumber: 310,
    name: "渡辺 美月",
    category: "6km女子リレー",
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

