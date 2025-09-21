"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statuses = void 0;
exports.statusesRequestListener = statusesRequestListener;
const http_1 = require("http");
const url_1 = require("url");
exports.statuses = [
    { label: '未受付', color: '#A7A5A6', iconName: 'HelpOutline' },
    { label: '受付済み', color: '#66ccce', iconName: 'PersonAddAlt1' },
    { label: 'スタート', color: '#254d8f', iconName: 'DirectionsRun' },
    { label: '地点1', color: '#586673', iconName: 'LocationOn' },
    { label: '地点2', color: '#23b5bf', iconName: 'LocationOn' },
    { label: 'フィニッシュ', color: '#62c338', iconName: 'EmojiEvents' },
    { label: 'DNS', color: '#f58530', iconName: 'RemoveCircleOutline' },
    { label: 'DNF', color: '#f5ba30', iconName: 'NotInterested' },
    { label: 'DQ', color: '#d84f5f', iconName: 'HighlightOff' },
];
const JSON_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // CORSを許可
};
const CORS_HEADERS = {
    ...JSON_HEADERS,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, JSON_HEADERS);
    res.end(JSON.stringify(payload));
}
function handleOptions(res) {
    res.writeHead(204, CORS_HEADERS);
    res.end();
}
function statusesRequestListener(req, res) {
    const method = req.method ?? 'GET';
    if (method === 'OPTIONS') {
        handleOptions(res);
        return;
    }
    const parsedUrl = (0, url_1.parse)(req.url ?? '', true);
    const pathname = parsedUrl.pathname?.replace(/\/$/, '') ?? '';
    if (method === 'GET' && pathname === '/api/statuses') {
        sendJson(res, 200, exports.statuses);
        return;
    }
    res.writeHead(404, JSON_HEADERS);
    res.end(JSON.stringify({ error: 'Not Found' }));
}
if (require.main === module) {
    const port = process.env.PORT ? Number(process.env.PORT) : 4100;
    const server = (0, http_1.createServer)();
    server.listen(port, () => {
        console.log(`Statuses server listening on port ${port}`);
    });
}
