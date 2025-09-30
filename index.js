"use strict";
/**
 * Evolve Tech - Main JavaScript
 * Description: Core JavaScript for the Evolve Tech portfolio website, Shed: Handles interactivity, animations, particle effects, and budget simulation.
 * Author: Evolve Tech Team
 * Version: 1.4.7
 * Date: May 19, 2025
 * Standards: ABNT NBR 14724:2011
 */

/**
 * Utility: Throttle function to limit event handler execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum interval between executions (ms)
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Utility: Debounce function to delay event handler execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay before execution (ms)
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Utility: Trap focus within a modal for accessibility
 * @param {HTMLElement} modal - Modal element
 */
const trapFocus = (modal) => {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
};

/**
 * Utility: Close all modals and restore body scroll
 * @param {HTMLElement[]} modals - Array of modal elements
 * @param {HTMLElement[]} techModals - Array of tech modal elements
 * @param {HTMLElement} historyModal - History modal element
 * @param {HTMLElement} budgetModal - Quick budget modal element
 */
const closeAllModals = (modals, techModals, historyModal, budgetModal) => {
    modals.forEach(modal => modal.classList.remove('active'));
    techModals.forEach(modal => modal.classList.remove('active'));
    if (historyModal) historyModal.classList.remove('active');
    if (budgetModal) budgetModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

/**
 * Preloader: Handles the preloader animation and removal
 */
const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 5000);
};

/**
 * Menu Toggle: Handles mobile menu open/close functionality
 */
const initMenuToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (!menuToggle || !nav || !menuOverlay) return;

    const toggleMenu = () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        nav.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    menuOverlay.addEventListener('click', toggleMenu);

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    }, 200));
};

/**
 * Smooth Scroll: Enables smooth scrolling for anchor links
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('historia-toggle')) return;
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};

/**
 * Header Scroll Effect: Adds scrolled class to header on scroll
 */
const initHeaderScroll = () => {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        header.classList.toggle('scrolled', currentScrollY > 50);
        lastScrollY = currentScrollY;
        requestAnimationFrame(updateHeader);
    };

    requestAnimationFrame(updateHeader);
};

/**
 * Scroll Animations: Animates elements when they enter viewport
 */
const initScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animateElements.forEach(el => observer.observe(el));
};

/**
 * Tilt Effect: Adds 3D tilt effect to elements on mousemove/touch
 */
const initTiltEffect = () => {
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach(element => {
        const applyTilt = (x, y, rect) => {
            const tiltX = -(y / rect.height) * 15;
            const tiltY = (x / rect.width) * 15;
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        };

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            applyTilt(x, y, rect);
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });

        element.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = element.getBoundingClientRect();
            const x = touch.clientX - rect.left - rect.width / 2;
            const y = touch.clientY - rect.top - rect.height / 2;
            applyTilt(x, y, rect);
        }, { passive: false });

        element.addEventListener('touchend', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};

/**
 * Theme Toggle: Switches between color themes
 */
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const themes = ['theme-blue', 'theme-purple', 'theme-green'];
    let currentThemeIndex = 0;

    const applyTheme = (theme) => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.includes(savedTheme)) {
        applyTheme(savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    } else {
        applyTheme(themes[0]);
    }

    const toggleTheme = () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
    };

    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
};

/**
 * Tecnologias: Dynamically creates technology grids and modals
 */
