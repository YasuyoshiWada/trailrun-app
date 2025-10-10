import  { useCallback, useEffect, useState } from "react";
import { fetchRunners } from "../api/runners";
import { allRunners } from "../data/all_Runners";
import type { RunnersData } from "../data/runnersTypes";

export function useRunnersData() {
  const [data, setData] = useState<RunnersData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // リフレッシュ (再取得)
  const loadData = useCallback(async () => {
    setLoading(true);
      setError(null);

      try {
        const result = await fetchRunners();
        //fetchData関数内で定義されているdataとerrorが返る
        setData(result.data);
        setError(result.error);
      } catch (unknownError) {
        //fallbackError は、unknown で受け取った値を Error 型に変換するための保険です。unknownError がすでに Error ならそのまま使い、それ以外（文字列など）なら new Error(...) に包んで確実に Error 型を setError に渡しています
        const fallbackError = unknownError instanceof Error
          ? unknownError
          :new Error(String(unknownError));

        setData(allRunners);
        setError(fallbackError);
      } finally {
        setLoading(false);
      }
    }, []);
    //コンポーネント初回マウント時に一度だけfetchRunners()が呼ばれる仕組み
    useEffect(() => {
      void loadData();
    }, [loadData]);

    const refresh = useCallback(() => loadData(), [loadData]);

    return { data, loading, error, refresh };
}
