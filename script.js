document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        pt: {
            htmlLang: 'pt-BR',
            pageTitle: 'Guilherme Rocha - Analista de Qualidade Jr.',
            nav: {
                formation: 'Formação',
                certifications: 'Certificações',
                projects: 'Projetos',
                contact: 'Contato',
                openMenu: 'Abrir menu',
                closeMenu: 'Fechar menu'
            },
            hero: {
                title: 'Olá, eu sou Guilherme Rocha',
                subtitle: 'Analista de Qualidade Jr.',
                description: 'Profissional de tecnologia em início de carreira, com forte atenção aos detalhes e perfil analítico. Com grande interesse pela área de Qualidade (QA), busco aplicar minha visão sistêmica para garantir a entrega de produtos de alta performance.',
                visitCompany: 'Visite nossa empresa',
                hireMe: 'Contrate-me',
                imageAlt: 'Foto de perfil de Guilherme Rocha'
            },
            formation: {
                sectionTitle: 'Formação Acadêmica',
                items: {
                    ai: {
                        title: 'Pós-Graduação em IA',
                        description: 'Inteligência Artificial e Tecnologia na Gestão Pública<br>Gran Faculdades<br>Concluído'
                    },
                    fullstack: {
                        title: 'Pós-Graduação em FullStack',
                        description: 'Desenvolvimento FullStack e Cloud Computing<br>Gran Faculdades<br>Previsão de Conclusão: 1º/2026'
                    },
                    systems: {
                        title: 'Análise e Desenv. de Sistemas',
                        description: 'Tecnologia em Análise e Desenvolvimento de Sistemas<br>Gran Faculdades<br>Previsão de Conclusão: 1º/2027'
                    }
                }
            },
            courses: {
                sectionTitle: 'Cursos e Certificações',
                tabs: {
                    todos: 'Todos',
                    frontend: 'Front-End',
                    backend: 'Back-End',
                    qa: 'Qualidade (QA)',
                    dados: 'Dados & Banco de Dados',
                    ferramentas: 'Ferramentas & Metodologias'
                },
                labels: {
                    institution: 'Instituição',
                    viewCertificate: 'Ver Certificado'
                }
            },
            projects: {
                sectionTitle: 'Experiência e Projetos',
                sliderPrev: 'Projeto anterior',
                sliderNext: 'Próximo projeto',
                viewOnGithub: 'Ver no GitHub',
                items: {
                    medcontrol: {
                        title: 'Projeto MedControlApp',
                        tag: 'Aplicativo Mobile',
                        heading: 'Projeto MedControlApp',
                        description: 'Aplicativo mobile para acompanhamento de medicação e alertas inteligentes, com foco em acessibilidade e notificações precisas.',
                        aria: 'Ver projeto MedControlApp no GitHub',
                        imageAlt: 'Imagem do Projeto MedControlApp'
                    },
                    marmitas: {
                        title: 'Website Marmitas da Ka',
                        tag: 'Landing Page',
                        heading: 'Website Marmitas da Ka',
                        description: 'Landing page responsiva para negócios locais, destacando catálogo de produtos, depoimentos e CTA otimizada para conversão.',
                        aria: 'Ver projeto Marmitas da Ka no GitHub',
                        imageAlt: 'Imagem do Projeto Marmitas da Ka'
                    },
                    wallet: {
                        title: 'Projeto @wallet App',
                        tag: 'Dashboard Web',
                        heading: 'Projeto @wallet App',
                        description: 'Interface web para monitoramento financeiro, com gráficos e filtros dinâmicos pensados para decisões rápidas.',
                        aria: 'Ver projeto @wallet App no GitHub',
                        imageAlt: 'Imagem do Projeto @wallet App'
                    }
                }
            },
            contact: {
                sectionTitle: 'Entre em Contato',
                description: 'Estou disponível para novas oportunidades e colaborações. Escolha o melhor canal para conversar comigo.',
                emailButton: 'Enviar um e-mail',
                linkedinAria: 'Perfil profissional no LinkedIn',
                githubAria: 'Ver repositórios no GitHub',
                instagramAria: 'Perfil no Instagram'
            },
            footer: {
                text: '&copy; 2025 Guilherme Rocha. Todos os direitos reservados. Parte da equipe <span>Rock.Dev</span>'
            },
            language: {
                switcherLabel: 'Selecionar idioma',
                toPortuguese: 'Mudar para português',
                toEnglish: 'Mudar para inglês'
            }
        },
        en: {
            htmlLang: 'en',
            pageTitle: 'Guilherme Rocha - Junior Quality Analyst',
            nav: {
                formation: 'Education',
                certifications: 'Certifications',
                projects: 'Projects',
                contact: 'Contact',
                openMenu: 'Open menu',
                closeMenu: 'Close menu'
            },
            hero: {
                title: "Hi, I'm Guilherme Rocha",
                subtitle: 'Junior Quality Analyst',
                description: 'Early-career technology professional with strong attention to detail and an analytical mindset. Passionate about Quality Assurance, I apply a systemic view to ensure high-performance product delivery.',
                visitCompany: 'Visit our company',
                hireMe: 'Hire me',
                imageAlt: 'Profile picture of Guilherme Rocha'
            },
            formation: {
                sectionTitle: 'Academic Background',
                items: {
                    ai: {
                        title: 'Postgraduate Studies in AI',
                        description: 'Artificial Intelligence and Technology in Public Management<br>Gran Faculdades<br>Completed'
                    },
                    fullstack: {
                        title: 'Postgraduate Studies in Full-Stack Development',
                        description: 'Full-Stack Development and Cloud Computing<br>Gran Faculdades<br>Expected completion: Q1 2026'
                    },
                    systems: {
                        title: 'Systems Analysis and Development',
                        description: 'Technology degree in Systems Analysis and Development<br>Gran Faculdades<br>Expected completion: Q1 2027'
                    }
                }
            },
            courses: {
                sectionTitle: 'Courses & Certifications',
                tabs: {
                    todos: 'All',
                    frontend: 'Front-End',
                    backend: 'Back-End',
                    qa: 'Quality (QA)',
                    dados: 'Data & Databases',
                    ferramentas: 'Tools & Methodologies'
                },
                labels: {
                    institution: 'Institution',
                    viewCertificate: 'View Certificate'
                }
            },
            projects: {
                sectionTitle: 'Experience & Projects',
                sliderPrev: 'Previous project',
                sliderNext: 'Next project',
                viewOnGithub: 'View on GitHub',
                items: {
                    medcontrol: {
                        title: 'MedControlApp Project',
                        tag: 'Mobile App',
                        heading: 'MedControlApp Project',
                        description: 'Mobile app for medication tracking and smart reminders, designed with accessibility and precise notifications in mind.',
                        aria: 'View the MedControlApp project on GitHub',
                        imageAlt: 'MedControlApp project preview image'
                    },
                    marmitas: {
                        title: 'Marmitas da Ka Website',
                        tag: 'Landing Page',
                        heading: 'Marmitas da Ka Website',
                        description: 'Responsive landing page for a local business, highlighting product catalog, testimonials, and a conversion-focused CTA.',
                        aria: 'View the Marmitas da Ka project on GitHub',
                        imageAlt: 'Marmitas da Ka project preview image'
                    },
                    wallet: {
                        title: '@wallet App Project',
                        tag: 'Web Dashboard',
                        heading: '@wallet App Project',
                        description: 'Web interface for financial monitoring with dynamic charts and filters to support quick decisions.',
                        aria: 'View the @wallet App project on GitHub',
                        imageAlt: '@wallet App project preview image'
                    }
                }
            },
            contact: {
                sectionTitle: 'Get in Touch',
                description: 'I’m available for new opportunities and collaborations. Pick the channel that works best for you.',
                emailButton: 'Send an email',
                linkedinAria: 'Professional profile on LinkedIn',
                githubAria: 'View repositories on GitHub',
                instagramAria: 'Instagram profile'
            },
            footer: {
                text: '&copy; 2025 Guilherme Rocha. All rights reserved. Part of the <span>Rock.Dev</span> team'
            },
            language: {
                switcherLabel: 'Select language',
                toPortuguese: 'Switch to Portuguese',
                toEnglish: 'Switch to English'
            }
        }
    };

    const courseData = [
        {
            id: 'ai-marketing',
            category: 'ferramentas',
            title: {
                pt: 'Inteligência Artificial: campanhas de Marketing Digital',
                en: 'Artificial Intelligence: Digital Marketing Campaigns'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Inteligência Artificial_ campanhas de Marketing Digital - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Artificial Intelligence_ Digital Marketing campaigns - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'html-css-1',
            category: 'frontend',
            title: {
                pt: 'HTML5 e CSS3 parte 1: crie uma página da Web',
                en: 'HTML5 and CSS3 Part 1: Create a Webpage'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso HTML5 e CSS3 parte 1_ crie uma página da Web - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course HTML5 and CSS3 part 1_ Create a webpage - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'negociacao-ia',
            category: 'ferramentas',
            title: {
                pt: 'Negociação: treinando habilidades com IA',
                en: 'Negotiation: Training Skills with AI'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Negociação_ treinando habilidades com IA - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Negotiation_ training skills with AI - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'aprendizagem-chatgpt',
            category: 'ferramentas',
            title: {
                pt: 'Aprendizagem: personalizando sua rotina de estudos com ChatGPT',
                en: 'Learning: Customizing Your Study Routine with ChatGPT'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Aprendizagem_ personalizando sua rotina de estudos com ChatGPT - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Learning_ customizing your study routine with ChatGPT - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'copywriting-ia',
            category: 'ferramentas',
            title: {
                pt: 'Copywriting: criando textos persuasivos com Inteligência Artificial',
                en: 'Copywriting: Creating Persuasive Texts with Artificial Intelligence'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Copywriting_ criando textos persuasivos com Inteligência Artificial - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Copywriting_ creating persuasive texts with Artificial Intelligence - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'chatgpt-conversas',
            category: 'ferramentas',
            title: {
                pt: 'ChatGPT: desvendando a IA em conversas e suas aplicações',
                en: 'ChatGPT: Unveiling AI in Conversations and Its Applications'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso ChatGPT_ desvendando a IA em conversas e suas aplicações - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course ChatGPT_ unveiling AI in conversations and its applications - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'chatgpt-qualidade',
            category: 'ferramentas',
            title: {
                pt: 'ChatGPT: otimizando a qualidade dos resultados',
                en: 'ChatGPT: Optimizing the Quality of Results'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso ChatGPT_ otimizando a qualidade dos resultados - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course ChatGPT_ optimizing the quality of results - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'prompt-engineering',
            category: 'ferramentas',
            title: {
                pt: 'Engenharia de Prompt: criando prompts eficazes para IA Generativa',
                en: 'Prompt Engineering: Creating Effective Prompts for Generative AI'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Engenharia de Prompt_ criando prompts eficazes para IA Generativa - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Prompt Engineering_ creating effective prompts for Generative AI - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'ia-potencial',
            category: 'ferramentas',
            title: {
                pt: 'IA: explorando o potencial da inteligência artificial generativa',
                en: 'AI: Exploring the Potential of Generative Artificial Intelligence'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso IA_ explorando o potencial da inteligência artificial generativa - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course AI_ exploring the potential of generative artificial intelligence - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'html-css-4',
            category: 'frontend',
            title: {
                pt: 'HTML5 e CSS3 parte 4: avançando no CSS',
                en: 'HTML5 and CSS3 Part 4: Advancing in CSS'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso HTML5 e CSS3 parte 4_ avançando no CSS - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course HTML5 and CSS3 Part 4_ Advancing in CSS - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'html-css-2',
            category: 'frontend',
            title: {
                pt: 'HTML5 e CSS3 parte 2: posicionamento, listas e navegação',
                en: 'HTML5 and CSS3 Part 2: Positioning, Lists and Navigation'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso HTML5 e CSS3 parte 2_ posicionamento, listas e navegação - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course HTML5 and CSS3 part 2_ Positioning, Lists and Navigation - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'html-css-3',
            category: 'frontend',
            title: {
                pt: 'HTML5 e CSS3 parte 3: trabalhando com formulários e tabelas',
                en: 'HTML5 and CSS3 Part 3: Working with Forms and Tables'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso HTML5 e CSS3 parte 3_ trabalhando com formulários e tabelas - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course HTML5 and CSS3 Part 3_ Working with forms and tables - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'js-web',
            category: 'frontend',
            title: {
                pt: 'JavaScript para Web: Crie páginas dinâmicas',
                en: 'JavaScript for the Web: Create Dynamic Pages'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso JavaScript para Web_ Crie páginas dinâmicas - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course JavaScript for the Web_ Create Dynamic Pages - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'js-explorando',
            category: 'frontend',
            title: {
                pt: 'JavaScript: explorando a linguagem',
                en: 'JavaScript: Exploring the Language'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso JavaScript_ explorando a linguagem - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course JavaScript_ Exploring the Language - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'logica-programacao',
            category: 'frontend',
            title: {
                pt: 'Lógica de programação: mergulhe em programação com JavaScript',
                en: 'Programming Logic: Dive into Programming with JavaScript'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Lógica de programação_ mergulhe em programação com JavaScript - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Programming logic_ dive into programming with JavaScript - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'js-linguagem-web',
            category: 'frontend',
            title: {
                pt: 'JavaScript: programando na linguagem da web',
                en: 'JavaScript: Programming in the Language of the Web'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso JavaScript_ programando na linguagem da web - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course JavaScript_ Programming in the Language of the Web - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'pmi-cultura-agil',
            category: 'ferramentas',
            title: {
                pt: 'Certificação PMI-ACP: conheça a Cultura Ágil e seu potencial de aplicação',
                en: 'PMI-ACP Certification: Learn About the Agile Culture and Its Application Potential'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Certificação PMI-ACP_ conheça a Cultura Ágil e seu potencial de aplicação - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course PMI-ACP certification_ learn about the Agile Culture and its application potential - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'pmi-scrum-mais',
            category: 'ferramentas',
            title: {
                pt: 'Certificação PMI-ACP: entenda mais sobre o Scrum',
                en: 'PMI-ACP Certification: Understand More About Scrum'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Certificação PMI-ACP_ entenda mais sobre o Scrum - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course PMI-ACP Certification_ Understand more about Scrum - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'pmi-estrutura-scrum',
            category: 'ferramentas',
            title: {
                pt: 'Certificação PMI-ACP: entenda a estrutura do Scrum',
                en: 'PMI-ACP Certification: Understand the Scrum Framework'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Certificação PMI-ACP_ entenda a estrutura do Scrum - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course PMI-ACP Certification_ Understand the Scrum Framework - Alura.pdf'
            },
            institution: 'Alura'
        },
        {
            id: 'ia-midias-sociais',
            category: 'ferramentas',
            title: {
                pt: 'Inteligência Artificial: gestão de mídias sociais',
                en: 'Artificial Intelligence: Social Media Management'
            },
            links: {
                pt: 'images/certificados/Guilherme Rocha - Curso Inteligência Artificial_ gestão de mídias sociais - Alura.pdf',
                en: 'images/Certificates/Guilherme Rocha - Course Artificial Intelligence_ social media management - Alura.pdf'
            },
            institution: 'Alura'
        }
    ];

    const LANGUAGE_STORAGE_KEY = 'resume-language';
    const supportedLanguages = ['pt', 'en'];
    let storedLanguage = null;

    try {
        storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
        storedLanguage = null;
    }

    let currentLanguage = supportedLanguages.includes(storedLanguage) ? storedLanguage : 'pt';
    let currentCategory = 'todos';
    let currentSlide = 0;

    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const languageButtons = document.querySelectorAll('.language-switcher__button');
    const courseContainer = document.querySelector('[data-courses-container]');
    const tabButtons = document.querySelectorAll('.curso__tab-button');
    const carouselWrapper = document.querySelector('.carousel__wrapper');
    const slides = carouselWrapper ? Array.from(carouselWrapper.querySelectorAll('.carousel__slide')) : [];
    const prevButton = document.querySelector('.carousel__button--left');
    const nextButton = document.querySelector('.carousel__button--right');
    const projectTitle = document.getElementById('project-title');

    const defaultActiveTab = document.querySelector('.curso__tab-button.active') || tabButtons[0];
    if (defaultActiveTab) {
        currentCategory = defaultActiveTab.getAttribute('data-category') || 'todos';
    }

    function translate(key, lang = currentLanguage) {
        if (!translations[lang]) {
            return '';
        }
        return key.split('.').reduce((acc, part) => {
            if (acc && acc[part] !== undefined) {
                return acc[part];
            }
            return null;
        }, translations[lang]) || '';
    }

    function updateLanguageSwitcherUI(lang) {
        languageButtons.forEach(button => {
            const isActive = button.dataset.lang === lang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function applyTextTranslations(lang) {
        const htmlLang = translate('htmlLang', lang);
        if (htmlLang) {
            document.documentElement.setAttribute('lang', htmlLang);
        }

        const pageTitle = translate('pageTitle', lang);
        if (pageTitle) {
            document.title = pageTitle;
        }

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = translate(key, lang);
            if (value) {
                if (element.getAttribute('data-i18n-type') === 'html') {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        ['aria-label', 'alt', 'title'].forEach(attribute => {
            document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
                const key = element.getAttribute(`data-i18n-${attribute}`);
                const value = translate(key, lang);
                if (value) {
                    element.setAttribute(attribute, value);
                }
            });
        });

        updateCarouselTitle();
    }

    function renderCourses(lang) {
        if (!courseContainer) {
            return;
        }

        const institutionLabel = translate('courses.labels.institution', lang);
        const viewCertificateLabel = translate('courses.labels.viewCertificate', lang);

        courseContainer.innerHTML = '';

        courseData.forEach(course => {
            const item = document.createElement('div');
            item.className = 'curso__item';
            item.setAttribute('data-category', course.category);

            const titleParagraph = document.createElement('p');
            titleParagraph.textContent = course.title[lang];

            const institutionParagraph = document.createElement('p');
            institutionParagraph.innerHTML = `<strong>${institutionLabel}:</strong> ${course.institution}`;

            const link = document.createElement('a');
            link.className = 'curso__link';
            link.href = course.links[lang];
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = viewCertificateLabel;

            item.append(titleParagraph, institutionParagraph, link);
            courseContainer.appendChild(item);
        });
    }

    function filterCourses(category) {
        if (!courseContainer) {
            return;
        }
        const items = courseContainer.querySelectorAll('.curso__item');
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'todos' || itemCategory === category;
            item.classList.toggle('hidden', !shouldShow);
        });
    }

    function updateCarouselTitle() {
        if (!projectTitle || slides.length === 0) {
            return;
        }
        const activeSlide = slides[currentSlide];
        const titleKey = activeSlide ? activeSlide.getAttribute('data-i18n-title') : null;
        const translatedTitle = titleKey ? translate(titleKey) : '';
        if (translatedTitle) {
            projectTitle.textContent = translatedTitle;
        }
    }

    function updateCarousel() {
        if (!carouselWrapper) {
            return;
        }
        const offset = -currentSlide * 100;
        carouselWrapper.style.transform = `translateX(${offset}%)`;
        updateCarouselTitle();
    }

    function closeMenu() {
        if (!navToggle || !navMenu) {
            return;
        }
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', translate('nav.openMenu'));
    }

    function setLanguage(lang) {
        if (!supportedLanguages.includes(lang)) {
            return;
        }
        currentLanguage = lang;
        updateLanguageSwitcherUI(lang);
        applyTextTranslations(lang);
        renderCourses(lang);
        filterCourses(currentCategory);
        updateCarouselTitle();

        const menuIsOpen = navMenu ? navMenu.classList.contains('nav__menu--open') : false;
        const toggleLabelKey = menuIsOpen ? 'nav.closeMenu' : 'nav.openMenu';
        if (navToggle) {
            navToggle.setAttribute('aria-label', translate(toggleLabelKey));
        }

        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        } catch (error) {
            // Ignore storage errors (e.g., privacy mode)
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', translate(isOpen ? 'nav.closeMenu' : 'nav.openMenu'));
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    if (languageButtons.length > 0) {
        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedLang = button.dataset.lang;
                if (selectedLang && selectedLang !== currentLanguage) {
                    setLanguage(selectedLang);
                }
            });
        });
    }

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = button.getAttribute('data-category') || 'todos';
                filterCourses(currentCategory);
            });
        });
    }

    if (carouselWrapper && slides.length > 0 && prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        updateCarousel();
    }

    setLanguage(currentLanguage);
});
