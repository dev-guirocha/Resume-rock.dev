import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('o build gera a página inicial', () => {
  assert.ok(existsSync('dist/index.html'), 'dist/index.html não existe — rode o build');
});
