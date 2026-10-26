# Guilherme Rocha · Analista de BI

Currículo online, em português e inglês:

- 🇧🇷 https://dev-guirocha.github.io/Resume-rock.dev/
- 🇺🇸 https://dev-guirocha.github.io/Resume-rock.dev/en/

Site estático em [Astro](https://astro.build), com todo o conteúdo em JSON bilíngue, testes com `node:test` e publicação automática no GitHub Pages a cada push no `main`.

## Seções

Topo com 4 destaques · Experiência (linha do tempo) · Projetos · Competências · Formação · Cursos e certificações (com filtro e certificado em PDF no idioma da página) · Contato.

Ao imprimir ou salvar a página como PDF, ela passa para fundo claro e esconde menu, filtros e fotos, ficando com cara de currículo.

## Atualizar o conteúdo

Todo o texto está em `src/data/`. Texto visível é `{ "pt": "...", "en": "..." }`. Nome próprio ou termo técnico igual nos dois idiomas pode ser string simples.

| Arquivo | Conteúdo |
|---|---|
| `profile.json` | nome, cargo, resumo, links e os 4 destaques do topo |
| `experience.json` | linha do tempo profissional |
| `projects.json` | cards de projeto (`url: null` esconde o botão "Ver projeto") |
| `skills.json` | grupos de competência |
| `education.json` | formação |
| `courses.json` | cursos; o caminho do PDF é relativo a `public/` |
| `ui.json` | rótulos de interface (menu, títulos de seção, botões) |

Imagens e PDFs ficam em `public/images/`. Depois de editar, rode `npm test`: ele avisa se faltar tradução, se um PDF de curso não existir ou se uma seção sumir.

## Rodar localmente

Requer Node 22.12 ou mais novo.

```bash
npm install
npm run dev      # http://localhost:4321/Resume-rock.dev/
npm test         # build + testes de dados, de HTML e do crivo
npm run preview  # serve o build de dist/
```

## Estrutura

```
src/
  data/         conteúdo (JSON bilíngue)
  components/   seções da página; só leem os dados
  layouts/      <html> e <head>
  lib/i18n.js   t(), withBase() e langHome()
  pages/        index.astro (PT) e en/index.astro (EN)
  styles/       tokens de cor, layout, responsivo e impressão
public/images/  foto, prints dos projetos e certificados
tests/          node:test: dados, HTML gerado e crivo
scripts/        crivo.mjs
```

## Publicação

`.github/workflows/deploy.yml` roda a cada push no `main`: `npm ci`, `npm test` e publica `dist/` no GitHub Pages. Se um teste falhar, nada é publicado.

## Crivo de vazamento

`npm run crivo` procura termos proibidos (nomes e dados que não podem ir a público) no conteúdo, no HTML gerado, nos testes, nos scripts e no workflow. A lista de termos fica **fora do repositório**, num arquivo local apontado por `RESUME_DENYLIST`. Sem lista, ou com a lista vazia, o crivo falha em vez de passar sem conferir nada. Rode antes de publicar conteúdo novo:

```bash
npm run build && npm run crivo
```

## Licença

O código está sob a licença MIT. Foto, prints dos projetos e certificados são pessoais e não entram nessa licença.
