import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DATA = 'src/data';
const LANGS = ['pt', 'en'];
const load = (f) => JSON.parse(readFileSync(join(DATA, f), 'utf8'));
const files = existsSync(DATA) ? readdirSync(DATA).filter((f) => f.endsWith('.json')) : [];

function collectBilingual(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((n, i) => collectBilingual(n, `${path}[${i}]`, out));
  } else if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    if (keys.includes('pt') || keys.includes('en')) out.push({ path, node });
    else keys.forEach((k) => collectBilingual(node[k], `${path}.${k}`, out));
  }
}

test('existem os 7 arquivos de dados', () => {
  assert.deepEqual([...files].sort(), [
    'courses.json', 'education.json', 'experience.json', 'profile.json',
    'projects.json', 'skills.json', 'ui.json',
  ]);
});

test('todo texto bilíngue tem pt e en não vazios', () => {
  const found = [];
  for (const f of files) collectBilingual(load(f), f, found);
  assert.ok(found.length > 0, 'nenhum texto bilíngue conferido');
  const bad = found.filter(({ node }) =>
    Object.keys(node).sort().join() !== 'en,pt' ||
    LANGS.some((l) => typeof node[l] !== 'string' || node[l].trim() === ''));
  assert.deepEqual(bad.map((b) => b.path), [], 'textos com tradução faltando ou vazia');
  console.log(`# textos bilíngues conferidos: ${found.length}`);
});

test('os 20 cursos têm PDF existente nos dois idiomas', () => {
  const courses = load('courses.json');
  assert.equal(courses.length, 20);
  const missing = [];
  for (const c of courses) {
    for (const l of LANGS) if (!existsSync(join('public', c.links[l]))) missing.push(`${c.id}/${l}`);
  }
  assert.deepEqual(missing, []);
  console.log(`# PDFs conferidos: ${courses.length * LANGS.length}`);
});

test('toda categoria de curso tem rótulo na interface', () => {
  const ui = load('ui.json');
  const cats = [...new Set(load('courses.json').map((c) => c.category))];
  assert.ok(cats.length > 0);
  assert.deepEqual(cats.filter((c) => !ui.courses.categories[c]), []);
});

test('hero tem exatamente 4 KPIs', () => {
  assert.equal(load('profile.json').kpis.length, 4);
});

test('dados não contêm CPF, RG nem valor em reais', () => {
  const patterns = [/\d{3}\.\d{3}\.\d{3}-\d{2}/, /\bR\$\s?\d/, /\bRG\b/];
  const hits = [];
  for (const f of files) {
    const text = readFileSync(join(DATA, f), 'utf8');
    for (const p of patterns) if (p.test(text)) hits.push(`${f}: ${p}`);
  }
  assert.deepEqual(hits, []);
});
