// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initNavigation();
    initGallery();
    initTestimonials();
    initClientLogos();
    initContactForm();
    initFAQ();
    initParallax();
    initScrollAnimations();
});

// Navegación
function initNavigation() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('section');

    // Menú hamburguesa para móvil
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth scroll al hacer click en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Detectar sección activa durante el scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Galería
function initGallery() {
    // Datos de la galería
    const galleryData = [
        {
            id: 1,
            category: 'bodas',
            imageUrl: 'https://source.unsplash.com/random/600x800/?wedding,photography',
            title: 'Boda en la playa',
            description: 'Ceremonia íntima al atardecer',
            size: 'tall'
        },
        {
            id: 2,
            category: 'retratos',
            imageUrl: 'https://source.unsplash.com/random/800x600/?portrait,photography',
            title: 'Retrato ejecutivo',
            description: 'Sesión corporativa profesional',
            size: 'wide'
        },
        {
            id: 3,
            category: 'corporativo',
            imageUrl: 'https://source.unsplash.com/random/600x600/?corporate,photography',
            title: 'Evento empresarial',
            description: 'Conferencia anual de tecnología',
            size: ''
        },
        {
            id: 4,
            category: 'familia',
            imageUrl: 'https://source.unsplash.com/random/600x600/?family,photography',
            title: 'Sesión familiar',
            description: 'Recuerdos para toda la vida',
            size: ''
        },
        {
            id: 5,
            category: 'bodas',
            imageUrl: 'https://source.unsplash.com/random/800x800/?wedding,couple',
            title: 'Preparativos nupciales',
            description: 'Momentos previos a la ceremonia',
            size: 'wide'
        },
        {
            id: 6,
            category: 'retratos',
            imageUrl: 'https://source.unsplash.com/random/600x800/?portrait,model',
            title: 'Retrato artístico',
            description: 'Iluminación natural en estudio',
            size: 'tall'
        },
        {
            id: 7,
            category: 'corporativo',
            imageUrl: 'https://source.unsplash.com/random/800x600/?business,meeting',
            title: 'Reunión directiva',
            description: 'Capturando momentos de liderazgo',
            size: 'wide'
        },
        {
            id: 8,
            category: 'familia',
            imageUrl: 'https://source.unsplash.com/random/600x600/?family,children',
            title: 'Diversión familiar',
            description: 'Sesión en exteriores',
            size: ''
        },
        {
            id: 9,
            category: 'bodas',
            imageUrl: 'https://source.unsplash.com/random/600x600/?wedding,ceremony',
            title: 'Ceremonia tradicional',
            description: 'Momentos emotivos',
            size: ''
        },
        {
            id: 10,
            category: 'retratos',
            imageUrl: 'https://source.unsplash.com/random/800x800/?portrait,professional',
            title: 'Retrato profesional',
            description: 'Perfil corporativo moderno',
            size: 'wide'
        },
        {
            id: 11,
            category: 'corporativo',
            imageUrl: 'https://source.unsplash.com/random/600x800/?corporate,event',
            title: 'Lanzamiento de producto',
            description: 'Presentación exclusiva',
            size: 'tall'
        },
        {
            id: 12,
            category: 'familia',
            imageUrl: 'https://source.unsplash.com/random/800x600/?family,outdoor',
            title: 'Generaciones',
            description: 'Reunión familiar anual',
            size: 'wide'
        }
    ];

    const galeriaGrid = document.querySelector('.galeria-grid');
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    let filteredGallery = [...galleryData];

    // Cargar imágenes en la galería
    function loadGalleryItems(items) {
        galeriaGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `galeria-item ${item.size}`;
            galleryItem.dataset.category = item.category;
            galleryItem.dataset.id = item.id;
            
            galleryItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                <div class="galeria-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(item.id));
            galeriaGrid.appendChild(galleryItem);
        });
    }

    // Inicializar la galería con todas las imágenes
    loadGalleryItems(galleryData);

    // Filtrar imágenes por categoría
    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Actualizar botones activos
            filtrosBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar imágenes
            if (filter === 'all') {
                filteredGallery = [...galleryData];
            } else {
                filteredGallery = galleryData.filter(item => item.category === filter);
            }
            
            loadGalleryItems(filteredGallery);
        });
    });

    // Funciones del lightbox
    function openLightbox(imageId) {
        const imageIndex = filteredGallery.findIndex(item => item.id === parseInt(imageId));
        if (imageIndex !== -1) {
            currentImageIndex = imageIndex;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    }

    function updateLightboxContent() {
        const currentImage = filteredGallery[currentImageIndex];
        lightboxImg.src = currentImage.imageUrl;
        lightboxImg.alt = currentImage.title;
        lightboxCaption.textContent = `${currentImage.title} - ${currentImage.description}`;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredGallery.length;
        updateLightboxContent();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredGallery.length) % filteredGallery.length;
        updateLightboxContent();
    }

    // Event listeners para el lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    });

    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Cerrar lightbox con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });

    // Implementar lazy loading para las imágenes
    if ('IntersectionObserver' in window) {
        const lazyLoadImages = () => {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        };

        lazyLoadImages();
    }
}

