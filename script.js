// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar iconos Lucide
    lucide.createIcons();

    // === GESTIÓN DE PROYECTOS ===
    const projectsData = [
        {
            title: "C++ Entity Component System",
            description: "Desarrollo de un motor ECS personalizado usando C++ y Qt Creator. Optimización de gestión de memoria y arquitectura orientada a datos.",
            tags: ["C++", "Qt", "Software Architecture"],
            category: "software",
            link: "#" // Link a tu repo
        },
        {
            title: "Simulación de Transistores MOSFET",
            description: "Análisis profundo de curvas características NMOS/PMOS utilizando LTspice. Modelado de comportamiento en diferentes regiones de operación.",
            tags: ["LTspice", "Electronics", "Simulation"],
            category: "simulation",
            link: "#"
        },
        {
            title: "Modelado de Generadores Síncronos",
            description: "Scripts de MATLAB para calcular y graficar el comportamiento de generadores bajo diferentes cargas y factores de potencia.",
            tags: ["MATLAB", "Power Systems", "Math"],
            category: "software",
            link: "#"
        },
        {
            title: "Diseño de PCBs con Altium",
            description: "Diseño esquemático y layout de PCB para sistema embebido de control. Consideraciones de EMI y trazado de señal.",
            tags: ["Altium", "PCB", "Hardware"],
            category: "electronics",
            link: "#"
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Función para renderizar proyectos
    function renderProjects(filter = 'all') {
        projectsContainer.innerHTML = ''; // Limpiar grid
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card', 'reveal'); // Agregamos clase reveal para animación
            
            // Generar HTML de los tags
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-img">
                    <i data-lucide="folder-code" size="48"></i> </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <a href="${project.link}" class="project-link">Ver en GitHub &rarr;</a>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
        
        // Reinicializar iconos para los nuevos elementos
        lucide.createIcons();
        // Disparar observador para las nuevas tarjetas
        observeElements();
    }

    // Event listeners para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar a actual
            btn.classList.add('active');
            // Renderizar
            renderProjects(btn.getAttribute('data-filter'));
        });
    });

    // Render inicial
    renderProjects();

    // === ANIMACIÓN AL SCROLL (Intersection Observer) ===
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
    
    // Llamar inicialmente
    observeElements();
});