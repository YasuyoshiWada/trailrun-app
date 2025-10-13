import { useEffect, useState } from "react";
import { RunnersData } from "../../../data/runnersTypes";

export const useRunnerState = (initialRunners: RunnersData[]) => {
  const [runnersState, setRunnersState] = useState<RunnersData[]>(initialRunners);

  useEffect(() => {
    setRunnersState(initialRunners);
  }, [initialRunners]);

  return { runnersState, setRunnersState } as const;
};
