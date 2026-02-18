"use strict";
/**
 * Legacy Evolve Tech - Main JavaScript (archived)
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

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

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

const initHeaderScroll = () => {
    const header = document.querySelector('header');
    if (!header) return;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        header.classList.toggle('scrolled', currentScrollY > 50);
        requestAnimationFrame(updateHeader);
    };

    requestAnimationFrame(updateHeader);
};

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
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initMenuToggle();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initTiltEffect();
});
