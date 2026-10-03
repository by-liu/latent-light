import { isIP } from 'node:net';
import { pathToFileURL } from 'node:url';

const reservedSuffixes = [
  'localhost', 'local', 'localdomain', 'lan', 'internal', 'home', 'home.arpa',
  'test', 'example', 'invalid', 'onion',
];
const exampleDomains = ['example.com', 'example.net', 'example.org'];

function matchesDomain(hostname, domain) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

/** Check URL syntax and deployment policy without contacting the hostname. */
export function checkDeploymentOrigin(value) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Set SITE_URL to the approved public HTTPS origin before deployment.');
  }
  if (value !== value.trim() || /\s/.test(value)) {
    throw new Error('Remove whitespace from SITE_URL.');
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Set SITE_URL to a complete HTTPS origin.');
  }
  if (url.protocol !== 'https:') {
    throw new Error('Use HTTPS for the deployment origin.');
  }
  if (url.username || url.password) {
    throw new Error('Do not include credentials in SITE_URL.');
  }
  if (value !== url.origin) {
    throw new Error('Use only the canonical origin in SITE_URL. Remove paths, queries, fragments, and the trailing slash.');
  }

  const hostname = url.hostname;
  const address = hostname.replace(/^\[|\]$/g, '');
  if (isIP(address)) {
    throw new Error('Use a public DNS hostname instead of an IP address.');
  }
  const labels = hostname.split('.');
  if (hostname.length > 253 || labels.length < 2 || labels.some(label =>
    label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label))) {
    throw new Error('Use a complete public DNS hostname in SITE_URL.');
  }
  if (reservedSuffixes.some(domain => matchesDomain(hostname, domain))) {
    throw new Error('Replace the local or reserved hostname with the approved public hostname.');
  }
  if (exampleDomains.some(domain => matchesDomain(hostname, domain))) {
    throw new Error('Replace the example hostname with the approved public hostname.');
  }
  return url.origin;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    checkDeploymentOrigin(process.env.SITE_URL);
    console.log('Deployment origin check passed.');
  } catch (error) {
    // Do not echo the supplied URL because it might contain credentials.
    console.error(`Deployment blocked: ${error.message}`);
    process.exitCode = 1;
  }
}
