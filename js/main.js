

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Fancybox } from '@fancyapps/ui';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.stop();

    // --- 2. Entrance Animation ---
    const enterBtn = document.getElementById('enter-btn');
    const entranceGate = document.getElementById('entrance-gate');


    gsap.to('.entrance-mist', {
        x: '2%',
        y: '2%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.entrance-sky', {
        opacity: 0.85,
        duration: 3,
        ease: 'power1.out'
    });

    const hasPlayedIntro = sessionStorage.getItem('introPlayed') === 'true';

    if (enterBtn && entranceGate && !hasPlayedIntro) {
        enterBtn.addEventListener('click', () => {
            sessionStorage.setItem('introPlayed', 'true');
            const tl = gsap.timeline({
                onComplete: () => {
                    entranceGate.style.display = 'none';

                    lenis.start();

                    initScrollReveals();
                }
            });

            tl.to('.entrance-prompt', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'power2.inOut'
            })
            .to('.entrance-sky', {
                opacity: 1,
                scale: 1.1,
                duration: 1.5,
                ease: 'power2.out'
            }, '-=0.4')
            .to('.entrance-mist', {
                opacity: 0,
                scale: 1.2,
                duration: 2,
                ease: 'power2.inOut'
            }, '-=1.5')
            .to('.entrance-mountain--front', {
                y: '100%',
                opacity: 0,
                duration: 1.5,
                ease: 'power3.inOut'
            }, '-=1.2')
            .to('.entrance-mountain--back', {
                y: '100%',
                opacity: 0,
                duration: 1.5,
                ease: 'power3.inOut'
            }, '-=1.3')
            .to(entranceGate, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut'
            }, '-=0.8');
        });
    } else {

        if (entranceGate) {
            entranceGate.style.display = 'none';
        }
        
        setTimeout(() => {
            lenis.start();
            initScrollReveals();
        }, 100);
    }

    const revealTexts = document.querySelectorAll('.reveal-text');
    let heroRevealTimeline;

    function prepareHeroAnimations() {
        heroRevealTimeline = gsap.timeline({ paused: true });

        revealTexts.forEach((textEl, index) => {
            const words = textEl.innerText.split(' ');
            textEl.innerHTML = ''; // clear original text
            
            words.forEach(word => {
                const wordWrap = document.createElement('span');
                wordWrap.style.display = 'inline-block';
                wordWrap.style.overflow = 'hidden';
                wordWrap.style.verticalAlign = 'bottom';
                
                const innerWord = document.createElement('span');
                innerWord.className = 'reveal-word';
                innerWord.style.display = 'inline-block';
                innerWord.style.transform = 'translateY(110%)'; 
                innerWord.innerHTML = word + '&nbsp;';
                
                wordWrap.appendChild(innerWord);
                textEl.appendChild(wordWrap);
            });
            
            heroRevealTimeline.to(textEl.querySelectorAll('.reveal-word'), {
                y: '0%',
                duration: 1.2,
                stagger: 0.04,
                ease: 'power3.out'
            }, index * 0.2); 
        });

        gsap.set('.scroll-hint', { opacity: 0, y: 20 });
    }

    prepareHeroAnimations();

    function initScrollReveals() {
        
        heroRevealTimeline.play();

        gsap.to('.scroll-hint', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.8,
            ease: 'power3.out'
        });

        gsap.fromTo('.scroll-hint-line', 
            { scaleY: 0.1 },
            { scaleY: 1, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true }
        );

        const fadeUpElements = document.querySelectorAll('.fade-up-el, .work-card, .section-title');

        gsap.set(fadeUpElements, { opacity: 0, y: 50 });

        fadeUpElements.forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        const skillChips = document.querySelectorAll('.skill-chip');
        if (skillChips.length > 0) {
            gsap.set(skillChips, { opacity: 0, y: 12 });
            skillChips.forEach((chip, i) => {
                gsap.to(chip, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: '.skills-chips',
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        }
    }

    const parallaxImg = document.querySelector('.hero-parallax-img');
    if (parallaxImg) {
        gsap.to(parallaxImg, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    Fancybox.bind("[data-fancybox='gallery']", {
        loop: true,
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["slideshow", "download", "thumbs", "close"],
            },
        },
    });

    Fancybox.bind("[data-fancybox='summit']", {
        loop: true,
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["slideshow", "download", "thumbs", "close"],
            },
        },
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    const techStackPanel = document.getElementById('tech-stack-panel');

    let comingSoonEl = document.querySelector('.passion-empty-state');
    if (!comingSoonEl) {
        comingSoonEl = document.createElement('div');
        comingSoonEl.className = 'passion-empty-state';
        comingSoonEl.innerHTML = '<p>Content coming soon.</p>';
        comingSoonEl.style.display = 'none';
        const grid = document.getElementById('passion-grid');
        if (grid) grid.appendChild(comingSoonEl);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            filterBtns.forEach(b => b.classList.remove('active'));
            
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (techStackPanel) {
                if (filterValue === 'tech') {
                    gsap.to(techStackPanel, {
                        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
                        display: 'flex'
                    });
                    if (comingSoonEl) comingSoonEl.style.display = 'none';
                } else {
                    gsap.to(techStackPanel, {
                        opacity: 0, y: 20, duration: 0.4, ease: 'power2.in',
                        display: 'none'
                    });
                    if (comingSoonEl) {
                        comingSoonEl.style.display = 'block';
                        gsap.fromTo(comingSoonEl,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                        );
                    }
                }
            }

            workCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                        display: 'block',
                        clearProps: 'transform'
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in',
                        display: 'none'
                    });
                }
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });

    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    lenis.on('scroll', ({ scroll }) => {
        if (scroll > lastScrollTop && scroll > 150) {
            
            navbar.classList.add('scroll-down');
        } else {
            
            navbar.classList.remove('scroll-down');
        }
        lastScrollTop = scroll;
    });

    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    const navItemsList = document.querySelectorAll('.nav-item');
    navItemsList.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('href');

            navLinks.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');

            if (!targetId || !targetId.startsWith('#')) return;

            e.preventDefault();

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                lenis.scrollTo(targetEl, { offset: -80 });
            }
        });
    });

    const pageSections = document.querySelectorAll('section[id], footer[id]');
    const allNavItems = document.querySelectorAll('.nav-item');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                allNavItems.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    pageSections.forEach(section => sectionObserver.observe(section));

    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        lenis.on('scroll', ({ scroll, limit }) => {
            if (limit > 0) {
                progressBar.style.width = `${(scroll / limit) * 100}%`;
            }
        });
    }

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        lenis.on('scroll', ({ scroll }) => {
            if (scroll > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    }

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (cursorDot && cursorRing) {
        
        gsap.set([cursorDot, cursorRing], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out'
            });

            gsap.to(cursorRing, {
                x: mouseX,
                y: mouseY,
                duration: 0.4,
                ease: 'power3.out'
            });
        });

        const magneticElements = document.querySelectorAll('.nav-item, .filter-btn, .submit-btn, .email-direct, .social-links a');
        
        magneticElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hover-active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hover-active');
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
            });

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                
                const x = (e.clientX - rect.left - rect.width / 2) * 0.3; 
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                
                gsap.to(el, {
                    x: x,
                    y: y,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });

        const workCardsHover = document.querySelectorAll('.work-card, .portrait-img');
        workCardsHover.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
        });

        const cursorLabelEl = document.querySelector('.cursor-label');
        const imageHoverEls = document.querySelectorAll('.portrait-img, .card-img-wrapper, .summit-img-wrap, .hobbies-cta-img, .marquee-img-wrap');

        if (cursorLabelEl) {
            imageHoverEls.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorLabelEl.textContent = 'VIEW';
                    cursorRing.classList.add('view-active');
                    cursorRing.classList.remove('hover-active');
                });
                el.addEventListener('mouseleave', () => {
                    cursorLabelEl.textContent = '';
                    cursorRing.classList.remove('view-active');
                });
            });
        }
    }

    // --- 7. Feedback Form AJAX Submission ---
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(feedbackForm);
            
            try {
                const response = await fetch(feedbackForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();
                if (response.ok) {
                    alert('Terima kasih! Feedback Anda telah berhasil dikirim.');
                    feedbackForm.reset();
                } else {
                    alert('Oops! Gagal mengirim: ' + (result.message || 'Silakan coba lagi.'));
                }
            } catch (error) {
                alert('Terjadi kesalahan jaringan. Silakan coba lagi nanti.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