// Testimonios
function initTestimonials() {
    // Datos de testimonios
    const testimoniosData = [
        {
            id: 1,
            nombre: 'Laura Martínez',
            cargo: 'Novia reciente',
            imagen: 'https://source.unsplash.com/random/100x100/?woman,portrait',
            texto: 'Contratar a Lens Studio para nuestra boda fue la mejor decisión. Capturaron cada momento especial con un estilo único y nos entregaron un álbum que superó todas nuestras expectativas.'
        },
        {
            id: 2,
            nombre: 'Carlos Rodríguez',
            cargo: 'Director de Marketing',
            imagen: 'https://source.unsplash.com/random/100x100/?man,business',
            texto: 'Las fotografías corporativas que realizaron para nuestra empresa transmiten exactamente los valores que queríamos comunicar. El profesionalismo y la calidad son excepcionales.'
        },
        {
            id: 3,
            nombre: 'Ana García',
            cargo: 'Madre de familia',
            imagen: 'https://source.unsplash.com/random/100x100/?woman,mother',
            texto: 'Nuestra sesión familiar fue divertida y natural. Las fotos capturan perfectamente la personalidad de cada uno de nosotros. Definitivamente repetiremos cada año.'
        },
        {
            id: 4,
            nombre: 'Miguel Sánchez',
            cargo: 'Emprendedor',
            imagen: 'https://source.unsplash.com/random/100x100/?man,entrepreneur',
            texto: 'Los retratos profesionales que me hicieron han mejorado significativamente mi imagen de marca. La inversión ha valido completamente la pena.'
        }
    ];

    // Datos de logos de clientes
    const logosData = [
        { id: 1, nombre: 'Empresa Innovación', imagen: 'https://via.placeholder.com/120x60/ffffff/000000?text=INNOVACIÓN' },
        { id: 2, nombre: 'Grupo Creativo', imagen: 'https://via.placeholder.com/120x60/ffffff/000000?text=CREATIVO' },
        { id: 3, nombre: 'Corporación Global', imagen: 'https://via.placeholder.com/120x60/ffffff/000000?text=GLOBAL' },
        { id: 4, nombre: 'Estudio Diseño', imagen: 'https://via.placeholder.com/120x60/ffffff/000000?text=DISEÑO' },
        { id: 5, nombre: 'Tech Solutions', imagen: 'https://via.placeholder.com/120x60/ffffff/000000?text=TECH' }
    ];

    const testimoniosContainer = document.querySelector('.testimonios-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonioIndex = 0;

    // Cargar testimonios
    function loadTestimonios() {
        testimoniosContainer.innerHTML = '';
        
        testimoniosData.forEach(testimonio => {
            const testimonioElement = document.createElement('div');
            testimonioElement.className = 'testimonio';
            testimonioElement.innerHTML = `
                <img src="${testimonio.imagen}" alt="${testimonio.nombre}" class="testimonio-img">
                <p class="testimonio-texto">${testimonio.texto}</p>
                <h3 class="testimonio-nombre">${testimonio.nombre}</h3>
                <p class="testimonio-cargo">${testimonio.cargo}</p>
            `;
            testimoniosContainer.appendChild(testimonioElement);
        });
    }

    // Cargar logos de clientes
    function loadLogos() {
        const logosContainer = document.querySelector('.logos-clientes');
        
        logosData.forEach(logo => {
            const logoElement = document.createElement('img');
            logoElement.className = 'logo-cliente';
            logoElement.src = logo.imagen;
            logoElement.alt = logo.nombre;
            logosContainer.appendChild(logoElement);
        });
    }

    // Inicializar testimonios y logos
    loadTestimonios();
    loadLogos();

    // Funciones del carrusel
    function showTestimonio(index) {
        const testimonios = document.querySelectorAll('.testimonio');
        const offset = -index * 100;
        testimoniosContainer.style.transform = `translateX(${offset}%)`;
        currentTestimonioIndex = index;
    }

    // Event listeners para los botones del carrusel
    nextBtn.addEventListener('click', () => {
        const testimonios = document.querySelectorAll('.testimonio');
        currentTestimonioIndex = (currentTestimonioIndex + 1) % testimonios.length;
        showTestimonio(currentTestimonioIndex);
    });

    prevBtn.addEventListener('click', () => {
        const testimonios = document.querySelectorAll('.testimonio');
        currentTestimonioIndex = (currentTestimonioIndex - 1 + testimonios.length) % testimonios.length;
        showTestimonio(currentTestimonioIndex);
    });

    // Auto-scroll del carrusel
    let carouselInterval = setInterval(() => {
        const testimonios = document.querySelectorAll('.testimonio');
        currentTestimonioIndex = (currentTestimonioIndex + 1) % testimonios.length;
        showTestimonio(currentTestimonioIndex);
    }, 5000);

    // Detener auto-scroll al interactuar con el carrusel
    testimoniosContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    testimoniosContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            const testimonios = document.querySelectorAll('.testimonio');
            currentTestimonioIndex = (currentTestimonioIndex + 1) % testimonios.length;
            showTestimonio(currentTestimonioIndex);
        }, 5000);
    });
}

