# Resume redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer o site do currículo em Astro, posicionando o Guilherme como Analista de BI, com conteúdo em JSON bilíngue (PT/EN) e visual de painel escuro.

**Architecture:** Astro gera duas páginas estáticas (`/` em PT, `/en/` em EN) a partir dos mesmos arquivos em `src/data/`. Componentes `.astro` só leem dados via `t(valor, lang)`, que quebra o build se faltar tradução. Testes com `node:test` conferem os dados (antes do build) e o HTML gerado (depois do build).

**Tech Stack:** Astro 7.3.8 (versão fixa), Node 24, `node:test` (sem dependência extra de teste), CSS puro com tokens, GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-26-resume-redesign-design.md`

## Global Constraints

- Repositório **público**: nada de número do escritório, nome de cliente, assessor, colega, fornecedor ou plataforma terceira; sem print de sistema interno.
- Comissão de Segurança da Informação: só o cargo (**Diretor**) e o tema (mapeamento de controles, governança, LGPD).
- Certificados de pós-graduação **não** entram no repo (trazem CPF e RG).
- Todo texto visível existe em `pt` **e** `en`; falta de tradução quebra o build.
- URL final continua `https://dev-guirocha.github.io/Resume-rock.dev/` → `base: '/Resume-rock.dev'`.
- Trabalho só no branch `redesign`. **Não** fazer push, merge em `main` nem trocar a fonte do GitHub Pages sem OK explícito do Guilherme. O branch `master` não é tocado.
- Ambiente: Windows, Git Bash. Caminhos com espaço e acento sempre entre aspas.
- Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File Structure

```
astro.config.mjs            config (site, base)
package.json                scripts e dependência fixa do Astro
.github/workflows/deploy.yml  build + testes + publicação no Pages
scripts/crivo.mjs           varredura local de termos proibidos (lista fora do repo)
public/images/...           foto, prints e PDFs dos cursos (movidos de images/)
src/data/profile.json       nome, cargo, resumo, links, KPIs
src/data/experience.json    linha do tempo
src/data/projects.json      cards de projeto
src/data/skills.json        grupos de competência
src/data/education.json     formação
src/data/courses.json       20 cursos (migrados de script.js)
src/data/ui.json            rótulos de interface
src/lib/i18n.js             t(), withBase(), langHome()
src/styles/global.css       tokens, layout, responsivo, impressão
src/layouts/Base.astro      <html>, <head>
src/components/*.astro      Header, Hero, KpiStrip, Timeline, Projects, SkillGroups,
                            Education, CourseList, Contact, ResumePage
src/pages/index.astro       PT
src/pages/en/index.astro    EN
tests/data.test.mjs         confere src/data (sem build)
tests/build.test.mjs        confere dist/ (depois do build)
```

Todos os comandos rodam a partir de `C:/Users/guilherme.rocha/Documents/Resume-rock.dev`.

---

### Task 1: Esqueleto Astro, assets em `public/` e harness de teste

**Files:**
- Create: `package.json`, `astro.config.mjs`, `src/pages/index.astro`, `tests/build.test.mjs`
- Modify: `.gitignore`
- Move: `images/` → `public/images/`

**Interfaces:**
- Produces: `npm run build` gera `dist/`; `npm test` = build + todos os testes; `npm run test:data` roda só os testes de dados.

- [ ] **Step 1: Confirmar branch e árvore limpa**

Run: `git status -sb`
Expected: `## redesign` e nenhuma alteração pendente.

- [ ] **Step 2: Criar `package.json`**

```json
{
  "name": "resume-rock-dev",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test:data": "node --test tests/data.test.mjs",
    "test": "astro build && node --test \"tests/*.test.mjs\"",
    "crivo": "node scripts/crivo.mjs"
  },
  "dependencies": {
    "astro": "7.3.8"
  }
}
```

- [ ] **Step 3: Criar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dev-guirocha.github.io',
  base: '/Resume-rock.dev',
});
```

- [ ] **Step 4: Acrescentar ao `.gitignore`**

Acrescente ao final do arquivo existente (não apague o que já existe):

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Mover as imagens para `public/`**

Run: `mkdir -p public && git mv images public/images && ls public/images`
Expected: `Certificates  MarmitasDaKa.png  MedControlApp.png  WalletAPP.png  certificados  perfil.png`

- [ ] **Step 6: Escrever o teste de fumaça (falha)**

`tests/build.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('o build gera a página inicial', () => {
  assert.ok(existsSync('dist/index.html'), 'dist/index.html não existe — rode o build');
});
```

Run: `node --test tests/build.test.mjs`
Expected: FAIL com `dist/index.html não existe`.

- [ ] **Step 7: Página provisória**

`src/pages/index.astro`:

```astro
---
---
<!doctype html>
<html lang="pt-BR">
  <head><meta charset="utf-8" /><title>Guilherme Rocha</title></head>
  <body><p>Em construção</p></body>
</html>
```

- [ ] **Step 8: Instalar e rodar**

Run: `npm install && npm test`
Expected: build sem erro e `# pass 1`, `# fail 0`. Se o build falhar por mudança de API do Astro 7, consultar https://docs.astro.build antes de alterar qualquer coisa.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs .gitignore src tests public
git commit -m "chore: esqueleto Astro com assets em public/ e harness de teste

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(`git mv` já registrou a remoção de `images/`.)

---

### Task 2: Camada de dados bilíngue com testes

**Files:**
- Create: `src/data/profile.json`, `src/data/experience.json`, `src/data/projects.json`, `src/data/skills.json`, `src/data/education.json`, `src/data/ui.json`, `src/data/courses.json`, `tests/data.test.mjs`
- Temporary (não commitar): `scripts/extract-courses.mjs`

