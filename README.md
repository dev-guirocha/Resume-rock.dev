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
-   **HTML5 Semântico:** Para uma estrutura bem organizada e acessível.
-   **CSS3 Moderno:**
    -   **Flexbox** e **Grid Layout** para a criação de layouts complexos e responsivos.
    -   **Variáveis CSS** para um tema de cores fácil de customizar.
    -   **Animações e Transições** para interatividade.
-   **JavaScript (ES6+):** Utilizado para a manipulação do DOM, criando a interatividade do carrossel de projetos e o sistema de filtros de certificados.
-   **Font Awesome:** Para a inclusão de ícones.

## 🚀 Como Executar o Projeto

Como este é um projeto web estático, não há necessidade de instalação de dependências.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/dev-guirocha/Resume-rock.dev.git]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd Resume-rock.dev.git
    ```
3.  **Abra o arquivo `index.html`** diretamente no seu navegador de preferência.

    > **Dica:** Para uma melhor experiência de desenvolvimento, recomendo usar a extensão **"Live Server"** no Visual Studio Code, que atualiza a página automaticamente a cada alteração no código.

## ⚙️ Como Personalizar

Este portfólio foi projetado para ser facilmente personalizável:

-   **Conteúdo:** Todos os textos, títulos e informações pessoais podem ser editados diretamente nos arquivos `.html`.
-   **Imagens:** Substitua as imagens na pasta `/images` pelos seus próprios arquivos (foto de perfil, prints de projetos, etc.).
-   **Certificados e Projetos:** Para adicionar ou remover itens, basta seguir a estrutura HTML existente nas seções correspondentes dos arquivos `index.html`.
-   **Links:** Atualize os links para suas redes sociais, certificados e projetos nos respectivos atributos `href`.

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.

---

Desenvolvido por **Guilherme Rocha**.
