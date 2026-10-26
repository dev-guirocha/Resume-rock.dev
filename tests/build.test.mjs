import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const BASE = '/Resume-rock.dev';
const LANGS = ['pt', 'en'];
const pageFile = (lang) => (lang === 'pt' ? 'dist/index.html' : 'dist/en/index.html');
const page = (lang) => readFileSync(pageFile(lang), 'utf8');
const count = (html, marker) => html.split(marker).length - 1;

test('gera uma página por idioma com o lang certo', () => {
  for (const lang of LANGS) assert.ok(existsSync(pageFile(lang)), `${pageFile(lang)} não existe`);
  assert.match(page('pt'), /<html lang="pt-BR"/);
  assert.match(page('en'), /<html lang="en"/);
});

test('hero mostra o cargo e 4 KPIs em cada idioma', () => {
  assert.match(page('pt'), /Analista de BI/);
  assert.match(page('en'), /BI Analyst/);
  for (const lang of LANGS) assert.equal(count(page(lang), 'data-kpi'), 4, lang);
});

test('seletor de idioma aponta para as duas páginas', () => {
  for (const lang of LANGS) {
    assert.match(page(lang), new RegExp(`href="${BASE}/"`));
    assert.match(page(lang), new RegExp(`href="${BASE}/en/"`));
  }
});
