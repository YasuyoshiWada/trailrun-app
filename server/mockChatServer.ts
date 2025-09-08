import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

interface ChatMessage {
  message: string;
  timestamp: number;
}

const rooms: Record<string, ChatMessage[]> = {};

function sendJson(res:ServerResponse, status:number, data: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function notFound(res:ServerResponse) {
  sendJson(res, 404, { error: 'Not Found' });
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const method = req.method || 'GET';
  const url = parse(req.url || '', true);
  const parts = url.pathname ? url.pathname.split('/').filter(Boolean) : [];

  if (parts[0] === 'rooms' && parts[2] === 'messages' && method === 'POST') {
    const roomId = parts[1];
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);
        const timestamp = Date.now();
        rooms[roomId] = rooms[roomId] || [];
        rooms[roomId].push({ message, timestamp });
        sendJson(res, 200, {timestamp });
      } catch {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  if (parts[0] === 'rooms' && parts[2] === 'messages' && method === 'GET') {
    const roomId = parts[1];
    const since = parseInt(url.query.since as string || '0', 10);
    const messages = (rooms[roomId] || []).filter(msg => msg.timestamp > since);
    sendJson(res, 200, { messages });
    return;
  }

  notFound(res);
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
server.listen(port, () => {
  console.log(`Mock chat server listening on port ${port}`);
});
