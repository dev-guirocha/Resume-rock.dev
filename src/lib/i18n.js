export const LANGS = ['pt', 'en'];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function t(value, lang) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof value[lang] === 'string' && value[lang] !== '') {
    return value[lang];
  }
  throw new Error(`Texto sem tradução para "${lang}": ${JSON.stringify(value)}`);
}

export function withBase(path) {
  return `${BASE}/${encodeURI(path.replace(/^\//, ''))}`;
}

export function langHome(lang) {
  return lang === 'pt' ? withBase('') : withBase('en/');
}
