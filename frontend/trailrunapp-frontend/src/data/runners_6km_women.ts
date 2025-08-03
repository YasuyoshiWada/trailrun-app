import { RunnersData } from "./runnersTypes";

export const runners6kmWomen: RunnersData[] = [
    // 未受付 5名
    { id: 101, rank: 1, raceNumber: 101, name: "佐藤 花子", category: "6km女子", arrivals: [], dns: null, dnf: null, dq: null },
    { id: 102, rank: 2, raceNumber: 102, name: "鈴木 彩香", category: "6km女子", arrivals: [], dns: null, dnf: null, dq: null },
    { id: 103, rank: 3, raceNumber: 103, name: "高橋 由紀", category: "6km女子", arrivals: [], dns: null, dnf: null, dq: null },
    { id: 104, rank: 4, raceNumber: 104, name: "田中 美咲", category: "6km女子", arrivals: [], dns: null, dnf: null, dq: null },
    { id: 105, rank: 5, raceNumber: 105, name: "伊藤 理沙", category: "6km女子", arrivals: [{ place: "未受付" }], dns: null, dnf: null, dq: null },
    // 受付済み 2名
    { id: 106, rank: 6, raceNumber: 106, name: "渡辺 恵美", category: "6km女子", arrivals: [{ place: "受付済み", time: "9:15:00" }], dns: null, dnf: null, dq: null },
    { id: 107, rank: 7, raceNumber: 107, name: "小林 亜希子", category: "6km女子", arrivals: [{ place: "受付済み", time: "9:18:00" }], dns: null, dnf: null, dq: null },
    // スタートのみ 2名
    { id: 108, rank: 8, raceNumber: 108, name: "加藤 まい", category: "6km女子", arrivals: [{ place: "受付済み", time: "9:20:00" }, { place: "スタート", time: "9:35:00" }], dns: null, dnf: null, dq: null },
    { id: 109, rank: 9, raceNumber: 109, name: "山本 美奈", category: "6km女子", arrivals: [{ place: "受付済み", time: "9:22:00" }, { place: "スタート", time: "9:36:00" }], dns: null, dnf: null, dq: null },
    // 地点1まで 2名
    { id: 110, rank: 10, raceNumber: 110, name: "松本 友美", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:23:00" }, { place: "スタート", time: "9:38:00" }, { place: "地点1", time: "9:53:00" }], dns: null, dnf: null, dq: null },
    { id: 111, rank: 11, raceNumber: 111, name: "中村 恵", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:25:00" }, { place: "スタート", time: "9:39:00" }, { place: "地点1", time: "9:54:00" }], dns: null, dnf: null, dq: null },
    // 地点2まで 2名
    { id: 112, rank: 12, raceNumber: 112, name: "森田 舞", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:27:00" }, { place: "スタート", time: "9:41:00" }, { place: "地点1", time: "9:56:00" }, { place: "地点2", time: "10:11:00" }], dns: null, dnf: null, dq: null },
    { id: 113, rank: 13, raceNumber: 113, name: "藤本 美佳", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:29:00" }, { place: "スタート", time: "9:42:00" }, { place: "地点1", time: "9:58:00" }, { place: "地点2", time: "10:13:00" }], dns: null, dnf: null, dq: null },
    // フィニッシュ 2名
    { id: 114, rank: 14, raceNumber: 114, name: "石井 佳代", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:31:00" }, { place: "スタート", time: "9:44:00" }, { place: "地点1", time: "10:00:00" }, { place: "地点2", time: "10:16:00" }, { place: "フィニッシュ", time: "10:34:20" }], dns: null, dnf: null, dq: null },
    { id: 115, rank: 15, raceNumber: 115, name: "三浦 由香", category: "6km女子", arrivals: [
      { place: "受付済み", time: "9:34:00" }, { place: "スタート", time: "9:47:00" }, { place: "地点1", time: "10:03:00" }, { place: "地点2", time: "10:19:00" }, { place: "フィニッシュ", time: "10:37:55" }], dns: null, dnf: null, dq: null },
  ];
