import { useMemo, useState } from "react";
import { RunnersData } from "../../../data/runnersTypes";
import { getLastPlaceDisplay } from "../../../utils/getLastArrivalDisplay";

export type SortType = "rankAsc" | "rankDesc" | "numAsc" | "numDesc";

export const useRunnerFilters = (runners: RunnersData[], label?: string) => {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState<SortType>("rankAsc");

  const filteredRunners = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return runners.filter(r => {
      if (label) {
        if (["DNS", "DNF", "DQ"].includes(label)) {
          if (label === "DNS" && !r.dns) return false;
          if (label === "DNF" && !r.dnf) return false;
          if (label === "DQ" && !r.dq) return false;
        } else {
          if (r.dns || r.dnf || r.dq) return false;
          const lastPlace = getLastPlaceDisplay(r);
          if (lastPlace !== label) return false;
        }
      }

      if (!keyword) return true;

      const category = (r.category ?? "").toLowerCase();

      return (
        String(r.rank).includes(keyword) ||
        String(r.raceNumber).includes(keyword) ||
        r.name.toLowerCase().includes(keyword) ||
        category.includes(keyword)
      );
    });
  }, [label, runners, searchText]);

  const sortedRunners = useMemo(() => {
    const copied = [...filteredRunners];

    switch (sortType) {
      case "rankAsc":
        return copied.sort((a, b) => a.rank - b.rank);
      case "rankDesc":
        return copied.sort((a, b) => b.rank - a.rank);
      case "numAsc":
        return copied.sort((a, b) => a.raceNumber - b.raceNumber);
      case "numDesc":
        return copied.sort((a, b) => b.raceNumber - a.raceNumber);
      default:
        return copied;
    }
  }, [filteredRunners, sortType]);

  return {
    searchText,
    setSearchText,
    sortType,
    setSortType,
    sortedRunners,
  } as const;
};