**Interfaces:**
- Produces (formato que os componentes consomem):
  - Texto bilíngue = objeto `{ "pt": string, "en": string }`. Texto igual nos dois idiomas pode ser string simples.
  - `profile`: `{ name, role, summary, photo, email, links: { linkedin, github, instagram }, kpis: [{ value, label }] }`
  - `experience`: `[{ id, org, role, period?, highlights: [{ title, text?, items? }], tags? }]`
  - `projects`: `[{ id, name, image, url: string|null, tag, description, imageAlt }]`
  - `skills`: `[{ title, items: (string|bilíngue)[] }]`
  - `education`: `[{ course, institution, hours: number|null, period, status }]`
  - `courses`: `[{ id, category, title, links: { pt, en }, institution }]` (caminhos relativos a `public/`)
  - `ui`: `nav.{label,menu}`, `language.label`, `sections.{experiencia,projetos,competencias,formacao,cursos,contato}`, `hero.{photoAlt,email,kpisLabel}`, `projects.view`, `courses.{filterLabel,all,certificate,categories.<categoria>}`, `contact.text`, `footer.role`

- [ ] **Step 1: Escrever os testes de dados (falham)**

`tests/data.test.mjs`:

```js
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
```

Run: `npm run test:data`
Expected: FAIL (`existem os 7 arquivos de dados` e os demais quebram por arquivo ausente).

- [ ] **Step 2: Extrair os cursos de `script.js`**

