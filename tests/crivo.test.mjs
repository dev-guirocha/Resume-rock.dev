// crivo-sentinela-tests
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const dir = mkdtempSync(join(tmpdir(), 'crivo-'));
function runWith(terms) {
  const list = join(dir, `list-${Math.random().toString(36).slice(2)}.txt`);
  writeFileSync(list, terms.join('\n') + '\n');
  return spawnSync(process.execPath, ['scripts/crivo.mjs'], {
    env: { ...process.env, RESUME_DENYLIST: list },
    encoding: 'utf8',
  });
}

test('crivo acusa palavra inteira presente no site', () => {
  const r = runWith(['Analista']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /"Analista"/);
});

test('crivo não acusa termo que só aparece dentro de outra palavra', () => {
  // fragmento montado em duas partes: só existe dentro de palavras (certificado, certificações), nunca isolado
  const r = runWith(['ifi' + 'c']);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /1 termos × \d+ arquivos conferidos/);
});

test('o mesmo trecho isolado é acusado (prova que o teste anterior não é vazio)', () => {
  const r = runWith(['certifi' + 'cado']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
});

test('crivo também varre tests/', () => {
  const r = runWith(['crivo-sentinela-tests']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /tests/);
});

test('crivo falha com lista ausente', () => {
  const r = spawnSync(process.execPath, ['scripts/crivo.mjs'], {
    env: { ...process.env, RESUME_DENYLIST: join(dir, 'nao-existe.txt') },
    encoding: 'utf8',
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /lista não encontrada/);
});