// Logos de clientes
function initClientLogos() {
    // Esta función ya está incluida en initTestimonials
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar todos los campos antes de enviar
            const isValid = validateForm();
            
            if (isValid) {
                // Simulación de envío exitoso
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Resetear el formulario después de 5 segundos
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('hidden');
                    formSuccess.classList.add('hidden');
                }, 5000);
            }
        });

        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Limpiar mensaje de error cuando el usuario comienza a escribir
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.style.display = 'none';
                }
            });
        });
    }

    // Función para validar todo el formulario
    function validateForm() {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Función para validar un campo individual
    function validateField(field) {
        const errorMessage = field.nextElementSibling;
        let isValid = true;
        
        // Limpiar mensaje de error anterior
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.style.display = 'none';
        }
        
        // Validar según el tipo de campo
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'Este campo es obligatorio');
            isValid = false;
        } else if (field.type === 'email' && field.value.trim()) {
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                showError(field, 'Por favor, introduce un email válido');
                isValid = false;
            }
        } else if (field.id === 'telefono' && field.value.trim()) {
            // Validar formato de teléfono (simple)
            const phoneRegex = /^[0-9+\s()-]{9,}$/;
            if (!phoneRegex.test(field.value.trim())) {
                showError(field, 'Por favor, introduce un teléfono válido');
                isValid = false;
            }
        }
        
        return isValid;
    }

    // Función para mostrar mensaje de error
    function showError(field, message) {
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        field.classList.add('error');
    }
}

// FAQ Acordeón
function initFAQ() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Cerrar todos los items abiertos
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar estado del item actual
            item.classList.toggle('active');
        });
    });
}

// Efecto Parallax
function initParallax() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        // Aplicar efecto parallax solo si la sección hero está visible
        if (scrollPosition < heroSection.offsetHeight) {
            const parallaxOffset = scrollPosition * 0.4;
            heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    // Comprobar si el navegador soporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const elements = document.querySelectorAll('.servicio, .galeria-item, .testimonio, .info-item, .accordion-item');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
}