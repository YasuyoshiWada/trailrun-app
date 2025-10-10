import { allRunners } from "../data/all_Runners";
import type { RunnersData } from "../data/runnersTypes";

const buildEndpoint = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "";//.envで設定したurl
    //URLの末尾の/を除去してから"/api/runners" を足す
    const trimmedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    //APIでサーバーサイドから出てくるエンドポイントを.envファイル内に記述してます。
    const path = process.env.REACT_APP_RUNNERS_PATH ?? "api/runners";
    return `${trimmedBase}/${path}`;
};

export type FetchRunnersResult = {
  data: RunnersData[];
  error: Error | null;
};

export async function fetchRunners(): Promise<FetchRunnersResult> {
  const endpoint = buildEndpoint();

try {
  const response = await fetch(endpoint);
  if(!response.ok) {
    throw new Error(`Failed to fetch runners: ${response.status} ${response.statusText}`);
  }

  // パターン①: API が配列をそのまま返す
  const payload = await response.json();
  //Array.isArrayは与えられた値が配列かどうかを判定する標準メソッド
  //APIのレスポンスが 配列そのもの（例: [ {...}, {...} ]）のとき true
  if (Array.isArray(payload)) {
    return { data: payload as RunnersData[], error: null };
  }

      // パターン②: { data: [...] } の形で返す
    //APIのレスポンスが オブジェクトで、中に data プロパティが配列（例: { data: [ {...}, {...} ] }）のとき true
  if(Array.isArray((payload as {data?: unknown}).data)) {
    return { data: (payload as { data: RunnersData[] }).data, error: null };
  }

  throw new Error("Unexpected runners response shape");
} catch (unknownError) {
  const error = unknownError instanceof Error
  ? unknownError
  : new Error(String(unknownError));

   // API が失敗したときのフォールバックとして
    // ダミーデータ allRunners を返す
  console.error("データの取得に失敗したのでダミーデータを表示します", error);
  return { data: allRunners, error};
  }
}
