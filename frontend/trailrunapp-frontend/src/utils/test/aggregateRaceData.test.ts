import { countStatusByCategory, getTotalStatusList } from "./aggregateRaceData";
import { statusColorMap } from "../styles/palette";

const createRunner = (id, overrides = {}) => ({
  id,
  rank: 0,
  raceNumber: id,
  name: `Runner ${id}`,
  category: "Category A",
  arrivals: [],
  dns: false,
  dnf: false,
  dq: false,
  ...overrides,
});

describe("aggregateRaceData", () => {
  const legendStatusOrder = ["DNS", "DNF", "フィニッシュ", "未受付"];

  describe("countStatusByCategory", () => {
    it("sorts each category status list using the legend order", () => {
      const runners = [
        createRunner(1, { arrivals: [{ place: "フィニッシュ" }] }),
        createRunner(2, {}),
        createRunner(3, { dns: true }),
        createRunner(4, { dnf: true }),
      ];

      const [category] = countStatusByCategory(runners, legendStatusOrder);

      expect(category.categoryName).toBe("Category A");
      expect(category.statusList.map(item => item.label)).toEqual([
        "DNS",
        "DNF",
        "フィニッシュ",
        "未受付",
      ]);
      expect(category.statusList.map(item => item.value)).toEqual([1, 1, 1, 1]);
    });
  });

  describe("getTotalStatusList", () => {
    it("returns totals sorted using the legend order", () => {
      const raceCategoryList = [
        {
          categoryName: "Category A",
          totalParticipants: 3,
          statusList: [
            { label: "フィニッシュ", value: 2 },
            { label: "DNS", value: 1 },
          ],
        },
        {
          categoryName: "Category B",
          totalParticipants: 2,
          statusList: [
            { label: "未受付", value: 1 },
            { label: "DNF", value: 1 },
          ],
        },
      ];

      const totals = getTotalStatusList(raceCategoryList, legendStatusOrder);

      expect(totals.map(item => item.label)).toEqual([
        "DNS",
        "DNF",
        "フィニッシュ",
        "未受付",
      ]);
      expect(totals.map(item => item.value)).toEqual([1, 1, 2, 1]);
      expect(totals.find(item => item.label === "DNS")?.color).toBe(statusColorMap["DNS"]);
    });
  });
});
