import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { checkDeploymentOrigin } from './check-deployment-origin.mjs';

const script = fileURLToPath(new URL('./check-deployment-origin.mjs', import.meta.url));
const root = fileURLToPath(new URL('../', import.meta.url));
const packageFile = new URL('../package.json', import.meta.url);

// These inputs test URL policy. They do not configure or contact a live site.
for (const origin of ['https://by-liu.github.io', 'https://latent-light.origin-check.workers.dev']) {
  test(`accepts canonical HTTPS DNS origin ${origin}`, () => {
    assert.equal(checkDeploymentOrigin(origin), origin);
  });
}

const rejected = [
  ['missing value', undefined], ['empty value', ''], ['whitespace', '   '],
  ['surrounding whitespace', ' https://by-liu.github.io '],
  ['missing protocol', 'by-liu.github.io'], ['HTTP', 'http://by-liu.github.io'],
  ['other protocol', 'file:///tmp/site'], ['credentials', 'https://user:secret@by-liu.github.io'],
  ['path', 'https://by-liu.github.io/notebook'], ['query', 'https://by-liu.github.io?view=public'],
  ['fragment', 'https://by-liu.github.io#about'], ['trailing slash', 'https://by-liu.github.io/'],
  ['empty fragment', 'https://by-liu.github.io#'], ['normalized path', 'https://by-liu.github.io/docs/..'],
  ['localhost', 'https://localhost'], ['localhost subdomain', 'https://site.localhost'],
  ['IPv4 loopback', 'https://127.0.0.1'], ['short loopback', 'https://127.1'],
  ['private address', 'https://192.168.1.1'], ['IPv6 loopback', 'https://[::1]'],
  ['public IP address', 'https://1.1.1.1'], ['single label', 'https://intranet'],
  ['local suffix', 'https://latent-light.local'], ['internal suffix', 'https://latent-light.internal'],
  ['home suffix', 'https://latent-light.home.arpa'], ['test suffix', 'https://latent-light.test'],
  ['example file value', 'https://your-site.example'], ['invalid suffix', 'https://latent-light.invalid'],
  ['example domain', 'https://example.com'], ['example subdomain', 'https://site.example.org'],
  ['empty DNS label', 'https://site..com'], ['DNS underscore', 'https://latent_light.com'],
  ['DNS hyphen boundary', 'https://-site.com'], ['long DNS label', `https://${'a'.repeat(64)}.com`],
];
for (const [name, value] of rejected) {
  test(`rejects ${name}`, () => {
    assert.throws(() => checkDeploymentOrigin(value));
  });
}

function environment(value) {
  const env = { ...process.env };
  delete env.SITE_URL;
  if (value !== undefined) env.SITE_URL = value;
  return env;
}

test('CLI rejects a missing origin without exposing environment values', () => {
  const result = spawnSync(process.execPath, [script], { env: environment(), encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Deployment blocked:/);
  assert.equal(result.stdout, '');
});

test('CLI accepts a policy compliant test origin without contacting it', () => {
  const result = spawnSync(process.execPath, [script], {
    env: environment('https://latent-light.origin-check.workers.dev'), encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), 'Deployment origin check passed.');
  assert.equal(result.stderr, '');
});

test('CLI does not print credentials in a rejected URL', () => {
  const result = spawnSync(process.execPath, [script], {
    env: environment('https://user:do-not-print-this@by-liu.github.io'), encoding: 'utf8',
  });
  assert.equal(result.status, 1);
  assert.ok(!`${result.stdout}${result.stderr}`.includes('do-not-print-this'));
});

test('deployment lifecycle requires the origin check and complete validation', () => {
  const { scripts } = JSON.parse(readFileSync(packageFile, 'utf8'));
  assert.equal(scripts.predeploy, 'npm run check:deploy-origin && npm run validate');
  assert.equal(scripts.deploy, 'wrangler deploy');
  assert.equal(scripts.validate, 'npm run test:deployment && npm run typecheck && npm run lint:docs && npm run build');
  assert.equal(scripts.postdeploy, 'npm run verify:deployment');
});

test('predeploy stops before validation when SITE_URL is missing', () => {
  // Run only predeploy. This test never invokes the deploy command or Wrangler.
  const result = spawnSync('npm', ['run', 'predeploy'], {
    cwd: root, env: environment(), encoding: 'utf8', timeout: 15000,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Deployment blocked:/);
  assert.ok(!/(?:^|\n)> latent-light@[^ \n]+ (?:validate|typecheck|build|deploy)(?:\s|$)/.test(result.stdout));
});
