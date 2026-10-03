import { createHash, randomUUID } from 'node:crypto';
import { lstat, readFile, realpath, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const endpoint = '/__latent/source-editor';
const contentRoot = fileURLToPath(new URL('../src/content/docs/', import.meta.url));
const maximumSourceBytes = 4 * 1024 * 1024;

function revisionFor(source) {
	return createHash('sha256').update(source).digest('hex');
}

function sendJson(response, status, payload) {
	response.statusCode = status;
	response.setHeader('Content-Type', 'application/json; charset=utf-8');
	response.setHeader('Cache-Control', 'no-store');
	response.setHeader('X-Content-Type-Options', 'nosniff');
	response.end(JSON.stringify(payload));
}

function sameOrigin(request) {
	const origin = request.headers.origin;
	const host = request.headers.host;
	if (!origin || !host) return false;

	try {
		const url = new URL(origin);
		return (url.protocol === 'http:' || url.protocol === 'https:') && url.host === host;
	} catch {
		return false;
	}
}

async function resolveSourcePath(requestedPath) {
	if (
		typeof requestedPath !== 'string' ||
		requestedPath.length === 0 ||
		requestedPath.includes('\0') ||
		requestedPath.includes('\\') ||
		path.posix.isAbsolute(requestedPath)
	) {
		throw new Error('Invalid source path.');
	}

	const normalizedPath = path.posix.normalize(requestedPath);
	if (normalizedPath !== requestedPath || normalizedPath.startsWith('../')) {
		throw new Error('Invalid source path.');
	}

	const extension = path.posix.extname(normalizedPath);
	if (extension !== '.md' && extension !== '.mdx') {
		throw new Error('Only Markdown and MDX sources can be edited.');
	}

	const absolutePath = path.resolve(contentRoot, ...normalizedPath.split('/'));
	const relativePath = path.relative(contentRoot, absolutePath);
	if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
		throw new Error('Source path is outside the content collection.');
	}

	const [rootRealPath, sourceRealPath, sourceStats] = await Promise.all([
		realpath(contentRoot),
		realpath(absolutePath),
		lstat(absolutePath),
	]);
	const realRelativePath = path.relative(rootRealPath, sourceRealPath);
	if (
		realRelativePath.startsWith('..') ||
		path.isAbsolute(realRelativePath) ||
		!sourceStats.isFile() ||
		sourceStats.isSymbolicLink()
	) {
		throw new Error('Source must be a regular file inside the content collection.');
	}

	return { absolutePath, normalizedPath, sourceStats };
}

async function readJsonBody(request) {
	const chunks = [];
	let receivedBytes = 0;

	for await (const chunk of request) {
		receivedBytes += chunk.length;
		if (receivedBytes > maximumSourceBytes) {
			throw new Error('The submitted source is too large.');
		}
		chunks.push(chunk);
	}

	return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function handleEditorRequest(request, response) {
	const requestUrl = new URL(request.url ?? endpoint, 'http://localhost');

	if (request.method === 'GET') {
		const resolved = await resolveSourcePath(requestUrl.searchParams.get('path'));
		const source = await readFile(resolved.absolutePath, 'utf8');
		sendJson(response, 200, {
			path: resolved.normalizedPath,
			format: path.extname(resolved.normalizedPath).slice(1).toUpperCase(),
			source,
			revision: revisionFor(source),
		});
		return;
	}

	if (request.method !== 'PUT') {
		response.setHeader('Allow', 'GET, PUT');
		sendJson(response, 405, { error: 'Method not allowed.' });
		return;
	}

	if (!sameOrigin(request)) {
		sendJson(response, 403, { error: 'Source updates require a same-origin local request.' });
		return;
	}

	if (!request.headers['content-type']?.startsWith('application/json')) {
		sendJson(response, 415, { error: 'Expected an application/json request.' });
		return;
	}

	const body = await readJsonBody(request);
	if (
		typeof body?.path !== 'string' ||
		typeof body?.source !== 'string' ||
		typeof body?.revision !== 'string'
	) {
		sendJson(response, 400, { error: 'Path, source, and revision are required.' });
		return;
	}

	if (Buffer.byteLength(body.source, 'utf8') > maximumSourceBytes) {
		sendJson(response, 413, { error: 'The submitted source is too large.' });
		return;
	}

	const resolved = await resolveSourcePath(body.path);
	const currentSource = await readFile(resolved.absolutePath, 'utf8');
	if (revisionFor(currentSource) !== body.revision) {
		sendJson(response, 409, {
			error: 'This file changed after the editor loaded it. Reload the source before saving.',
		});
		return;
	}

	const temporaryPath = path.join(
		path.dirname(resolved.absolutePath),
		`.eclipse-edit-${path.basename(resolved.absolutePath)}-${randomUUID()}.tmp`,
	);

	try {
		await writeFile(temporaryPath, body.source, {
			encoding: 'utf8',
			mode: resolved.sourceStats.mode,
			flag: 'wx',
		});

		const latestSource = await readFile(resolved.absolutePath, 'utf8');
		if (revisionFor(latestSource) !== body.revision) {
			await unlink(temporaryPath);
			sendJson(response, 409, {
				error: 'This file changed while it was being saved. Reload the source and try again.',
			});
			return;
		}

		await rename(temporaryPath, resolved.absolutePath);
	} catch (error) {
		await unlink(temporaryPath).catch(() => {});
		throw error;
	}

	sendJson(response, 200, {
		path: resolved.normalizedPath,
		revision: revisionFor(body.source),
	});
}

export function localContentEditor() {
	return {
		name: 'eclipse-local-content-editor',
		apply: 'serve',
		configureServer(server) {
			// Never expose filesystem access when the dev server is network-bound.
			if (!['127.0.0.1', 'localhost', '::1'].includes(server.config.server.host)) {
				throw new Error('Local editing requires a loopback-only dev server.');
			}
			server.middlewares.use(async (request, response, next) => {
				const requestUrl = new URL(request.url ?? endpoint, 'http://localhost');
				if (requestUrl.pathname !== endpoint) {
					next();
					return;
				}
				const host = request.headers.host;
				const localHost = host && /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host);
				const remote = request.socket.remoteAddress;
				if (!localHost || !['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote) ||
					(request.headers.origin && !sameOrigin(request)) ||
					request.headers['sec-fetch-site'] === 'cross-site') {
					sendJson(response, 403, { error: 'Local same-origin access only.' });
					return;
				}

				try {
					await handleEditorRequest(request, response);
				} catch (error) {
					const message = error instanceof Error ? error.message : 'Unable to edit this source.';
					sendJson(response, 400, { error: message });
				}
			});
		},
	};
}