`scripts/extract-courses.mjs` (temporário):

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync('script.js', 'utf8');
const marker = 'const courseData = ';
const start = src.indexOf(marker);
const end = src.indexOf('\n    ];', start);
if (start < 0 || end < 0) throw new Error('courseData não encontrado em script.js');
const literal = src.slice(start + marker.length, end + '\n    ]'.length);
const courses = new Function(`return ${literal};`)();
mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/courses.json', JSON.stringify(courses, null, 2) + '\n');
console.log(`cursos extraídos: ${courses.length}`);
```

Run: `node scripts/extract-courses.mjs && rm scripts/extract-courses.mjs && node -e "const c=require('./src/data/courses.json');console.log([...new Set(c.map(x=>x.category))])"`
Expected: `cursos extraídos: 20` e `[ 'ferramentas', 'frontend' ]`. Se aparecer outra categoria, acrescente o rótulo dela em `ui.json` no Step 3.

- [ ] **Step 3: Criar os demais arquivos de dados**

`src/data/profile.json`:

```json
{
  "name": "Guilherme Rocha",
  "role": { "pt": "Analista de BI", "en": "BI Analyst" },
  "summary": {
    "pt": "Construo ferramentas de dados de ponta a ponta no mercado financeiro, da fonte ao painel, com uso intensivo de IA no desenvolvimento.",
    "en": "I build end-to-end data tools for the financial market, from source to dashboard, with heavy use of AI in development."
  },
  "photo": "images/perfil.png",
  "email": "dev.guirocha@gmail.com",
  "links": {
    "linkedin": "https://linkedin.com/in/dev-guirocha",
    "github": "https://github.com/dev-guirocha",
    "instagram": "https://instagram.com/_guidev"
  },
  "kpis": [
    { "value": "4", "label": { "pt": "sistemas em produção", "en": "systems in production" } },
    { "value": "4", "label": { "pt": "meses (jul–out/2026)", "en": "months (Jul–Oct 2026)" } },
    { "value": "2", "label": { "pt": "pós-graduações concluídas", "en": "postgraduate degrees completed" } },
    { "value": "SI", "label": { "pt": "Diretor da Comissão de Segurança da Informação", "en": "Director, Information Security Committee" } }
  ]
}
```

`src/data/experience.json`:

```json
[
  {
    "id": "real-invest",
    "org": { "pt": "Real Invest — escritório XP Investimentos", "en": "Real Invest — XP Investimentos office" },
    "role": { "pt": "Analista de BI", "en": "BI Analyst" },
    "period": { "pt": "jul/2026 – atual", "en": "Jul 2026 – present" },
    "highlights": [
      {
        "title": { "pt": "Diretor da Comissão de Segurança da Informação", "en": "Director, Information Security Committee" },
        "text": { "pt": "mapeamento de controles, governança da informação e adequação à LGPD.", "en": "control mapping, information governance and LGPD (Brazilian data protection law) compliance." }
      },
      {
        "title": { "pt": "Especialista em IA aplicada", "en": "Applied AI specialist" },
        "text": { "pt": "desenvolvimento orientado por agentes (Claude Code e Codex com revisão cruzada), automação de rotinas e skills próprias.", "en": "agent-driven development (Claude Code and Codex with cross-review), routine automation and custom skills." }
      },
      {
        "title": { "pt": "4 sistemas em produção em 4 meses", "en": "4 production systems in 4 months" },
        "items": [
          { "pt": "Painéis de BI de captação, receita e acompanhamento 1:1 dos assessores, alimentados por exports e pela API da plataforma de CRM do escritório.", "en": "BI dashboards for net inflows, revenue and advisor 1:1 tracking, fed by exports and the office CRM platform's API." },
          { "pt": "Motor de comissões e repasse, com réguas por produto (investimentos, consórcio, seguros) e conciliação entre fontes.", "en": "Commission and payout engine with per-product rules (investments, consortium, insurance) and cross-source reconciliation." },
          { "pt": "Plataforma comercial/CRM em Supabase (PostgreSQL, PL/pgSQL, RLS) com front-end em React/Vite.", "en": "Sales/CRM platform on Supabase (PostgreSQL, PL/pgSQL, RLS) with a React/Vite front end." },
          { "pt": "Painel de TV de captação para o escritório.", "en": "Office TV dashboard for net inflows." }
        ]
      },
      {
        "title": { "pt": "Qualidade de dado como prática", "en": "Data quality as a practice" },
        "text": { "pt": "testes que travam regressão e reconciliação entre fontes antes de publicar qualquer número.", "en": "regression-locking tests and cross-source reconciliation before any number is published." }
      }
    ],
    "tags": ["SQL", "Python", "PostgreSQL", "Supabase", "React", "Claude Code"]
  },
  {
    "id": "freelancer",
    "org": { "pt": "Freelancer", "en": "Freelance" },
    "role": { "pt": "Desenvolvimento web e mobile", "en": "Web & mobile development" },
    "highlights": [
      {
        "title": { "pt": "Site da Marmitas da Ka", "en": "Marmitas da Ka website" },
        "text": { "pt": "landing page responsiva para negócio local.", "en": "responsive landing page for a local business." }
      },
      {
        "title": { "pt": "Aplicativos autônomos", "en": "Standalone apps" },
        "text": { "pt": "MedControlApp e @wallet App, do levantamento de requisitos à interface.", "en": "MedControlApp and @wallet App, from requirements to interface." }
      }
    ]
  }
]
```

`src/data/projects.json`:

```json
[
  {
    "id": "medcontrol",
    "name": "MedControlApp",
    "image": "images/MedControlApp.png",
    "url": null,
    "tag": { "pt": "Aplicativo mobile", "en": "Mobile app" },
    "description": { "pt": "Aplicativo mobile para acompanhamento de medicação e alertas inteligentes, com foco em acessibilidade e notificações precisas.", "en": "Mobile app for medication tracking and smart reminders, focused on accessibility and precise notifications." },
    "imageAlt": { "pt": "Tela do MedControlApp", "en": "MedControlApp screen" }
  },
  {
    "id": "marmitas",
    "name": "Marmitas da Ka",
    "image": "images/MarmitasDaKa.png",
    "url": null,
    "tag": { "pt": "Landing page", "en": "Landing page" },
    "description": { "pt": "Landing page responsiva para negócio local, com catálogo de produtos, depoimentos e chamada para ação otimizada para conversão.", "en": "Responsive landing page for a local business, with product catalog, testimonials and a conversion-focused call to action." },
    "imageAlt": { "pt": "Página inicial do site Marmitas da Ka", "en": "Marmitas da Ka website home page" }
  },
  {
    "id": "wallet",
    "name": "@wallet App",
    "image": "images/WalletAPP.png",
    "url": null,
    "tag": { "pt": "Dashboard web", "en": "Web dashboard" },
    "description": { "pt": "Interface web para monitoramento financeiro, com gráficos e filtros dinâmicos pensados para decisões rápidas.", "en": "Web interface for financial monitoring with dynamic charts and filters built for quick decisions." },
    "imageAlt": { "pt": "Painel do @wallet App", "en": "@wallet App dashboard" }
  }
]
```

`src/data/skills.json`:

```json
[
  {
    "title": { "pt": "Dados e BI", "en": "Data & BI" },
    "items": ["SQL", "Python", { "pt": "Modelagem de métricas", "en": "Metric modeling" }, "Dashboards", { "pt": "Conciliação de fontes", "en": "Source reconciliation" }]
  },
  {
    "title": { "pt": "Engenharia", "en": "Engineering" },
    "items": ["PostgreSQL", "Supabase (RLS, PL/pgSQL)", "React", "Vite", "Node.js", "Astro", "Git"]
  },
  {
    "title": { "pt": "IA e qualidade", "en": "AI & quality" },
    "items": ["Claude Code", "Codex", { "pt": "Desenvolvimento com agentes", "en": "Agent-driven development" }, { "pt": "Testes automatizados", "en": "Automated testing" }, { "pt": "Validação de dados", "en": "Data validation" }]
  },
  {
    "title": { "pt": "Segurança da informação", "en": "Information security" },
    "items": ["LGPD", { "pt": "Mapeamento de controles", "en": "Control mapping" }, { "pt": "Governança da informação", "en": "Information governance" }]
  }
]
```

`src/data/education.json`:

```json
[
  {
    "course": { "pt": "Tecnologia em Análise e Desenvolvimento de Sistemas", "en": "Associate degree in Systems Analysis and Development" },
    "institution": "Gran Faculdades",
    "hours": null,
    "period": { "pt": "previsão de conclusão: 2027.1", "en": "expected completion: first half of 2027" },
    "status": { "pt": "em andamento", "en": "in progress" }
  },
  {
    "course": { "pt": "Pós-graduação em Desenvolvimento Full Stack e Cloud Computing", "en": "Postgraduate specialization in Full Stack Development and Cloud Computing" },
    "institution": "Gran Centro Universitário",
    "hours": 360,
    "period": { "pt": "fev/2025 – mai/2026", "en": "Feb 2025 – May 2026" },
    "status": { "pt": "concluída", "en": "completed" }
  },
  {
    "course": { "pt": "Pós-graduação em Inteligência Artificial e Tecnologia na Gestão Pública", "en": "Postgraduate specialization in Artificial Intelligence and Technology in Public Management" },
    "institution": "Gran Centro Universitário",
    "hours": 360,
    "period": { "pt": "fev/2025 – ago/2025", "en": "Feb 2025 – Aug 2025" },
    "status": { "pt": "concluída", "en": "completed" }
  }
]
```

`src/data/ui.json`:

```json
{
  "nav": {
    "label": { "pt": "Navegação principal", "en": "Main navigation" },
    "menu": { "pt": "Menu", "en": "Menu" }
  },
  "language": { "label": { "pt": "Idioma", "en": "Language" } },
  "sections": {
    "experiencia": { "pt": "Experiência", "en": "Experience" },
    "projetos": { "pt": "Projetos", "en": "Projects" },
    "competencias": { "pt": "Competências", "en": "Skills" },
    "formacao": { "pt": "Formação", "en": "Education" },
    "cursos": { "pt": "Cursos e certificações", "en": "Courses & certifications" },
    "contato": { "pt": "Contato", "en": "Contact" }
  },
  "hero": {
    "photoAlt": { "pt": "Foto de Guilherme Rocha", "en": "Photo of Guilherme Rocha" },
    "email": { "pt": "Enviar e-mail", "en": "Send an email" },
    "kpisLabel": { "pt": "Destaques", "en": "Highlights" }
  },
  "projects": { "view": { "pt": "Ver projeto", "en": "View project" } },
  "courses": {
    "filterLabel": { "pt": "Filtrar cursos por categoria", "en": "Filter courses by category" },
    "all": { "pt": "Todos", "en": "All" },
    "certificate": { "pt": "Ver certificado", "en": "View certificate" },
    "categories": {
      "frontend": { "pt": "Front-end", "en": "Front-end" },
      "ferramentas": { "pt": "Ferramentas e metodologias", "en": "Tools & methodologies" }
    }
  },
  "contact": {
    "text": { "pt": "Estou aberto a conversas sobre dados, BI e produtos de dados. Escolha o canal:", "en": "I'm open to conversations about data, BI and data products. Pick a channel:" }
  },
  "footer": { "role": { "pt": "Analista de BI — Real Invest", "en": "BI Analyst — Real Invest" } }
}
```

- [ ] **Step 4: Rodar os testes de dados**

Run: `npm run test:data`
Expected: `# pass 6`, `# fail 0`, com as linhas `# textos bilíngues conferidos: N` (N > 0) e `# PDFs conferidos: 40`.

