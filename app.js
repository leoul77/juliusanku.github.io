/**
 * Julius Anku Portfolio JS
 * Interactive features for a premium experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    /* ==========================================
       1. Header Scroll Effect
       ========================================== */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially in case of refresh

    /* ==========================================
       2. Mobile Navigation Toggle
       ========================================== */
    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       3. Active Nav Link on Scroll
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Trigger when section is in middle viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ==========================================
       4. Reveal on Scroll Animation
       ========================================== */
    const revealElements = document.querySelectorAll('.card, .section-header, .timeline-item');
    
    // Add base reveal class
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
    });

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Animate once
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
