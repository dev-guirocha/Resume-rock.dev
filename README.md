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
