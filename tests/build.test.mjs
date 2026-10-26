import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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

test('seções de experiência, projetos, competências e formação existem nos dois idiomas', () => {
  for (const lang of LANGS) {
    for (const id of ['experiencia', 'projetos', 'competencias', 'formacao']) {
      assert.match(page(lang), new RegExp(`id="${id}"`), `${lang}: falta #${id}`);
    }
  }
});

test('experiência: 2 entradas e o cargo na Comissão de SI', () => {
  assert.match(page('pt'), /Diretor da Comissão de Segurança da Informação/);
  assert.match(page('en'), /Director, Information Security Committee/);
  assert.match(page('pt'), /4 sistemas em produção em 4 meses/);
  for (const lang of LANGS) assert.equal(count(page(lang), 'data-job'), 2, lang);
});

test('projetos: 3 cards e nenhum link morto', () => {
  for (const lang of LANGS) {
    assert.equal(count(page(lang), 'data-project'), 3, lang);
    assert.doesNotMatch(page(lang), /href="#"/);
  }
});

test('competências: 4 grupos; formação: 3 itens sem IFS', () => {
  for (const lang of LANGS) {
    assert.equal(count(page(lang), 'data-skill-group'), 4, lang);
    assert.equal(count(page(lang), 'data-education'), 3, lang);
    assert.doesNotMatch(page(lang), /IFS|Instituto Federal/);
  }
});

test('20 cursos por idioma, cada certificado aponta para um PDF que existe em dist', () => {
  for (const lang of LANGS) {
    const html = page(lang);
    assert.equal(count(html, 'data-course-item'), 20, lang);
    const hrefs = [...html.matchAll(/<a[^>]*class="course__link"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(hrefs.length, 20, `${lang}: links de certificado`);
    for (const href of hrefs) {
      assert.ok(href.startsWith(`${BASE}/`), href);
      const file = join('dist', decodeURI(href.slice(BASE.length + 1)));
      assert.ok(existsSync(file), `PDF ausente: ${file}`);
    }
    console.log(`# ${lang}: ${hrefs.length} links de certificado conferidos`);
  }
});

test('contato tem e-mail, LinkedIn e GitHub; rodapé tem o ano', () => {
  const year = String(new Date().getFullYear());
  for (const lang of LANGS) {
    const html = page(lang);
    assert.match(html, /id="contato"/);
    assert.match(html, /href="mailto:dev\.guirocha@gmail\.com"/);
    assert.match(html, /linkedin\.com\/in\/dev-guirocha/);
    assert.match(html, /github\.com\/dev-guirocha/);
    assert.match(html, new RegExp(`© ${year}`));
  }
});

test('KPI de Segurança da Informação traduzido no EN', () => {
  assert.match(page('pt'), /class="kpi__value">SI</);
  assert.match(page('en'), /class="kpi__value">InfoSec</);
  assert.doesNotMatch(page('en'), /class="kpi__value">SI</);
});

test('CSS: menu recolhe até 1080px e o hero de impressão usa uma coluna', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const navBlock = css.match(/@media \(max-width: 1080px\) \{([\s\S]*?)\n\}/);
  assert.ok(navBlock, 'falta o bloco @media (max-width: 1080px)');
  assert.match(navBlock[1], /\.site-nav__toggle \{ display: inline-block/);
  const printBlock = css.match(/@media print \{([\s\S]*?)\n\}/);
  assert.ok(printBlock, 'falta o bloco @media print');
  assert.match(printBlock[1], /\.hero \{ grid-template-columns: 1fr/);
});

test('não sobra arquivo do site antigo na raiz', () => {
  for (const f of ['index.html', 'script.js', 'style.css']) assert.ok(!existsSync(f), `${f} ainda existe`);
});
