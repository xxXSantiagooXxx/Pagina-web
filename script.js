// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar iconos Lucide
    lucide.createIcons();

    // === GESTIÓN DE PROYECTOS ===
    const projectsData = [
        {
            title: "Motor ECS en C++ & Qt",
            description: "Desarrollo de una arquitectura Entity-Component-System desde cero para optimización de memoria y gestión de entidades en simulaciones complejas.",
            tags: ["C++", "Qt Creator", "Software Architecture"],
            category: "software",
            link: "https://github.com/xXxSantiagooXxx" // Tu perfil o repo específico
        },
        {
            title: "Análisis de Transistores (LTspice)",
            description: "Simulación y modelado de curvas características de transistores NMOS, PMOS y BJT. Análisis de respuesta en frecuencia y puntos de operación.",
            tags: ["LTspice", "Electrónica Analógica", "Simulation"],
            category: "simulation",
            link: "#"
        },
        {
            title: "Modelado de Semiconductores",
            description: "Uso de MATLAB para modelar el comportamiento físico de dispositivos semiconductores y uniones PN bajo diferentes condiciones.",
            tags: ["MATLAB", "Física", "Math"],
            category: "software",
            link: "#"
        },
        {
            title: "Solicitud Beca Univ. Salamanca",
            description: "Redacción técnica y formal para postulación a becas internacionales, demostrando capacidad de comunicación profesional.",
            tags: ["Gestión", "Comunicación"],
            category: "otros",
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
