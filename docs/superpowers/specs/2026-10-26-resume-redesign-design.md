# Resume redesign — design

**Data:** 26/10/2026 · **Branch:** `redesign` (a partir de `main`) · **Status:** aprovado em conversa, aguardando revisão do spec

## Objetivo

Reposicionar o site de "Analista de Qualidade Jr." para **Analista de BI**, com a Real Invest
(escritório XP) como centro da página. Hoje o site não tem seção de Experiência profissional; ela
passa a ser a seção principal.

## Restrições

- **Repo público.** O trabalho na Real Invest aparece só como **escopo e stack**: sem número do
  escritório, nome de cliente, assessor, colega ou fornecedor, sem print de sistema interno.
- O projeto da Comissão de Segurança da Informação é confidencial: entra **só o cargo e o tema**
  (mapeamento de controles, governança, LGPD).
- Certificados de pós-graduação **não** entram no repo (trazem CPF e RG). Entram nome do curso,
  instituição, carga horária e período.
- O site atual continua no ar até o `redesign` ser aprovado e integrado ao `main`.

## O que já existe no `main` e se preserva

- **Seletor PT/EN** com todo o texto traduzido (`script.js`, objeto de traduções + `data-i18n`).
- **20 cursos da Alura** em `courseData` (`script.js`), cada um com título e PDF em PT e EN em
  `images/certificados/` e `images/Certificates/`, filtráveis por categoria.
- Fotos de perfil e prints dos 3 projetos pessoais em `images/`.

## Conteúdo

### Hero
- Nome + **Analista de BI**.
- Uma frase: constrói ferramentas de dados de ponta a ponta no mercado financeiro, com uso
  intensivo de IA.
- Faixa de 4 KPIs: **4** sistemas em produção · **4** meses · **2** pós-graduações ·
  **Diretor** da Comissão de SI.
- Botões: LinkedIn, GitHub, e-mail. O link para a Rock.Dev sai do topo.

### Experiência (linha do tempo)
1. **Real Invest, escritório XP · Analista de BI · jul/2026–atual**
   - **Diretor da Comissão de Segurança da Informação** — mapeamento de controles, governança e LGPD.
   - **Especialista em IA aplicada** — desenvolvimento orientado por agentes (Claude Code e Codex
     com revisão cruzada), automação de rotinas e skills próprias.
   - **4 sistemas em produção em 4 meses:**
     - painéis de BI (captação, receita e acompanhamento 1:1 dos assessores), alimentados por
       exports e pela API da plataforma de CRM do escritório;
     - motor de comissões e repasse, com réguas por produto (investimentos, consórcio, seguros) e
       conciliação entre fontes;
     - plataforma comercial/CRM em Supabase (PostgreSQL, PL/pgSQL, RLS) com front em React/Vite;
     - painel de TV de captação para o escritório.
   - Qualidade de dado como prática: testes que travam regressão e reconciliação antes de publicar.
2. **Freelancer · desenvolvimento web e mobile**
   - Site da Marmitas da Ka.
   - Aplicativos autônomos (MedControlApp, @wallet App).

### Projetos
Grid de cards (o carrossel sai). Cada card tem print, tag de stack, descrição e link.
MedControlApp, Marmitas da Ka, @wallet App. Os links hoje apontam para `#`: card sem URL real
mostra o card **sem botão de link**, em vez de um link morto.

### Competências
Três grupos: **Dados/BI** (SQL, Python, modelagem de métricas, dashboards), **Engenharia**
(PostgreSQL/Supabase, React, Node, Astro), **IA e Qualidade** (desenvolvimento com agentes, testes,
validação de dados), mais **Segurança da Informação/LGPD**.

### Formação
- **Análise e Desenvolvimento de Sistemas** — Gran Faculdades · previsão 2027.1.
- **Pós em Desenvolvimento Full Stack e Cloud Computing** — Gran Centro Universitário · 360h ·
  fev/2025–mai/2026 · concluída.
- **Pós em Inteligência Artificial e Tecnologia na Gestão Pública** — Gran Centro Universitário ·
  360h · fev/2025–ago/2025 · concluída.

O IFS não aparece.

### Cursos
Os 20 cursos de `courseData`, migrados sem alteração, como lista compacta com filtro por categoria e
link para o PDF no idioma ativo. Fica abaixo de Formação.

### Contato e rodapé
LinkedIn, GitHub, Instagram e e-mail (`dev.guirocha@gmail.com`). Rodapé com o ano corrente.

## Visual

- **Painel de dados, tema escuro** como padrão: fundo escuro, tipografia limpa, faixa de KPIs no
  hero, linha do tempo na Experiência.
- Cores como tokens em `:root`; contraste mínimo WCAG AA em todo texto.
- **`@media print`** troca para fundo claro e esconde navegação e filtros, para que "salvar como
  PDF" no navegador gere um currículo legível.
- Responsivo, com 16px de margem lateral no celular e sem rolagem horizontal.

## Arquitetura

- **Astro**, saída estática, sem framework de UI.
- Conteúdo em `src/data/`, separado por idioma onde há texto:
  - `profile.json`, `experience.json`, `projects.json`, `skills.json`, `education.json` — cada
    campo de texto com `{ "pt": ..., "en": ... }`;
  - `courses.json` — migrado de `courseData`.
- Componentes em `src/components/`: `Hero`, `KpiStrip`, `Timeline`, `ProjectCard`, `SkillGroups`,
  `Education`, `CourseList`, `Contact`, `LanguageSwitcher`. Componente só lê dados, não guarda texto.
- **Idioma:** uma página por idioma (`/` em PT, `/en/` em EN), gerada no build a partir dos mesmos
  dados. O seletor troca de página. Substitui a troca de texto em tempo de execução do `script.js`.
- **JS no cliente:** só o filtro de cursos e o menu mobile.
- PDFs dos cursos e imagens vão para `public/`, mantendo os caminhos.
- `base` do Astro configurado para `/Resume-rock.dev/` (o site é servido em subcaminho).

## Deploy

- GitHub Action no push para `main`: `npm ci` → `astro build` → publica `dist/` no GitHub Pages.
- A fonte do Pages muda de "branch `main`, raiz" para "GitHub Actions". **Essa troca só acontece
  com OK explícito**, junto da integração do `redesign`.
- A URL continua `https://dev-guirocha.github.io/Resume-rock.dev/`.

## Verificação

- `astro build` sem erro.
- Checagem automatizada no build: toda chave de texto existe em PT **e** EN; falha se faltar uma.
  Para provar que a trava funciona, ela é testada uma vez com uma chave removida de propósito.
- Os 20 cursos aparecem e cada link de PDF resolve para um arquivo existente (conta declarada).
- Página renderizada e conferida no navegador: desktop, celular (375px), as duas línguas e a prévia
  de impressão.
- Crivo de vazamento sobre `src/data/` e o HTML gerado antes de propor a integração no `main`.

## Fora do escopo

Blog, analytics, formulário de contato, CMS, novos projetos (o NASA Space Apps entra depois de
15/11/2026, como edição de `projects.json`). O branch `master` não é tocado.
