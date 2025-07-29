import  { useState } from "react";
import { allRunners } from "../data/all_Runners";

export function useRunnersData() {
  const [data, setData] = useState(allRunners);
  const [loading, setLoading] = useState(false);

  // リフレッシュ (再取得)
  const refresh = () => {
    setLoading(true);
    // 擬似的なAPI遅延を再現
    setTimeout(() => {
      setData(allRunners); // 今はダミー
      setLoading(false);
    }, 500);
  };

  return { data, loading, refresh };
}
