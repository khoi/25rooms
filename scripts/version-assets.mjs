import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [directory = 'dist', version = process.env.GITHUB_SHA] = process.argv.slice(2);
assert(version && /^[a-zA-Z0-9-]+$/.test(version), 'Provide an asset version or GITHUB_SHA');
const root = resolve(directory);
for (const file of readdirSync(root, { recursive: true })) {
  if (!file.endsWith('.js')) continue;
  const path = join(root, file);
  const source = readFileSync(path, 'utf8');
  const updated = source.replace(/(\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)(['"])(\.{1,2}\/[^'"?]+\.js)(?:\?v=[a-zA-Z0-9-]+)?\2/g, (_, prefix, quote, asset) => `${prefix}${quote}${asset}?v=${version}${quote}`);
  if (updated !== source) writeFileSync(path, updated);
}
const entrypoint = join(root, 'index.html');
let html = readFileSync(entrypoint, 'utf8');
html = html.replace(/"(\.\/[^"?]+\.(?:css|js))(?:\?v=[a-zA-Z0-9-]+)?"/g, (_, asset) => `"${asset}?v=${version}"`);
html = html.replace(/href="(\?collection=[^"&]+)(?:&amp;v=[a-zA-Z0-9-]+)?"/g, (_, href) => `href="${href}&amp;v=${version}"`);
writeFileSync(entrypoint, html);
