import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const listPath = process.env.RESUME_DENYLIST || join(homedir(), 'RIXP-dados-local', 'resume-denylist.txt');
if (!existsSync(listPath)) {
  console.error(`crivo: lista não encontrada em ${listPath}`);
  process.exit(1);
}
const terms = readFileSync(listPath, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));
if (terms.length === 0) {
  console.error('crivo: lista vazia, nada conferido');
  process.exit(1);
}
if (!existsSync('dist')) {
  console.error('crivo: rode npm run build antes');
  process.exit(1);
}

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const files = [
  ...walk('src', ['.json', '.astro', '.js', '.css']),
  ...walk('dist', ['.html']),
  ...walk('docs', ['.md']),
  ...walk('tests', ['.mjs', '.js']),
  ...walk('scripts', ['.mjs', '.js']),
  ...walk('.github', ['.yml', '.yaml']),
  'README.md',
];
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patterns = terms.map((term) => ({
  term,
  re: new RegExp(`(?<![\\p{L}\\p{N}])${escape(term)}(?![\\p{L}\\p{N}])`, 'iu'),
}));
const hits = [];
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const { term, re } of patterns) if (re.test(text)) hits.push(`${f}: "${term}"`);
}
console.log(`crivo: ${terms.length} termos × ${files.length} arquivos conferidos`);
if (hits.length) {
  console.error(hits.join('\n'));
  process.exit(1);
}
console.log('crivo: nenhum termo encontrado');
