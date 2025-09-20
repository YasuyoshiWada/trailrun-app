import { RunnersData } from "./runnersTypes";

export const runnersParentAndChildRelay: RunnersData[] = [
  // 未受付
  {
    id: 501,
    rank: 1,
    raceNumber: 501,
    name: "親子チームA",
    category: "6km親子リレー",
    arrivals: [],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 受付のみ
  {
    id: 502,
    rank: 2,
    raceNumber: 502,
    name: "親子チームB",
    category: "6km親子リレー",
    arrivals: [{ place: "受付済み", time: "9:45:00" }],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // スタート
  {
    id: 503,
    rank: 3,
    raceNumber: 503,
    name: "親子チームC",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "9:55:00" },
      { place: "スタート", time: "10:05:00" },
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点1
  {
    id: 504,
    rank: 4,
    raceNumber: 504,
    name: "親子チームD",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "9:57:00" },
      { place: "スタート", time: "10:07:00" },
      { place: "地点1", time: "10:23:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点2
  {
    id: 505,
    rank: 5,
    raceNumber: 505,
    name: "親子チームE",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "9:59:00" },
      { place: "スタート", time: "10:09:00" },
      { place: "地点1", time: "10:26:00" },
      { place: "地点2", time: "10:41:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // フィニッシュ
  {
    id: 506,
    rank: 6,
    raceNumber: 506,
    name: "親子チームF",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "10:01:00" },
      { place: "スタート", time: "10:11:00" },
      { place: "地点1", time: "10:28:00" },
      { place: "地点2", time: "10:43:00" },
      { place: "フィニッシュ", time: "10:59:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // DNS
  {
    id: 507,
    rank: 7,
    raceNumber: 507,
    name: "親子チームG",
    category: "6km親子リレー",
    arrivals: [],
    dns: true, dnf: null, dq: null,
    dnsContent: "欠場", dnfContent: undefined, dqContent: undefined,
  },
  // DNF
  {
    id: 508,
    rank: 8,
    raceNumber: 508,
    name: "親子チームH",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "10:03:00" },
      { place: "スタート", time: "10:13:00" },
      { place: "地点1", time: "10:29:00" },
    ],
    dns: null, dnf: true, dq: null,
    dnsContent: undefined, dnfContent: "途中棄権", dqContent: undefined,
  },
  // DQ
  {
    id: 509,
    rank: 9,
    raceNumber: 509,
    name: "親子チームI",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "10:04:00" },
      { place: "スタート", time: "10:14:00" },
    ],
    dns: null, dnf: null, dq: true,
    dnsContent: undefined, dnfContent: undefined, dqContent: "ルール違反",
  },
  // 完走
  {
    id: 510,
    rank: 10,
    raceNumber: 510,
    name: "親子チームJ",
    category: "6km親子リレー",
    arrivals: [
      { place: "受付済み", time: "10:06:00" },
      { place: "スタート", time: "10:16:00" },
      { place: "地点1", time: "10:32:00" },
      { place: "地点2", time: "10:48:00" },
      { place: "フィニッシュ", time: "11:05:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  }
];

