import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { checkDeploymentOrigin } from './check-deployment-origin.mjs';

const checks = [
  ['/', 'index.html', 'text/html'],
  ['/about/', 'about/index.html', 'text/html'],
  ['/about/maintenance/', 'about/maintenance/index.html', 'text/html'],
  ['/llms.txt', 'llms.txt', 'text/plain'],
  ['/llms-full.txt', 'llms-full.txt', 'text/plain'],
  ['/about/maintenance/index.md', 'about/maintenance/index.md', 'text/markdown'],
  ['/about/maintenance/index.mdx', 'about/maintenance/index.mdx', 'text/mdx'],
];

export async function verifyDeployment(origin, { fetchImpl = fetch, readFileImpl = readFile } = {}) {
  checkDeploymentOrigin(origin);
  await Promise.all(checks.map(async ([path, file, contentType]) => {
    const response = await fetchImpl(`${origin}${path}`, {
      redirect: 'manual', signal: AbortSignal.timeout(15000),
      headers: { 'Cache-Control': 'no-cache' },
    });
    assert.equal(response.status, 200, `${path}: expected HTTP 200`);
    if (contentType) assert.ok(response.headers.get('content-type')?.startsWith(contentType), `${path}: incorrect content type`);
    const actual = await response.text();
    const expected = await readFileImpl(new URL(`../dist/${file}`, import.meta.url), 'utf8');
    assert.equal(actual, expected, `${path}: response does not match this build`);
    if (contentType === 'text/html') {
      assert.ok(actual.includes(`href="${origin}${path}"`), `${path}: incorrect canonical origin`);
      assert.ok(!actual.includes('/__latent/source-editor'), `${path}: public editor reference`);
    }
  }));
  for (const path of ['/__latent/source-editor', '/__latent/deployment-check-missing']) {
    const response = await fetchImpl(`${origin}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 404, `${path}: expected HTTP 404`);
    await response.text();
  }
}

async function main() {
  let origin;
  try { origin = checkDeploymentOrigin(process.env.SITE_URL); }
  catch { console.error('Deployment check blocked: set a valid SITE_URL.'); process.exitCode = 1; return; }
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      await verifyDeployment(origin);
      console.log('Public deployment checks passed.');
      return;
    } catch (error) {
      const reason = error instanceof Error ? error.message.split('\n')[0].slice(0, 200) : 'request failed';
      if (attempt === 5) {
        console.error(`Public deployment checks failed: ${reason}`);
        console.error('Check the live site and Cloudflare build logs. The upload may already be active.');
        process.exitCode = 1;
        return;
      }
      console.error(`Public deployment check ${attempt + 1} failed: ${reason}. Retrying after propagation delay.`);
      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await main();
