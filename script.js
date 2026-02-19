document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const projectsData = [
        {
            title: 'Motor ECS en C++ y Qt',
            description: 'Implementación de arquitectura Entity-Component-System para mejorar organización y rendimiento en simulaciones complejas.',
            tags: ['C++', 'Qt', 'ECS'],
            category: 'software',
            link: 'https://github.com/xXxSantiagooXxx'
        },
        {
            title: 'Caracterización de transistores en LTspice',
            description: 'Simulación de curvas de NMOS, PMOS y BJT para obtener puntos de operación y analizar comportamiento dinámico.',
            tags: ['LTspice', 'MOS/BJT', 'Análisis'],
            category: 'simulation',
            link: '#'
        },
        {
            title: 'Fuente regulada de laboratorio',
            description: 'Diseño conceptual de una etapa de potencia con regulación, protecciones básicas y criterios de seguridad.',
            tags: ['Electrónica', 'Potencia', 'Diseño'],
            category: 'electronics',
            link: '#'
        },
        {
            title: 'Modelado de semiconductores con MATLAB',
            description: 'Modelos numéricos para estudiar respuesta de uniones PN bajo diferentes condiciones de polarización.',
            tags: ['MATLAB', 'Semiconductores', 'Modelado'],
            category: 'simulation',
            link: '#'
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        projectsContainer.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter((project) => project.category === filter);

        filteredProjects.forEach((project) => {
            const card = document.createElement('article');
            card.className = 'project-card reveal';

            const tagsHtml = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
            const isPlaceholder = project.link === '#';

            card.innerHTML = `
                <div class="project-img"><i data-lucide="folder-code" size="44"></i></div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <a href="${project.link}" class="project-link" ${isPlaceholder ? '' : 'target="_blank" rel="noopener"'}>
                        ${isPlaceholder ? 'Próximamente' : 'Ver proyecto'} →
                    </a>
                </div>
            `;

            projectsContainer.appendChild(card);
        });

        lucide.createIcons();
        observeElements();
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((item) => item.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    const navLinks = document.getElementById('nav-links');
    const mobileToggle = document.getElementById('mobile-toggle');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const expanded = navLinks.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', expanded.toString());
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal:not(.active)').forEach((element) => observer.observe(element));
    }

    renderProjects();
    observeElements();
});
