/**
 * Muhammad Junaid - Portfolio JavaScript
 * Interactive Features:
 * 1. Mobile Navigation & Smooth Scrolling
 * 2. Dynamic Text Typing & Deleting Animation
 * 3. Interactive Project Showcase Slideshow (Auto-play, Controls, Indicators)
 * 4. Interactive Accordion (Smooth Expand/Collapse with rotating chevrons)
 * 5. Scroll-triggered Reveal Animations & Counter Number Animation
 * 6. Dynamic Skill Bars Fill on Scroll
 * 7. 3D Tilt Micro-interactions on Cards & Avatar
 * 8. Back to Top Button with Circular Scroll Progress
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE NAVIGATION & BACKDROP
    // ==========================================
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-open');
            hamburger.classList.toggle('is-active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('nav-open') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('nav-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Navbar background blur & shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightActiveSection);

    // ==========================================
    // 2. DYNAMIC TYPING EFFECT (TEXT ANIMATION)
    // ==========================================
    const typedTextElement = document.getElementById('typedText');
    if (typedTextElement) {
        const words = [
            'Full Stack Developer',
            'Mobile App Developer',
            'AI Solutions Builder',
            '2D Game Developer',
            'CS Student @ COMSATS'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 90;
        const deleteSpeed = 50;
        const delayBetweenWords = 1800;

        function typeLoop() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                nextSpeed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                nextSpeed = 350;
            }

            setTimeout(typeLoop, nextSpeed);
        }

        typeLoop();
    }

    // ==========================================
    // 3. INTERACTIVE SLIDESHOW / CAROUSEL
    // ==========================================
    const track = document.getElementById('slidesTrack');
    const slides = Array.from(document.querySelectorAll('.slide-item'));
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    const dotsContainer = document.getElementById('slideDots');
    const slideCounter = document.getElementById('slideCounter');
    let currentSlide = 0;
    let autoSlideInterval = null;
    const autoSlideDelay = 5500;

    if (track && slides.length > 0) {
        // Create indicator dots
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('slide-dot');
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slide-dot');

        function updateSlideUI() {
            slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === currentSlide);
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlide);
            });
            if (slideCounter) {
                slideCounter.textContent = `0${currentSlide + 1} / 0${slides.length}`;
            }
        }

        function goToSlide(index) {
            if (index < 0) {
                currentSlide = slides.length - 1;
            } else if (index >= slides.length) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateSlideUI();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        // Auto play slideshow
        function startAutoSlide() {
            if (!autoSlideInterval) {
                autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
            }
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Pause on mouse hover for desktop, restart on leave
        const sliderWrapper = document.querySelector('.slideshow-container');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
            sliderWrapper.addEventListener('mouseleave', startAutoSlide);

            // Touch Swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            sliderWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });

            sliderWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, { passive: true });

            function handleSwipe() {
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        }

        startAutoSlide();
        updateSlideUI();
    }

    // ==========================================
    // 4. INTERACTIVE ACCORDION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close other accordion items (accordion mode)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherContent.style.maxHeight = null;
                    const otherBtn = otherItem.querySelector('.accordion-header');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
                header.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Open first accordion item by default
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem) {
        const firstHeader = firstAccordionItem.querySelector('.accordion-header');
        const firstContent = firstAccordionItem.querySelector('.accordion-content');
        if (firstHeader && firstContent) {
            firstAccordionItem.classList.add('active');
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            firstHeader.setAttribute('aria-expanded', 'true');
        }
    }

    // ==========================================
    // 5. ANIMATED NUMBER COUNTERS ON SCROLL
    // ==========================================
    const statCounters = document.querySelectorAll('.stat-number[data-target]');
    let statsAnimated = false;

    function animateCounters() {
        statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1600;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    }

    // ==========================================
    // 6. SCROLL REVEAL & SKILL BARS FILL
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    function triggerSkillBars() {
        if (skillsAnimated) return;
        skillFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width') || fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
        skillsAnimated = true;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate stats if hero stats in view
                if (entry.target.classList.contains('hero-stats') && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }

                // Animate skills if skills grid in view
                if (entry.target.classList.contains('skills-grid')) {
                    triggerSkillBars();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    // Also observe stats and skills directly
    const heroStatsEl = document.querySelector('.hero-stats');
    if (heroStatsEl) scrollObserver.observe(heroStatsEl);

    const skillsGridEl = document.querySelector('.skills-grid');
    if (skillsGridEl) scrollObserver.observe(skillsGridEl);

    // ==========================================
    // 7. 3D TILT EFFECT ON CARDS & IMAGES
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-effect');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ==========================================
    // 8. BACK TO TOP BUTTON WITH SCROLL PROGRESS
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.getElementById('progressCircle');

    if (backToTopBtn && progressCircle) {
        const circumference = 2 * Math.PI * 18; // radius 18
        progressCircle.style.strokeDasharray = `${circumference}`;
        progressCircle.style.strokeDashoffset = `${circumference}`;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = docHeight > 0 ? scrollTop / docHeight : 0;
            const offset = circumference - (scrollPercentage * circumference);
            progressCircle.style.strokeDashoffset = offset;

            if (scrollTop > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 9. PROJECT FILTER TABS (BONUS INTERACTIVITY)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.92)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

});
