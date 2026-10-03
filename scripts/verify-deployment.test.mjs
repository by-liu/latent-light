import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { verifyDeployment } from './verify-deployment.mjs';

// In-memory responses only. These tests never contact or deploy a public site.
const origin = 'https://latentlit.com';
function fixture(change = () => {}) {
  const fetchImpl = async url => {
    const path = new URL(url).pathname;
    const missing = path.startsWith('/__latent/');
    const type = path.endsWith('.md') ? 'text/markdown' : path.endsWith('.txt') ? 'text/plain' : path.endsWith('.mdx') ? 'text/mdx' : 'text/html';
    const options = { status: missing ? 404 : 200, type, body: type === 'text/html' ? `<link rel="canonical" href="${origin}${path}">` : 'exported content' };
    change(path, options);
    return new Response(options.body, { status: options.status, headers: { 'content-type': options.type } });
  };
  const readFileImpl = async url => {
    const pathname = url.pathname;
    if (!pathname.endsWith('.html')) return 'exported content';
    const path = pathname.slice(pathname.indexOf('/dist/') + 5).replace(/index\.html$/, '');
    return `<link rel="canonical" href="${origin}${path}">`;
  };
  return { fetchImpl, readFileImpl };
}

test('checks the matching static deployment and unavailable editor', async () => {
  await verifyDeployment(origin, fixture());
});
test('rejects a failed public response', async () => {
  await assert.rejects(verifyDeployment(origin, fixture((path, r) => { if (path === '/') r.status = 500; })), /expected HTTP 200/);
});
test('rejects a stale or different public build', async () => {
  await assert.rejects(verifyDeployment(origin, fixture((path, r) => { if (path === '/llms.txt') r.body = 'older content'; })), /does not match this build/);
});
test('rejects incorrect Markdown content type', async () => {
  await assert.rejects(verifyDeployment(origin, fixture((path, r) => { if (path.endsWith('.md')) r.type = 'text/html'; })), /incorrect content type/);
});
test('rejects an accessible editing endpoint', async () => {
  await assert.rejects(verifyDeployment(origin, fixture((path, r) => { if (path === '/__latent/source-editor') r.status = 200; })), /expected HTTP 404/);
});
test('rejects a local origin before any request', async () => {
  let called = false;
  await assert.rejects(verifyDeployment('http://localhost:4327', { fetchImpl() { called = true; } }));
  assert.equal(called, false);
});
test('CI validates without deployment commands, secrets, or persisted credentials', () => {
  const workflow = readFileSync(new URL('../.github/workflows/validate.yml', import.meta.url), 'utf8');
  assert.match(workflow, /contents: read/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /fetch-depth: 2/);
  assert.match(workflow, /git diff --check HEAD\^ HEAD/);
  assert.match(workflow, /node-version-file: \.node-version/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run validate/);
  assert.ok(!/pull_request_target|secrets\.|CLOUDFLARE_API_TOKEN|npm run deploy/.test(workflow));
  const pins = [...workflow.matchAll(/uses: [^@\s]+@([^\s]+)/g)];
  assert.equal(pins.length, 2);
  for (const [, pin] of pins) assert.match(pin, /^[a-f0-9]{40}$/);
});