const initTecnologias = () => {
    const tecnologias = {
        frontend: [
            { icon: 'devicon-html5-plain', name: 'HTML', description: 'Estrutura semântica e acessível para websites.', cost: 2000 },
            { icon: 'devicon-css3-plain', name: 'CSS', description: 'Estilização com layouts responsivos e animações modernas.', cost: 2500 },
            { icon: 'devicon-javascript-plain', name: 'JavaScript', description: 'Interatividade e lógica dinâmica para aplicações.', cost: 4000 },
            { icon: 'devicon-typescript-plain', name: 'TypeScript', description: 'JavaScript com tipagem estática para robustez.', cost: 4500 },
            { icon: 'devicon-react-original', name: 'React', description: 'Interfaces dinâmicas e componentizadas.', cost: 6000 },
            { icon: 'devicon-vuejs-plain', name: 'Vue', description: 'Framework progressivo para interfaces reativas.', cost: 5500 }
        ],
        backend: [
            { icon: 'devicon-nodejs-plain', name: 'Node.js', description: 'JavaScript no servidor para APIs escaláveis.', cost: 6000 },
            { icon: 'devicon-express-original', name: 'Express', description: 'Framework para Node.js para APIs RESTful.', cost: 4000 },
            { icon: 'devicon-python-plain', name: 'Python', description: 'Versátil para web, automação e IA.', cost: 5500 },
            { icon: 'devicon-mysql-plain', name: 'MySQL', description: 'Banco de dados relacional robusto.', cost: 4500 }
        ],
        ferramentas: [
            { icon: 'devicon-git-plain', name: 'Git', description: 'Controle de versão para colaboração.', cost: 1500 },
            { icon: 'devicon-github-plain', name: 'GitHub', description: 'Hospedagem de repositórios com CI/CD.', cost: 2000 },
            { icon: 'devicon-amazonwebservices-plain', name: 'AWS', description: 'Serviços em nuvem escaláveis.', cost: 8000 },
            { icon: 'devicon-serverless-plain', name: 'Serverless', description: 'Desenvolvimento sem gerenciamento de servidores.', cost: 6000 },
            { icon: 'devicon-netlify-plain', name: 'Netlify', description: 'Hospedagem de sites estáticos com deploy contínuo.', cost: 3000 },
            { icon: 'devicon-ngrok-plain', name: 'Ngrok', description: 'Túneis seguros para servidores locais.', cost: 2500 },
            { icon: 'devicon-kalilinux-plain', name: 'Kali Linux', description: 'Ferramentas para testes de segurança.', cost: 4000 },
            { icon: 'fas fa-search', name: 'SEO', description: 'Gestão de domínio e otimização para motores de busca.', cost: 2500 },
            { icon: 'fas fa-robot', name: 'Chatbot', description: 'Criação de chatbots interativos para plataformas.', cost: 3500 }
        ]
    };

    const frontendGrid = document.querySelector('.frontend-grid');
    const backendGrid = document.querySelector('.backend-grid');
    const ferramentasGrid = document.querySelector('.ferramentas-grid');
    const techModals = [];

    if (!frontendGrid || !backendGrid || !ferramentasGrid) {
        console.error('Um ou mais grids de tecnologias não foram encontrados.');
        return { techModals };
    }

    const createTechElement = (tech) => {
        const techElement = document.createElement('div');
        techElement.classList.add('tecnologia', 'tilt');
        techElement.setAttribute('tabindex', '0');
        techElement.setAttribute('role', 'button');
        techElement.setAttribute('aria-label', `Saiba mais sobre ${tech.name}`);
        techElement.innerHTML = `
            <i class="${tech.icon}"></i>
            <h3>${tech.name}</h3>
        `;

        const modal = document.createElement('div');
        modal.classList.add('tech-modal');
        modal.id = `modal-${tech.name.toLowerCase()}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `tech-title-${tech.name.toLowerCase()}`);
        modal.innerHTML = `
            <div class="tech-modal-content">
                <button class="tech-modal-close" aria-label="Fechar modal">✕</button>
                <i class="${tech.icon} tech-modal-icon"></i>
                <h3 class="tech-modal-title" id="tech-title-${tech.name.toLowerCase()}">${tech.name}</h3>
                <p class="tech-modal-description">${tech.description}</p>
            </div>
        `;
        document.body.appendChild(modal);
        techModals.push(modal);

        const openModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modal.focus();
            trapFocus(modal);
        };

        techElement.addEventListener('click', openModal);
        techElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });

        return techElement;
    };

    tecnologias.frontend.forEach(tech => frontendGrid.appendChild(createTechElement(tech)));
    tecnologias.backend.forEach(tech => backendGrid.appendChild(createTechElement(tech)));
    tecnologias.ferramentas.forEach(tech => ferramentasGrid.appendChild(createTechElement(tech)));

    return { techModals };
};

/**
 * Quick Budget Simulation: Handles the floating button and modal
 */
const initQuickBudgetSimulation = () => {
    const floatingBtn = document.querySelector('.floating-budget-btn');
    const budgetBtn = document.querySelector('.budget-btn');
    const budgetModal = document.querySelector('#quick-budget-modal');
    const budgetForm = document.querySelector('#quick-budget-form');
    const closeBtn = document.querySelector('.quick-budget-modal-close');
    const errorMessage = document.querySelector('.error-message');
    const clearButton = document.querySelector('.clear-btn');

    if (!floatingBtn || !budgetBtn || !budgetModal || !budgetForm || !closeBtn || !errorMessage || !clearButton) {
        console.error('Elementos do orçamento rápido não encontrados.');
        return;
    }

    clearButton.addEventListener('click', () => {
        budgetForm.reset();
        errorMessage.style.display = 'none';
    });

    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedProjectType = budgetForm.querySelector('input[name="project-type"]:checked');
        if (!selectedProjectType) {
            errorMessage.textContent = 'Selecione o tipo de projeto.';
            errorMessage.style.display = 'block';
            return;
        }

        const projectTypeLabel = selectedProjectType.parentElement.textContent.trim();
        const selectedServices = Array.from(budgetForm.querySelectorAll('input[name="services"]:checked'))
            .map(cb => cb.parentElement.textContent.trim());

        const selections = [
            `- Tipo de Projeto: ${projectTypeLabel}`,
            ...selectedServices.map(service => `- Serviço Adicional: ${service}`)
        ];
        const message = encodeURIComponent(
            `Orçamento Rápido\n\nSeleções:\n${selections.join('\n')}`
        );
        window.open(`https://wa.me/5543988704856?text=${message}`, '_blank');
        budgetForm.reset();
        budgetModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    const openModal = () => {
        budgetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        budgetModal.focus();
        trapFocus(budgetModal);
    };

    floatingBtn.addEventListener('click', openModal);
    budgetBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', () => {
        budgetModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        budgetForm.reset();
        errorMessage.style.display = 'none';
    });

    budgetModal.addEventListener('click', (e) => {
        if (e.target === budgetModal) {
            budgetModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            budgetForm.reset();
            errorMessage.style.display = 'none';
        }
    });

    budgetModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            budgetModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            budgetForm.reset();
            errorMessage.style.display = 'none';
        }
    });
};

