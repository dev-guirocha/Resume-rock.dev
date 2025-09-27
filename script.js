document.addEventListener('DOMContentLoaded', function () {
    // --- MENU MOBILE ---
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }
    
    // --- LÓGICA DO CARROSSEL DE PROJETOS ---
    const carouselWrapper = document.querySelector('.carousel__wrapper');
    // Verifica se o carrossel existe na página antes de executar
    if (carouselWrapper) {
        const slides = document.querySelectorAll('.carousel__slide');
        const prevButton = document.querySelector('.carousel__button--left');
        const nextButton = document.querySelector('.carousel__button--right');
        const projectTitle = document.getElementById('project-title');

        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateCarousel() {
            const offset = -currentSlide * 100;
            carouselWrapper.style.transform = `translateX(${offset}%)`;

            const newTitle = slides[currentSlide].getAttribute('data-title');
            projectTitle.textContent = newTitle;
        }

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        updateCarousel();
    }

    // --- LÓGICA DO FILTRO DE CERTIFICADOS ---
    const tabButtons = document.querySelectorAll('.curso__tab-button');
    const courseItems = document.querySelectorAll('.curso__item');

    // Verifica se os botões de filtro existem
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona 'active' ao botão clicado
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                courseItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    // Se a categoria do item corresponde à selecionada, ou se 'todos' foi selecionado
                    if (category === 'todos' || itemCategory === category) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
        
        // Simula um clique no primeiro botão ('Todos') para exibir todos os cursos ao carregar a página
        document.querySelector('.curso__tab-button[data-category="todos"]').click();
    }
});