- [ ] **Step 5: Provar que a trava de tradução falha**

Apague temporariamente a chave `"en"` de `ui.sections.contato` em `src/data/ui.json`.
Run: `npm run test:data`
Expected: FAIL em `todo texto bilíngue tem pt e en não vazios`, listando `ui.json.sections.contato`.
Recoloque `"en": "Contact"` (o arquivo ainda não está commitado, então `git checkout` não serve). Rode `npm run test:data` de novo: `# fail 0`.

- [ ] **Step 6: Commit**

```bash
git status --short scripts   # deve estar vazio: o extrator não é commitado
git add src/data tests/data.test.mjs
git commit -m "feat: conteúdo do currículo em JSON bilíngue com testes de dados

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: i18n, layout base, estilos, cabeçalho e hero nas duas línguas

**Files:**
- Create: `src/lib/i18n.js`, `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Hero.astro`, `src/components/KpiStrip.astro`, `src/components/ResumePage.astro`, `src/pages/en/index.astro`
- Modify: `src/pages/index.astro` (substitui a página provisória), `tests/build.test.mjs`

**Interfaces:**
- Consumes: `src/data/profile.json`, `src/data/ui.json` (Task 2).
- Produces:
  - `t(value, lang) → string` — string passa direto; objeto `{pt,en}` devolve o idioma; qualquer outra coisa lança erro.
  - `withBase(path) → string` — `'/Resume-rock.dev/' + encodeURI(path)`.
  - `langHome(lang) → string` — `/Resume-rock.dev/` ou `/Resume-rock.dev/en/`.
  - `ResumePage` recebe `lang: 'pt' | 'en'`. Componentes de seção recebem `lang` e mais nada.
  - Marcadores de teste no HTML: `data-kpi`.

- [ ] **Step 1: Substituir `tests/build.test.mjs` pelos testes do hero (falham)**

```js
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
```

Run: `npm test`
Expected: FAIL (`dist/en/index.html não existe`).

- [ ] **Step 2: `src/lib/i18n.js`**

```js
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
```

- [ ] **Step 3: `src/styles/global.css`**

```css
:root {
  --bg: #0b0f14;
  --surface: #121a24;
  --surface-2: #17212e;
  --border: #243142;
  --text: #e6edf3;
  --muted: #9fb0c2;
  --accent: #38bdf8;
  --accent-strong: #7dd3fc;
  --radius: 12px;
  --gutter: 16px;
  --max: 1080px;
  --font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color-scheme: dark;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font); line-height: 1.6; }
