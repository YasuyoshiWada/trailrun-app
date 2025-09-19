import { statusColorMap } from "../styles/palette";

type LabeledItem = { label: string };
//statusColorMapのキーを配列で取得
const defaultStatusOrder = Object.keys(statusColorMap);

//呼び出し側から順序配列が渡され、かつ空でなければそれを使用。なければ defaultStatusOrder を採用。
function resolveStatusOrder(statusOrder?: string[]): string[] {
  //statusOrderが存在し、かつ要素数が0より大きい場合はそれを返す
  if(statusOrder && statusOrder.length > 0) {
    return statusOrder;
  }
  //それ以外はデフォルトの順序を返す
  return defaultStatusOrder;
}
//汎用的なソート関数、LabeledItemをを満たした型Tの配列を受け取り、statusOrderに基づいてソートされた配列を返す
export function sortByStatusOrder<T extends LabeledItem>(
  items: T[],
  statusOrder?: string[],
): T[] {
  const order = resolveStatusOrder(statusOrder);
  //ラベル順位のルックアップ表を作成
  const orderMap = new Map(order.map((label, index) => [label, index]));//orderをmapしてlabelをキー、indexを値にする

  return items
  //items を一旦 { item, orderIndex, originalIndex } に変換し、ソート後に item のみを抽出して返す
    .map((item, index) => ({
      item,
      //orderIndex: ラベルが見つからない場合は Number.MAX_SAFE_INTEGER（＝最後尾へ）
      orderIndex: orderMap.get(item.label) ?? Number.MAX_SAFE_INTEGER,
      //originalIndex: 同順位の時に入力順を保つため
      originalIndex: index,
    }))
    //役割: 並び替えの優先順位を2段階で決めるための比較関数。
// 第1キー: orderIndex（statusOrder に基づく順位）
// 第2キー: originalIndex（入力配列での元の並び）
    .sort((a, b) => {
      if (a.orderIndex !== b.orderIndex) {
        return a.orderIndex - b.orderIndex;
      }
      return a.originalIndex - b.originalIndex;
    })
    //最後に .map(({ item }) => item) で純粋な配列へ。
    .map(({ item }) => item);
}
