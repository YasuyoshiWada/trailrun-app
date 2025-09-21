import { RunnersData } from "./runnersTypes";

export const runners6kmMixRelay: RunnersData[] = [
  // 未受付
  {
    id: 401,
    rank: 1,
    raceNumber: 401,
    name: "TEAM MIX A",
    category: "6km混合リレー",
    arrivals: [],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 受付のみ
  {
    id: 402,
    rank: 2,
    raceNumber: 402,
    name: "TEAM MIX B",
    category: "6km混合リレー",
    arrivals: [{ place: "受付済み", time: "9:48:00" }],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // スタート
  {
    id: 403,
    rank: 3,
    raceNumber: 403,
    name: "TEAM MIX C",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "9:55:00" },
      { place: "スタート", time: "10:05:00" },
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点1
  {
    id: 404,
    rank: 4,
    raceNumber: 404,
    name: "TEAM MIX D",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "9:58:00" },
      { place: "スタート", time: "10:08:00" },
      { place: "地点1", time: "10:23:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // 地点2
  {
    id: 405,
    rank: 5,
    raceNumber: 405,
    name: "TEAM MIX E",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "10:00:00" },
      { place: "スタート", time: "10:10:00" },
      { place: "地点1", time: "10:25:00" },
      { place: "地点2", time: "10:40:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // フィニッシュ
  {
    id: 406,
    rank: 6,
    raceNumber: 406,
    name: "TEAM MIX F",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "10:02:00" },
      { place: "スタート", time: "10:12:00" },
      { place: "地点1", time: "10:27:00" },
      { place: "地点2", time: "10:43:00" },
      { place: "フィニッシュ", time: "10:59:30" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  },
  // DNS
  {
    id: 407,
    rank: 7,
    raceNumber: 407,
    name: "TEAM MIX G",
    category: "6km混合リレー",
    arrivals: [],
    dns: true, dnf: null, dq: null,
    dnsContent: "欠場", dnfContent: undefined, dqContent: undefined,
  },
  // DNF
  {
    id: 408,
    rank: 8,
    raceNumber: 408,
    name: "TEAM MIX H",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "10:05:00" },
      { place: "スタート", time: "10:15:00" },
      { place: "地点1", time: "10:31:00" },
    ],
    dns: null, dnf: true, dq: null,
    dnsContent: undefined, dnfContent: "怪我", dqContent: undefined,
  },
  // DQ
  {
    id: 409,
    rank: 9,
    raceNumber: 409,
    name: "TEAM MIX I",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "10:06:00" },
      { place: "スタート", time: "10:16:00" },
    ],
    dns: null, dnf: null, dq: true,
    dnsContent: undefined, dnfContent: undefined, dqContent: "ルール違反",
  },
  // 完走
  {
    id: 410,
    rank: 10,
    raceNumber: 410,
    name: "TEAM MIX J",
    category: "6km混合リレー",
    arrivals: [
      { place: "受付済み", time: "10:08:00" },
      { place: "スタート", time: "10:18:00" },
      { place: "地点1", time: "10:33:00" },
      { place: "地点2", time: "10:49:00" },
      { place: "フィニッシュ", time: "11:07:00" }
    ],
    dns: null, dnf: null, dq: null,
    dnsContent: undefined, dnfContent: undefined, dqContent: undefined,
  }
];

