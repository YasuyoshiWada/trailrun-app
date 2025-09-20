import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import type { AddressInfo } from 'node:net';
import type { Server } from 'http';
import { createStatusesServer, statuses } from '../statuses.ts';

async function startServer(): Promise<{ server: Server; baseUrl: string }> {
  const server = createStatusesServer();
  server.listen(0);
  await once(server, 'listening');

  const address = server.address();
  if (!address || typeof address === 'string') {
    await stopServer(server);
    throw new Error('Failed to determine listening address');
  }

  const { port } = address as AddressInfo;
  return {
    server,
    baseUrl: `http://127.0.0.1:${port}`,
  };
}

async function stopServer(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

test('GET /api/statuses returns the expected payload', async () => {
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/statuses`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.headers.get('access-control-allow-origin'), '*');

    const body = (await response.json()) as typeof statuses;
    assert.deepStrictEqual(body, statuses);
  } finally {
    await stopServer(server);
  }
});

test('OPTIONS /api/statuses responds with CORS headers', async () => {
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/statuses`, { method: 'OPTIONS' });
    assert.strictEqual(response.status, 204);
    assert.strictEqual(response.headers.get('access-control-allow-origin'), '*');
    const allowMethods = response.headers.get('access-control-allow-methods');
    assert.ok(allowMethods?.includes('GET'));
  } finally {
    await stopServer(server);
  }
});

test('unknown routes return 404', async () => {
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/unknown`);
    assert.strictEqual(response.status, 404);
    const body = (await response.json()) as { error: string };
    assert.deepStrictEqual(body, { error: 'Not Found' });
  } finally {
    await stopServer(server);
  }
});