/**
 * Portfolio Modals: Handles portfolio item modals
 */
const initPortfolioModals = (techModals) => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.project-modal');
    const historyModal = document.querySelector('.history-modal') || document.createElement('div');
    const budgetModal = document.querySelector('#quick-budget-modal');

    portfolioItems.forEach(item => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal ${modalId} não encontrado.`);
            return;
        }

        const openModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modal.focus();
            trapFocus(modal);
        };

        item.addEventListener('click', openModal);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    });

    const modalElements = [...modals, ...techModals, historyModal, budgetModal].filter(modal => modal && modal !== document.createElement('div'));
    modalElements.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals(modals, techModals, historyModal, budgetModal);
            }
        });
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllModals(modals, techModals, historyModal, budgetModal);
            }
        });

        const closeBtn = modal.querySelector('.modal-close, .tech-modal-close, .history-modal-close, .quick-budget-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeAllModals(modals, techModals, historyModal, budgetModal);
            });
            closeBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeAllModals(modals, techModals, historyModal, budgetModal);
                }
            });
        }
    });
};

/**
 * Iframe Optimization: Ensures iframes load correctly
 */
const initIframeOptimization = () => {
    const iframes = document.querySelectorAll('.portfolio-iframe, .modal-iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            iframe.style.opacity = '1';
        });
        iframe.addEventListener('error', () => {
            iframe.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'iframe-placeholder';
            placeholder.textContent = 'Não foi possível carregar o conteúdo.';
            iframe.parentElement.appendChild(placeholder);
        });
    });
};

/**
 * History Timeline: Manages the history modal and navigation
 */
const initHistoryTimeline = () => {
    const historyData = [
        {
            year: '2015',
            title: 'Fundação da Evolve Tech',
            description: 'Fundada com a missão de transformar ideias em soluções digitais inovadoras.',
            icon: 'fas fa-rocket'
        },
        {
            year: '2017',
            title: 'Primeiro Grande Cliente',
            description: 'Desenvolvemos um site corporativo de alto desempenho para nosso primeiro grande cliente.',
            icon: 'fas fa-trophy'
        },
        {
            year: '2019',
            title: 'Expansão da Equipe',
            description: 'Incorporamos especialistas em UX/UI, segurança e cloud para serviços completos.',
            icon: 'fas fa-users'
        },
        {
            year: '2022',
            title: 'Lançamento de Produtos Próprios',
            description: 'Lançamos uma plataforma SaaS para automação de processos empresariais.',
            icon: 'fas fa-cogs'
        },
        {
            year: '2025',
            title: 'Líder em Inovação',
            description: 'Reconhecidos como líderes em inovação digital com projetos premiados globalmente.',
            icon: 'fas fa-star'
        }
    ];

    const historyToggles = document.querySelectorAll('.historia-toggle');
    const historyModal = document.createElement('div');
    historyModal.classList.add('history-modal');
    historyModal.setAttribute('role', 'dialog');
    historyModal.setAttribute('aria-labelledby', 'history-modal-title');
    historyModal.innerHTML = `
        <div class="history-modal-content">
            <button class="history-modal-close" aria-label="Fechar modal">✕</button>
            <i class="history-modal-icon"></i>
            <h3 class="history-modal-year" id="history-modal-title"></h3>
            <h4 class="history-modal-title"></h4>
            <p class="history-modal-description"></p>
            <div class="history-modal-nav">
                <button class="prev-step" aria-label="Etapa anterior">Anterior</button>
                <button class="next-step" aria-label="Próxima etapa">Próximo</button>
            </div>
        </div>
    `;
    document.body.appendChild(historyModal);

    const prevStep = historyModal.querySelector('.prev-step');
    const nextStep = historyModal.querySelector('.next-step');
    let currentStep = 0;

    const updateHistoryStep = (step) => {
        const { year, title, description, icon } = historyData[step];
        historyModal.querySelector('.history-modal-icon').className = `history-modal-icon ${icon}`;
        historyModal.querySelector('.history-modal-year').textContent = year;
        historyModal.querySelector('.history-modal-title').textContent = title;
        historyModal.querySelector('.history-modal-description').textContent = description;
        prevStep.disabled = step === 0;
        nextStep.disabled = step === historyData.length - 1;
        const content = historyModal.querySelector('.history-modal-content');
        content.style.animation = step > currentStep ? 'slideLeft 0.5s ease' : 'slideRight 0.5s ease';
        content.addEventListener('animationend', () => {
            content.style.animation = 'none';
        }, { once: true });
        currentStep = step;
    };

    historyToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            historyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentStep = 0;
            updateHistoryStep(currentStep);
            historyModal.focus();
            trapFocus(historyModal);
            if (document.querySelector('nav')?.classList.contains('active')) {
                document.querySelector('.menu-toggle').click();
            }
        });
    });

    prevStep.addEventListener('click', () => {
        if (currentStep > 0) updateHistoryStep(currentStep - 1);
    });

    nextStep.addEventListener('click', () => {
        if (currentStep < historyData.length - 1) updateHistoryStep(currentStep + 1);
    });

    historyModal.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentStep > 0) updateHistoryStep(currentStep - 1);
        if (e.key === 'ArrowRight' && currentStep < historyData.length - 1) updateHistoryStep(currentStep + 1);
    });
};

/**
 * Particle Animation: Creates particle effects for sections
 */
const initParticleAnimation = () => {
    const canvases = document.querySelectorAll('.particles-canvas, .section-bg-canvas');

    class Particle {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
        }

        draw() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    const connectParticles = (particles, ctx) => {
        const maxDistance = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    canvases.forEach(canvas => {
        try {
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Falha ao obter contexto 2D do canvas');

            const resizeCanvas = () => {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            };
            resizeCanvas();

            const particleCount = window.innerWidth < 768 ? 10 : 30;
            const particles = Array.from({ length: particleCount }, () => new Particle(canvas, ctx));

            let animationFrameId;
            const animate = () => {
                const rect = canvas.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                    animationFrameId = requestAnimationFrame(animate);
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                connectParticles(particles, ctx);
                animationFrameId = requestAnimationFrame(animate);
            };

            animate();
            window.addEventListener('resize', debounce(resizeCanvas, 200));

            window.addEventListener('unload', () => {
                cancelAnimationFrame(animationFrameId);
            });
        } catch (error) {
            console.error('Erro ao inicializar partículas:', error);
        }
    });
};

/**
 * Main Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initMenuToggle();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initTiltEffect();
    initThemeToggle();
    const { techModals } = initTecnologias();
    initQuickBudgetSimulation();
    initPortfolioModals(techModals);
    initIframeOptimization();
    initHistoryTimeline();
    initParticleAnimation();
});