img { max-width: 100%; display: block; }
a { color: var(--accent); }
a:hover { color: var(--accent-strong); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.container { width: 100%; max-width: var(--max); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: 56px; border-top: 1px solid var(--border); }
.section__title { font-size: 1.5rem; margin: 0 0 24px; }

/* cabeçalho */
.site-header { position: sticky; top: 0; z-index: 10; background: rgba(11, 15, 20, 0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.site-header__inner { display: flex; align-items: center; gap: 16px; min-height: 60px; }
.site-header__logo { font-weight: 700; color: var(--text); text-decoration: none; margin-right: auto; }
.site-nav__toggle { display: none; }
.site-nav__list { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
.site-nav__list a { color: var(--muted); text-decoration: none; font-size: 0.95rem; }
.site-nav__list a:hover { color: var(--text); }
.lang-switch { display: flex; gap: 4px; }
.lang-switch a { padding: 4px 8px; border: 1px solid var(--border); border-radius: 6px; color: var(--muted); text-decoration: none; font-size: 0.85rem; }
.lang-switch a[aria-current="page"] { background: var(--accent); border-color: var(--accent); color: var(--bg); }

/* hero */
.hero { display: grid; grid-template-columns: 160px 1fr; gap: 32px; align-items: center; padding-block: 56px; }
.hero__photo { width: 160px; height: 160px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }
.hero__name { font-size: clamp(2rem, 5vw, 3rem); margin: 0; line-height: 1.1; }
.hero__role { color: var(--accent); font-weight: 600; font-size: 1.25rem; margin: 4px 0 12px; }
.hero__summary { color: var(--muted); max-width: 60ch; margin: 0 0 20px; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
.button { display: inline-block; padding: 10px 18px; border-radius: 8px; background: var(--accent); color: var(--bg); font-weight: 600; text-decoration: none; }
.button:hover { background: var(--accent-strong); color: var(--bg); }
.button--ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
.button--ghost:hover { background: var(--surface-2); color: var(--text); }
.kpis { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; list-style: none; margin: 16px 0 0; padding: 0; }
.kpi { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
.kpi__value { display: block; font-size: 2rem; font-weight: 700; color: var(--accent); line-height: 1.1; font-variant-numeric: tabular-nums; }
.kpi__label { display: block; color: var(--muted); font-size: 0.9rem; margin-top: 4px; }

/* experiência */
.timeline { list-style: none; margin: 0; padding: 0 0 0 20px; border-left: 2px solid var(--border); }
.timeline__item { position: relative; padding: 0 0 32px 16px; }
.timeline__item::before { content: ''; position: absolute; left: -27px; top: 8px; width: 12px; height: 12px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--bg); }
.timeline__head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; align-items: baseline; }
.timeline__org { margin: 0; font-size: 1.15rem; }
.timeline__period { color: var(--muted); font-size: 0.9rem; font-variant-numeric: tabular-nums; }
.timeline__role { margin: 2px 0 12px; color: var(--accent); font-weight: 600; }
.timeline__highlights { margin: 0; padding-left: 18px; display: grid; gap: 10px; }
.timeline__highlights span { color: var(--muted); }
.timeline__sub { margin: 6px 0 0; padding-left: 18px; color: var(--muted); }
.tags { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 12px 0 0; padding: 0; }
.tags li { background: var(--surface-2); border: 1px solid var(--border); border-radius: 999px; padding: 2px 10px; font-size: 0.85rem; }

/* projetos */
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; }
.card__img { aspect-ratio: 16 / 10; object-fit: cover; width: 100%; background: var(--surface-2); }
.card__body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.card__body p { margin: 0; color: var(--muted); }
.card__tag { font-size: 0.8rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; }
.card__title { margin: 0; font-size: 1.1rem; }
.card__link { margin-top: auto; font-weight: 600; }

/* competências */
.skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.skills__group { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
.skills__group h3 { margin: 0; font-size: 1rem; }

/* formação */
.education { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.education__item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
.education__item h3 { margin: 0 0 4px; font-size: 1.05rem; }
.education__meta, .education__period { margin: 0; color: var(--muted); font-size: 0.95rem; }

/* cursos */
.filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.filter button { font: inherit; font-size: 0.9rem; padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; }
.filter button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--bg); }
.courses { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 8px; }
.course { display: grid; grid-template-columns: 1fr auto; gap: 2px 12px; padding: 10px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
.course[hidden] { display: none; }
.course__title { grid-column: 1; font-size: 0.95rem; }
.course__inst { grid-column: 1; color: var(--muted); font-size: 0.8rem; }
.course__link { grid-column: 2; grid-row: 1 / 3; align-self: center; font-size: 0.85rem; white-space: nowrap; }

/* contato e rodapé */
.contact { display: flex; flex-wrap: wrap; gap: 12px; list-style: none; padding: 0; margin: 16px 0 0; }
.contact a { display: inline-block; padding: 10px 16px; border: 1px solid var(--border); border-radius: 8px; color: var(--text); text-decoration: none; }
.contact a:hover { background: var(--surface-2); }
.site-footer { border-top: 1px solid var(--border); padding-block: 24px; color: var(--muted); font-size: 0.85rem; text-align: center; }

@media (max-width: 768px) {
  .site-nav__toggle { display: inline-block; font: inherit; background: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 4px 10px; }
  .site-nav__list { display: none; position: absolute; top: 60px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 8px var(--gutter); }
  .site-nav__list.is-open { display: flex; }
  .site-nav__list a { display: block; padding: 10px 0; }
  .hero { grid-template-columns: 1fr; gap: 20px; }
  .hero__photo { width: 112px; height: 112px; }
  .kpis { grid-template-columns: repeat(2, 1fr); }
  .courses { grid-template-columns: 1fr; }
}

@media print {
  :root { --bg: #fff; --surface: #fff; --surface-2: #f3f4f6; --border: #d1d5db; --text: #111827; --muted: #374151; --accent: #0b5394; --accent-strong: #0b5394; color-scheme: light; }
  body { font-size: 11pt; }
  .site-header, .filter, .hero__actions, .hero__photo, .card__img, .course__link { display: none !important; }
  .section { padding-block: 16px; }
  .timeline__item, .card, .education__item, .skills__group, .kpi { break-inside: avoid; }
  .course[hidden] { display: grid; }
  a { color: var(--text); text-decoration: none; }
}
```

- [ ] **Step 4: `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import { langHome } from '../lib/i18n.js';

const { lang, title, description } = Astro.props;
const htmlLang = lang === 'pt' ? 'pt-BR' : 'en';
---
<!doctype html>
<html lang={htmlLang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="alternate" hreflang="pt-BR" href={new URL(langHome('pt'), Astro.site).href} />
    <link rel="alternate" hreflang="en" href={new URL(langHome('en'), Astro.site).href} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 5: `src/components/Header.astro`**

```astro
---
import profile from '../data/profile.json';
import ui from '../data/ui.json';
import { t, langHome } from '../lib/i18n.js';

const { lang } = Astro.props;
const sections = ['experiencia', 'projetos', 'competencias', 'formacao', 'cursos', 'contato'];
---
<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__logo" href="#topo">{profile.name}</a>
    <nav class="site-nav" aria-label={t(ui.nav.label, lang)}>
      <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-list">{t(ui.nav.menu, lang)}</button>
      <ul class="site-nav__list" id="site-nav-list">
        {sections.map((id) => <li><a href={`#${id}`}>{t(ui.sections[id], lang)}</a></li>)}
      </ul>
    </nav>
    <div class="lang-switch" role="group" aria-label={t(ui.language.label, lang)}>
      <a href={langHome('pt')} hreflang="pt-BR" aria-current={lang === 'pt' ? 'page' : undefined}>PT</a>
      <a href={langHome('en')} hreflang="en" aria-current={lang === 'en' ? 'page' : undefined}>EN</a>
    </div>
  </div>
</header>

<script>
  const toggle = document.querySelector('.site-nav__toggle');
  const list = document.getElementById('site-nav-list');
  if (toggle && list) {
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      list.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      list.classList.toggle('is-open', !open);
    });
    list.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) close();
    });
  }
</script>
```

- [ ] **Step 6: `src/components/KpiStrip.astro` e `src/components/Hero.astro`**

`KpiStrip.astro`:

```astro
---
import profile from '../data/profile.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<ul class="kpis" aria-label={t(ui.hero.kpisLabel, lang)}>
  {profile.kpis.map((kpi) => (
    <li class="kpi" data-kpi>
      <span class="kpi__value">{kpi.value}</span>
      <span class="kpi__label">{t(kpi.label, lang)}</span>
    </li>
  ))}
</ul>
```

`Hero.astro`:

```astro
---
import profile from '../data/profile.json';
import ui from '../data/ui.json';
import KpiStrip from './KpiStrip.astro';
import { t, withBase } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="hero container" id="topo">
  <img class="hero__photo" src={withBase(profile.photo)} alt={t(ui.hero.photoAlt, lang)} width="160" height="160" />
  <div class="hero__text">
    <h1 class="hero__name">{profile.name}</h1>
    <p class="hero__role">{t(profile.role, lang)}</p>
    <p class="hero__summary">{t(profile.summary, lang)}</p>
    <div class="hero__actions">
      <a class="button" href={`mailto:${profile.email}`}>{t(ui.hero.email, lang)}</a>
      <a class="button button--ghost" href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      <a class="button button--ghost" href={profile.links.github} target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
  <KpiStrip lang={lang} />
</section>
```

- [ ] **Step 7: `ResumePage.astro` e as duas páginas**

`src/components/ResumePage.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from './Header.astro';
import Hero from './Hero.astro';
import profile from '../data/profile.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
const year = new Date().getFullYear();
---
<Base lang={lang} title={`${profile.name} · ${t(profile.role, lang)}`} description={t(profile.summary, lang)}>
  <Header lang={lang} />
  <main>
    <Hero lang={lang} />
  </main>
  <footer class="site-footer">
    <p>© {year} {profile.name} · {t(ui.footer.role, lang)}</p>
  </footer>
</Base>
```

`src/pages/index.astro` (substitui o conteúdo provisório):

```astro
---
import ResumePage from '../components/ResumePage.astro';
---
<ResumePage lang="pt" />
```

`src/pages/en/index.astro`:

```astro
---
import ResumePage from '../../components/ResumePage.astro';
---
<ResumePage lang="en" />
```

- [ ] **Step 8: Rodar**

Run: `npm test`
Expected: `# fail 0` (6 testes de dados + 3 de build).

- [ ] **Step 9: Commit**

```bash
git add src tests
git commit -m "feat: layout base, tokens de cor, cabeçalho com PT/EN e hero com KPIs

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Experiência, projetos, competências e formação

**Files:**
- Create: `src/components/Timeline.astro`, `src/components/Projects.astro`, `src/components/SkillGroups.astro`, `src/components/Education.astro`
- Modify: `src/components/ResumePage.astro`, `tests/build.test.mjs`

**Interfaces:**
- Consumes: `t`, `withBase` (Task 3); `experience.json`, `projects.json`, `skills.json`, `education.json`, `ui.json` (Task 2).
- Produces: seções com `id` `experiencia`, `projetos`, `competencias`, `formacao`; marcadores `data-job`, `data-project`, `data-skill-group`, `data-education`.

- [ ] **Step 1: Acrescentar testes ao final de `tests/build.test.mjs` (falham)**

```js
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
```

Run: `npm test`
Expected: FAIL nos 4 testes novos.

- [ ] **Step 2: `src/components/Timeline.astro`**

```astro
---
import experience from '../data/experience.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="section container" id="experiencia">
  <h2 class="section__title">{t(ui.sections.experiencia, lang)}</h2>
  <ol class="timeline">
    {experience.map((job) => (
      <li class="timeline__item" data-job>
        <div class="timeline__head">
          <h3 class="timeline__org">{t(job.org, lang)}</h3>
          {job.period && <span class="timeline__period">{t(job.period, lang)}</span>}
        </div>
        <p class="timeline__role">{t(job.role, lang)}</p>
        <ul class="timeline__highlights">
          {job.highlights.map((h) => (
            <li>
              <strong>{t(h.title, lang)}</strong>
              {h.text && <span>: {t(h.text, lang)}</span>}
              {h.items && (
                <ul class="timeline__sub">
                  {h.items.map((item) => <li>{t(item, lang)}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {job.tags && <ul class="tags">{job.tags.map((tag) => <li>{tag}</li>)}</ul>}
      </li>
    ))}
  </ol>
</section>
```

- [ ] **Step 3: `src/components/Projects.astro`**

```astro
---
import projects from '../data/projects.json';
import ui from '../data/ui.json';
import { t, withBase } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="section container" id="projetos">
  <h2 class="section__title">{t(ui.sections.projetos, lang)}</h2>
  <div class="cards">
    {projects.map((p) => (
      <article class="card" data-project>
        <img class="card__img" src={withBase(p.image)} alt={t(p.imageAlt, lang)} loading="lazy" />
        <div class="card__body">
          <span class="card__tag">{t(p.tag, lang)}</span>
          <h3 class="card__title">{p.name}</h3>
          <p>{t(p.description, lang)}</p>
          {p.url && <a class="card__link" href={p.url} target="_blank" rel="noopener">{t(ui.projects.view, lang)}</a>}
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 4: `src/components/SkillGroups.astro`**

```astro
---
import skills from '../data/skills.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="section container" id="competencias">
  <h2 class="section__title">{t(ui.sections.competencias, lang)}</h2>
  <div class="skills">
    {skills.map((group) => (
      <div class="skills__group" data-skill-group>
        <h3>{t(group.title, lang)}</h3>
        <ul class="tags">{group.items.map((item) => <li>{t(item, lang)}</li>)}</ul>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 5: `src/components/Education.astro`**

```astro
---
import education from '../data/education.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="section container" id="formacao">
  <h2 class="section__title">{t(ui.sections.formacao, lang)}</h2>
  <ul class="education">
    {education.map((e) => (
      <li class="education__item" data-education>
        <h3>{t(e.course, lang)}</h3>
        <p class="education__meta">{e.institution}{e.hours ? ` · ${e.hours}h` : ''}</p>
        <p class="education__period">{t(e.period, lang)} · {t(e.status, lang)}</p>
      </li>
    ))}
  </ul>
</section>
```

- [ ] **Step 6: Ligar as seções em `ResumePage.astro`**

No frontmatter, depois de `import Hero from './Hero.astro';`, acrescente:

```astro
import Timeline from './Timeline.astro';
import Projects from './Projects.astro';
import SkillGroups from './SkillGroups.astro';
import Education from './Education.astro';
```

Troque o `<main>` por:

```astro
  <main>
    <Hero lang={lang} />
    <Timeline lang={lang} />
    <Projects lang={lang} />
    <SkillGroups lang={lang} />
    <Education lang={lang} />
  </main>
```

- [ ] **Step 7: Rodar**

Run: `npm test`
Expected: `# fail 0`.

- [ ] **Step 8: Commit**

```bash
git add src tests
git commit -m "feat: seções de experiência, projetos, competências e formação

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Cursos com filtro e contato

**Files:**
- Create: `src/components/CourseList.astro`, `src/components/Contact.astro`
- Modify: `src/components/ResumePage.astro`, `tests/build.test.mjs`

**Interfaces:**
- Consumes: `t`, `withBase` (Task 3); `courses.json`, `profile.json`, `ui.json` (Task 2).
- Produces: seções `#cursos` e `#contato`; marcador `data-course-item` com `data-category`; links `class="course__link"`.

- [ ] **Step 1: Acrescentar testes ao final de `tests/build.test.mjs` (falham)**

```js
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
```

Run: `npm test`
Expected: FAIL no teste de cursos (0 itens) e no de contato (falta `#contato`).

- [ ] **Step 2: `src/components/CourseList.astro`**

```astro
---
import courses from '../data/courses.json';
import ui from '../data/ui.json';
import { t, withBase } from '../lib/i18n.js';

const { lang } = Astro.props;
const categories = [...new Set(courses.map((c) => c.category))];
---
<section class="section container" id="cursos">
  <h2 class="section__title">{t(ui.sections.cursos, lang)}</h2>
  <div class="filter" role="group" aria-label={t(ui.courses.filterLabel, lang)} data-course-filter>
    <button type="button" data-category="todos" aria-pressed="true">{t(ui.courses.all, lang)}</button>
    {categories.map((c) => (
      <button type="button" data-category={c} aria-pressed="false">{t(ui.courses.categories[c], lang)}</button>
    ))}
  </div>
  <ul class="courses">
    {courses.map((c) => (
      <li class="course" data-course-item data-category={c.category}>
        <span class="course__title">{t(c.title, lang)}</span>
        <span class="course__inst">{c.institution}</span>
        <a class="course__link" href={withBase(c.links[lang])} target="_blank" rel="noopener">{t(ui.courses.certificate, lang)}</a>
      </li>
    ))}
  </ul>
</section>

<script>
  const filter = document.querySelector('[data-course-filter]');
  if (filter) {
    const buttons = filter.querySelectorAll('button[data-category]');
    const items = document.querySelectorAll('[data-course-item]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        items.forEach((item) => {
          const show = category === 'todos' || item.getAttribute('data-category') === category;
          item.toggleAttribute('hidden', !show);
        });
      });
    });
  }
</script>
```

- [ ] **Step 3: `src/components/Contact.astro`**

```astro
---
import profile from '../data/profile.json';
import ui from '../data/ui.json';
import { t } from '../lib/i18n.js';

const { lang } = Astro.props;
---
<section class="section container" id="contato">
  <h2 class="section__title">{t(ui.sections.contato, lang)}</h2>
  <p>{t(ui.contact.text, lang)}</p>
  <ul class="contact">
    <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
    <li><a href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
    <li><a href={profile.links.github} target="_blank" rel="noopener">GitHub</a></li>
    <li><a href={profile.links.instagram} target="_blank" rel="noopener">Instagram</a></li>
  </ul>
</section>
```

- [ ] **Step 4: Ligar em `ResumePage.astro`**

Acrescente aos imports:

```astro
import CourseList from './CourseList.astro';
import Contact from './Contact.astro';
```

E, dentro de `<main>`, depois de `<Education lang={lang} />`:

```astro
    <CourseList lang={lang} />
    <Contact lang={lang} />
```

- [ ] **Step 5: Rodar**

Run: `npm test`
Expected: `# fail 0`, com `# pt: 20 links de certificado conferidos` e `# en: 20 links de certificado conferidos`.

- [ ] **Step 6: Commit**

```bash
git add src tests
git commit -m "feat: lista de cursos com filtro por categoria e seção de contato

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Verificação visual no navegador

**Files:**
- Modify: `src/styles/global.css` só se a verificação achar defeito (registrar o que mudou no commit).

- [ ] **Step 1: Subir a prévia**

Run (em background): `npm run build && npx astro preview --port 4321`
Abrir: `http://localhost:4321/Resume-rock.dev/` e `http://localhost:4321/Resume-rock.dev/en/`

- [ ] **Step 2: Desktop, nas duas línguas**

Conferir com screenshot: cabeçalho fixo, hero com foto + 4 KPIs em uma linha, linha do tempo com 2 entradas, 3 cards de projeto sem botão de link, 4 grupos de competência, 3 itens de formação, 20 cursos, contato, rodapé. O seletor PT/EN troca de página e marca o idioma ativo.

- [ ] **Step 3: Filtro de cursos**

Clicar em cada categoria e em "Todos". Contar itens visíveis com:
`[...document.querySelectorAll('[data-course-item]')].filter(e => !e.hidden).length`
Expected: soma das categorias = 20; "Todos" = 20.

- [ ] **Step 4: Celular (375 × 812)**

Conferir: sem rolagem horizontal (`document.documentElement.scrollWidth <= window.innerWidth` → `true`), menu abre e fecha pelo botão e fecha ao clicar num link, KPIs em 2 colunas, margem lateral de 16px.

- [ ] **Step 5: Impressão**

Com a emulação de mídia `print` do DevTools (ou a prévia do Ctrl+P), conferir fundo branco, texto escuro, sem cabeçalho/filtro/fotos e com os 20 cursos visíveis.

- [ ] **Step 6: Contraste**

Conferir AA (≥ 4.5:1) para `--text`, `--muted` e `--accent` sobre `--bg` e `--surface`, e `--bg` sobre `--accent` (botão). Declarar quantos pares foram conferidos.

- [ ] **Step 7: Commit (só se houve correção)**

```bash
git add src/styles/global.css
git commit -m "fix: ajustes visuais da verificação no navegador

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Remover legado, crivo de vazamento, workflow de deploy e README

**Files:**
- Delete: `index.html`, `script.js`, `style.css` (raiz)
- Create: `scripts/crivo.mjs`, `.github/workflows/deploy.yml`
- Modify: `README.md`, `tests/build.test.mjs`
- Local, fora do repo: `~/RIXP-dados-local/resume-denylist.txt`

- [ ] **Step 1: Teste de legado (falha)**

Acrescente ao final de `tests/build.test.mjs`:

```js
test('não sobra arquivo do site antigo na raiz', () => {
  for (const f of ['index.html', 'script.js', 'style.css']) assert.ok(!existsSync(f), `${f} ainda existe`);
});
```

Run: `npm test`
Expected: FAIL com `index.html ainda existe`.

- [ ] **Step 2: Remover o legado**

Run: `git rm index.html script.js style.css && npm test`
Expected: `# fail 0`.

- [ ] **Step 3: `scripts/crivo.mjs`**

```js
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
  'README.md',
];
const hits = [];
for (const f of files) {
  const text = readFileSync(f, 'utf8').toLowerCase();
  for (const term of terms) if (text.includes(term.toLowerCase())) hits.push(`${f}: "${term}"`);
}
console.log(`crivo: ${terms.length} termos × ${files.length} arquivos conferidos`);
if (hits.length) {
  console.error(hits.join('\n'));
  process.exit(1);
}
console.log('crivo: nenhum termo encontrado');
```

- [ ] **Step 4: Montar a lista local de termos (fora do repo)**

Criar `~/RIXP-dados-local/resume-denylist.txt`, um termo por linha, com: o nome de cada pessoa que tem nota em `Work - Finances/20-Pessoas/`, o nome da plataforma de CRM terceira usada pelo escritório, os fornecedores citados no projeto de Segurança da Informação e as siglas internas de clusters/métricas que aparecem no vault. **Não** colocar "Real Invest" nem "XP" (aparecem de propósito). A lista nunca é commitada nem citada em arquivo do repo.

- [ ] **Step 5: Provar que o crivo falha e depois passa**

Run: `npm run build && printf 'Analista de BI\n' > "$TEMP/denylist-teste.txt" && RESUME_DENYLIST="$TEMP/denylist-teste.txt" npm run crivo; echo "exit=$?"`
Expected: lista acertos e `exit=1`.
Run: `npm run crivo; echo "exit=$?"`
Expected: `crivo: N termos × M arquivos conferidos` (N > 0, M > 0), `nenhum termo encontrado`, `exit=0`. Se houver acerto: **pare e reporte**, não reescreva o termo para escapar do crivo.

- [ ] **Step 6: `.github/workflows/deploy.yml`**

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 7: Reescrever `README.md`**

```markdown
# Guilherme Rocha · Analista de BI

Currículo online: https://dev-guirocha.github.io/Resume-rock.dev/ (PT) · https://dev-guirocha.github.io/Resume-rock.dev/en/ (EN)

## Stack

Astro (site estático), CSS puro, conteúdo em JSON bilíngue, testes com `node:test`, deploy por GitHub Actions no GitHub Pages.

## Atualizar o conteúdo

Todo o texto está em `src/data/`. Cada texto visível é `{ "pt": "...", "en": "..." }`; o build falha se faltar um idioma.

| Arquivo | Conteúdo |
|---|---|
| `profile.json` | nome, cargo, resumo, links, KPIs do topo |
| `experience.json` | linha do tempo profissional |
| `projects.json` | cards de projeto (`url: null` esconde o botão) |
| `skills.json` | grupos de competência |
| `education.json` | formação |
| `courses.json` | cursos; o PDF fica em `public/images/` |
| `ui.json` | rótulos de interface |

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321/Resume-rock.dev/
npm test         # build + testes de dados e de HTML
```

## Licença

MIT.
```

- [ ] **Step 8: Rodar tudo**

Run: `npm test && npm run crivo`
Expected: `# fail 0` e `crivo: nenhum termo encontrado`.

- [ ] **Step 9: Commit**

```bash
git add -A
git status --short   # conferir: nada de denylist, dist, node_modules ou PDF de pós
git commit -m "chore: remove site antigo, adiciona crivo de vazamento, deploy por Actions e README

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 10: Parar e reportar**

Não fazer push nem merge. Reportar ao Guilherme: commits do branch `redesign`, resultado de `npm test` e do crivo (com as contagens), screenshots da Task 6. Os próximos passos dependem do OK dele: (1) push do `redesign`, (2) trocar a fonte do GitHub Pages para "GitHub Actions", (3) merge em `main`.
