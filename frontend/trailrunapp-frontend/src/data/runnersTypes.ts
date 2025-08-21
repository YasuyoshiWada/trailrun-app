export type RunnerArrival = {
  place: string;
  time?: string | null;
}
export type RunnersData = {
  id: number;
  rank: number;
  raceNumber: number;
  name: string;
  category: string;
  arrivals: RunnerArrival[];
  dns: boolean | null;
  dnf: boolean | null;
  dq: boolean | null;
  dnsContent?: string | undefined;
  dnfContent?: string | undefined;
  dqContent?: string | undefined;
}
