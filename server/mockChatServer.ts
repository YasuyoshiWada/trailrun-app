import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: number;
}
//送られてきたmessageをroomsに保存する
const rooms: Record<string, ChatMessage[]> = {};
//レスポンスをJSON形式で返す関数
function sendJson(res:ServerResponse, status:number, data: unknown) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  //JSON形式でレスポンスを返す
  res.end(JSON.stringify(data));
}

function notFound(res:ServerResponse) {
  sendJson(res, 404, { error: 'Not Found' });
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  //
  const method = req.method || 'GET';
//ブラウザのプリフライトリクエストに対応
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  const url = parse(req.url || '', true);
  //送信されたurlを/で分割してpartsに格納
  const parts = url.pathname ? url.pathname.split('/').filter(Boolean) : [];
//parts[0]がroomsでparts[2]がmessagesでmethodがPOSTのとき
  if (parts[0] === 'rooms' && parts[2] === 'messages' && method === 'POST') {
    //rooms/roomId/messagesのroomIdを取得
    const roomId = parts[1];
    let body = '';
    //リクエストボディを受け取る
    req.on('data', chunk => { body += chunk; });
    //リクエストボディの受け取りが完了したら実行
    req.on('end', () => {
      try {
        //受け取ったbodyをJSON.parseしてmessageを取得
        const { message } = JSON.parse(body);
        const timestamp = Date.now();
        const id = timestamp.toString();
        const user = 'mock-user'; //固定のユーザー名
        rooms[roomId] = rooms[roomId] || [];
         //messageとtimestampをroomsに保存
        rooms[roomId].push({id, user, message, timestamp });
        //保存したmessageのidとtimestampをレスポンスとして返す
        sendJson(res, 200, { id, timestamp });
      } catch {
        //JSON.parseに失敗した場合は400エラーを返す
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }
//parts[0]がroomsでparts[2]がmessagesでmethodがGETのとき
  if (parts[0] === 'rooms' && parts[2] === 'messages' && method === 'GET') {
    const roomId = parts[1];
    //クエリパラメータのsinceを取得。なければ0をデフォルト値とする
    const since = parseInt(url.query.since as string || '0', 10);
    //roomsからroomIdに対応するメッセージを取得し、timestampがsinceより大きいものだけをフィルタリング
    const messages = (rooms[roomId] || []).filter(msg => msg.timestamp > since);
    sendJson(res, 200, { messages });
    return;
  }

  notFound(res);
});
//環境変数PORTが設定されていればその値を、設定されていなければ4000をポート番号として使用
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
server.listen(port, () => {
  console.log(`Mock chat server listening on port ${port}`);
});
