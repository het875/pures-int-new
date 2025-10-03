// ==========================================================================
// PURES INTERNATIONAL - MAIN JAVASCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initCarousel();
    initFormValidation();
    initProductFilters();
    initBackToTop();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffects();
    initModalFunctionality();
    initTooltips();
    initLazyLoading();
    initBlogFilters();
    initFAQ();
    initNewsletterForm();
    
    // Enhanced features
    initPageTransitions();
    initInteractiveElements();
    initCursorEffects();
    
    // Hero slider
    initHeroSlider();
    
    // Product categories
    initProductCategories();
    
    // Certificates carousel
    initCertificatesCarousel();
    
    // Timeline animations (for About page)
    initTimelineAnimations();
    
    // Product filtering (for Products page)
    initProductFiltering();
    
    // Enhance product cards with icons and animations
    enhanceProductCards();
    
    // Services animations (for Services page)
    initServicesAnimations();
    
    // Blog animations (for Blog page)
    initBlogAnimations();
    
    // Performance optimizations
    initPerformanceOptimizations();
    
    console.log('🚀 Pures International website initialized successfully with enhanced animations and interactions!');
    
    // Show success notification only on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('index.html')) {
        showWelcomeNotification();
    }
});

// Performance Optimizations
function initPerformanceOptimizations() {
    // Preload critical images
    const criticalImages = [
        'images/logo.png',
        'images/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Optimize animations for performance
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
    });
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Reset will-change after animation
            animatedElements.forEach(element => {
                if (element.classList.contains('is-visible')) {
                    element.style.willChange = 'auto';
                }
            });
        }, 150);
    });
}

// Welcome Notification
function showWelcomeNotification() {
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Welcome to Pures International!</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-green), var(--secondary-blue));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.5s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 1000);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ==========================================================================
// HERO SLIDER FUNCTIONALITY
// ==========================================================================

function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let autoplayInterval;

    // Set background images
    slides.forEach(slide => {
        const bgImage = slide.getAttribute('data-bg');
        if (bgImage) {
            slide.style.backgroundImage = `url('${bgImage}')`;
        }
    });

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add prev class to current slide for transition
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('prev');
        }

        // Update current slide
        currentSlide = index;

        // Add active class to current slide and indicator
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay(); // Restart autoplay
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay(); // Restart autoplay
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            startAutoplay(); // Restart autoplay
        });
    });

    // Pause autoplay on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoplay();
            startAutoplay();
        }
    });

    // Initialize
    showSlide(0);
    startAutoplay();

    console.log('🎠 Hero slider initialized with', slides.length, 'slides');
}

// ==========================================================================
// PRODUCT CATEGORIES FUNCTIONALITY
// ==========================================================================

function initProductCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (!categoryCards.length) return;

    // Add click tracking and enhanced interactions
    categoryCards.forEach((card, index) => {
        // Enhanced hover animations
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Click tracking
        card.addEventListener('click', () => {
            const categoryTitle = card.querySelector('.category-title').textContent;
            console.log(`🔗 Category clicked: ${categoryTitle}`);
            
            // Add a subtle click animation
            card.style.transform = 'translateY(-15px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 200}ms`;
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(card);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('category-card')) {
                e.preventDefault();
                focusedCard.click();
            }
        }
    });

    // Make cards keyboard accessible
    categoryCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Add keyboard focus styles
        card.addEventListener('focus', () => {
            card.style.outline = '3px solid var(--primary-green)';
            card.style.outlineOffset = '2px';
        });

        card.addEventListener('blur', () => {
            card.style.outline = 'none';
        });
    });

    console.log('🏷️ Product categories initialized with', categoryCards.length, 'categories');
}

// ==========================================================================
// CERTIFICATES CAROUSEL FUNCTIONALITY
// ==========================================================================

function initCertificatesCarousel() {
    const carousel = document.querySelector('.certificates-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.certificates-track');
    const cards = track.querySelectorAll('.certificate-card');
    const prevBtn = carousel.querySelector('.certificates-prev');
    const nextBtn = carousel.querySelector('.certificates-next');
    const indicators = carousel.querySelectorAll('.cert-indicator');
    
    let currentIndex = 0;
    let cardsToShow = getCardsToShow();
    let autoplayInterval;

    function getCardsToShow() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // var(--spacing-xl)
        const translateX = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${translateX}px)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function prevSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        currentIndex = (currentIndex - 1) < 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    function goToSlide(index) {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        currentIndex = Math.min(index, maxIndex);
        updateCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoplay();
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoplay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.contains(document.activeElement)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                stopAutoplay();
                startAutoplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                stopAutoplay();
                startAutoplay();
            }
        }
    });

    // Responsive handling
    window.addEventListener('resize', () => {
        cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    // Initialize
    updateCarousel();
    startAutoplay();

    console.log('🏆 Certificates carousel initialized with', cards.length, 'certificates');
}

// ==========================================================================
// NAVIGATION FUNCTIONALITY
// ==========================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==========================================================================
// SCROLL ANIMATIONS
// ==========================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Add stagger effect for children
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Handle special animation classes
                if (entry.target.classList.contains('logistics-animation')) {
                    animateLogistics();
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .fade-in-section, 
        .slide-in-left, 
        .slide-in-right, 
        .scale-in, 
        .stagger-children,
        .animate-fade-in-up,
        .animate-fade-in-left,
        .animate-fade-in-right,
        .animate-scale-in,
        .logistics-animation
    `);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add scroll classes to common elements
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    const cards = document.querySelectorAll('.product-card, .value-card, .service-card, .blog-card, .feature-item');
    cards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Enhanced particle effects
    initParticleEffects();
    
    // Auto-trigger hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .animate-fade-in-up, .hero .animate-fade-in-left, .hero .animate-fade-in-right');
        heroElements.forEach(el => el.classList.add('is-visible'));
    }, 500);
}

// Logistics Animation Function
function animateLogistics() {
    const logisticsContainer = document.querySelector('.logistics-animation');
    if (!logisticsContainer) return;
    
    // Add moving truck periodically
    setInterval(() => {
        createMovingVehicle('truck');
    }, 12000);
    
    // Add flying plane periodically
    setInterval(() => {
        createMovingVehicle('plane');
    }, 18000);
    
    // Add floating containers
    setInterval(() => {
        createFloatingContainer();
    }, 8000);
}

function createMovingVehicle(type) {
    const logisticsContainer = document.querySelector('.logistics-animation');
    if (!logisticsContainer) return;
    
    const vehicle = document.createElement('div');
    vehicle.className = `${type}-animation`;
    
    if (type === 'truck') {
        vehicle.innerHTML = '<i class="fas fa-truck"></i>';
        vehicle.style.top = '40px';
    } else if (type === 'plane') {
        vehicle.innerHTML = '<i class="fas fa-plane"></i>';
        vehicle.style.top = '20px';
    }
    
    logisticsContainer.appendChild(vehicle);
    
    // Remove after animation completes
    setTimeout(() => {
        if (vehicle.parentNode) {
            vehicle.parentNode.removeChild(vehicle);
        }
    }, type === 'truck' ? 15000 : 20000);
}

function createFloatingContainer() {
    const logisticsContainer = document.querySelector('.logistics-animation');
    if (!logisticsContainer) return;
    
    const container = document.createElement('div');
    container.className = 'container-icon';
    container.innerHTML = '<i class="fas fa-cube"></i>';
    container.style.left = Math.random() * 60 + 20 + '%';
    
    logisticsContainer.appendChild(container);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 6000);
}

// Enhanced Particle Effects
function initParticleEffects() {
    const particleSystems = document.querySelectorAll('.particle-system');
    
    particleSystems.forEach(system => {
        // Create additional particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = `particle-effect particle-${(i % 3) + 1}`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            system.appendChild(particle);
        }
    });
    
    // Create floating background particles
    createBackgroundParticles();
}

function createBackgroundParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(134, 239, 172, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
    
    // Add particle animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// COUNTER ANIMATIONS
// ==========================================================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (target >= 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
        }
    }, 16);
}

// ==========================================================================
// CAROUSEL FUNCTIONALITY
// ==========================================================================

function initCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
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
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause auto-slide on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > 50) { // Minimum swipe distance
                    if (deltaX > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();
}

// ==========================================================================
// FORM VALIDATION
// ==========================================================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                handleFormSubmit(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Show/hide error
    if (isValid) {
        clearError(field);
    } else {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    } else {
        alert('Thank you! Your message has been sent successfully.');
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// ==========================================================================
// PRODUCT FILTERS
// ==========================================================================

function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Handle URL parameters for direct category filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const targetButton = document.querySelector(`[data-category="${categoryParam}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

// ==========================================================================
// BACK TO TOP FUNCTIONALITY
// ==========================================================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// MOBILE MENU
// ==========================================================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ==========================================================================
// SMOOTH SCROLLING & ENHANCED INTERACTIONS
// ==========================================================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                // Enhanced smooth scroll with easing
                smoothScrollTo(offsetTop, 1000);
            }
        });
    });
    
    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.logistics-showcase') || document.querySelector('.product-highlights');
            if (nextSection) {
                const offsetTop = nextSection.getBoundingClientRect().top + window.pageYOffset - 80;
                smoothScrollTo(offsetTop, 1200);
            }
        });
    }
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced Page Transitions
function initPageTransitions() {
    // Add loading animation for page transitions
    const navLinks = document.querySelectorAll('.nav-link:not([href^="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Create loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'page-transition-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            
            loadingOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(loadingOverlay);
            
            setTimeout(() => {
                loadingOverlay.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });
}

// Enhanced Interactive Elements
function initInteractiveElements() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `scale(1.05) translate(${deltaX * 5}px, ${deltaY * 5}px)`;
        });
    });
    
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.product-card, .value-card, .service-card, .feature-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Enhanced Cursor Effects
function initCursorEffects() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.opacity = '0.5';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '0.7';
        });
    });
}

// ==========================================================================
// PARALLAX EFFECTS
// ==========================================================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Use requestAnimationFrame for smooth animation
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    window.addEventListener('scroll', handleScroll);
}

// ==========================================================================
// MODAL FUNCTIONALITY
// ==========================================================================

function initModalFunctionality() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// ==========================================================================
// ENHANCED PRODUCT MODAL FUNCTIONS
// ==========================================================================

function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    // Comprehensive product data
    const productData = {
        turmeric: {
            name: 'Premium Turmeric Powder',
            image: 'images/product-images/turmeric.jpg',
            description: 'Our premium turmeric powder is sourced from the finest farms in India, known for its high curcumin content and vibrant color. Used extensively in culinary and medicinal applications worldwide.',
            specs: ['Curcumin: 3-5%', 'Moisture: <10%', 'Grade: Export Quality', 'Origin: India', 'Color: Golden Yellow', 'Mesh Size: 80-100'],
            features: ['High Anti-inflammatory Properties', 'Natural Golden Color', 'Fine Powder Texture', 'Long Shelf Life', 'Pesticide Free', 'Non-GMO'],
            packaging: ['25kg PP Bags', '50kg Jute Bags', '1kg Consumer Packs', 'Custom Packaging Available', 'Vacuum Sealed Options']
        },
        cumin: {
            name: 'Premium Cumin Seeds',
            image: 'images/product-images/cumin.jpg',
            description: 'Aromatic cumin seeds with rich flavor and aroma, carefully selected and processed to maintain natural oils and distinctive taste profile.',
            specs: ['Purity: 99%', 'Moisture: <7%', 'Oil Content: 2.5-4%', 'Origin: Gujarat, India', 'Size: 4-6mm', 'Color: Brownish'],
            features: ['Rich Aroma', 'High Oil Content', 'Uniform Size', 'Machine Cleaned', 'Export Grade Quality', 'Long Shelf Life'],
            packaging: ['25kg PP Bags', '50kg Jute Bags', 'Bulk Containers', 'Small Retail Packs', 'Moisture-Proof Packaging']
        },
        cardamom: {
            name: 'Green Cardamom Pods',
            image: 'images/product-images/cardamom.jpg',
            description: 'Premium quality green cardamom pods with intense aroma and flavor, sourced from the Western Ghats of India, known as the Queen of Spices.',
            specs: ['Size: 6-8mm', 'Grade: Premium', 'Moisture: <12%', 'Oil Content: 4-8%', 'Origin: Kerala, India', 'Color: Natural Green'],
            features: ['Intense Aroma', 'Premium Grade', 'Hand-Picked', 'Natural Green Color', 'High Oil Content', 'Export Quality'],
            packaging: ['5kg Cartons', '10kg Boxes', '25kg Cases', 'Vacuum Sealed Packs', 'Climate Controlled Packaging']
        },
        pomegranate: {
            name: 'Fresh Pomegranate',
            image: 'images/product-images/pomegranate.jpg',
            description: 'Juicy and sweet pomegranates packed with antioxidants, vitamins, and minerals. Known for their ruby-red arils and exceptional nutritional value.',
            specs: ['Size: 300-500g', 'Variety: Anar', 'Brix: 14-16%', 'Origin: Maharashtra, India', 'Season: Oct-Feb', 'Shelf Life: 45-60 days'],
            features: ['High Antioxidants', 'Rich in Vitamin C', 'Natural Sweetness', 'Long Shelf Life', 'Premium Grade', 'Hand-Selected'],
            packaging: ['Telescopic Boxes', 'Ventilated Cartons', 'Individual Wrapping', 'Cold Storage Ready', 'Export Packaging']
        },
        mango: {
            name: 'Alphonso Mango',
            image: 'images/product-images/mango.jpg',
            description: 'King of mangoes with exceptional taste and aroma. Alphonso mangoes are prized worldwide for their sweetness, rich flavor, and smooth texture.',
            specs: ['Size: 200-350g', 'Season: Apr-Jun', 'Brix: 20-24%', 'Origin: Maharashtra, India', 'Variety: Alphonso', 'Color: Golden Yellow'],
            features: ['Exceptional Taste', 'Rich Aroma', 'Smooth Texture', 'High Sugar Content', 'Premium Quality', 'Export Grade'],
            packaging: ['Individual Cushioning', 'Ventilated Boxes', 'Temperature Controlled', 'Ripeness Indicators', 'Premium Gift Boxes']
        },
        onion: {
            name: 'Fresh Red Onion',
            image: 'images/product-images/onion.jpg',
            description: 'Premium quality red onions with long shelf life and excellent storage properties. Known for their pungency and culinary versatility.',
            specs: ['Size: 40-70mm', 'Variety: Nashik Red', 'Moisture: <85%', 'Origin: Maharashtra, India', 'Season: Dec-May', 'Shelf Life: 6-8 months'],
            features: ['Long Shelf Life', 'High Pungency', 'Uniform Size', 'Good Storage Quality', 'Export Grade', 'Machine Sorted'],
            packaging: ['Mesh Bags 25kg', 'Ventilated Bags 50kg', 'Bulk Containers', 'Custom Packaging', 'Moisture Control']
        },
        okra: {
            name: 'Fresh Okra',
            image: 'images/product-images/okra.jpg',
            description: 'Tender and fresh okra vegetables with high nutritional value. Rich in vitamins, minerals, and fiber, perfect for various culinary applications.',
            specs: ['Length: 8-12cm', 'Grade: Export Quality', 'Moisture: <90%', 'Origin: Gujarat, India', 'Season: Year Round', 'Color: Fresh Green'],
            features: ['Tender Texture', 'High Nutrition', 'Fresh Quality', 'Uniform Size', 'Pesticide Free', 'Hand-Picked'],
            packaging: ['Ventilated Boxes', 'Perforated Bags', 'Temperature Controlled', 'Moisture Regulation', 'Quick Transit']
        },
        'dehydrated-onion': {
            name: 'Dehydrated Onion',
            image: 'images/product-images/dehydrated-onion.jpg',
            description: 'Premium dehydrated onion flakes and powder made from fresh red onions using advanced dehydration technology to preserve flavor and nutrients.',
            specs: ['Moisture: <8%', 'Forms: Flakes, Powder', 'Rehydration Ratio: 1:6', 'Origin: India', 'Color: Natural White', 'Shelf Life: 24 months'],
            features: ['Long Shelf Life', 'Concentrated Flavor', 'Easy Storage', 'Multiple Forms', 'No Preservatives', 'Food Grade'],
            packaging: ['Food Grade Bags', 'Moisture Barrier', 'Nitrogen Flushed', 'Custom Sizes', 'Industrial Packaging']
        },
        sesame: {
            name: 'Sesame Seeds',
            image: 'images/product-images/sesame.jpg',
            description: 'High-quality white and black sesame seeds with excellent oil content and nutritional value. Used in food processing and oil extraction.',
            specs: ['Oil Content: 48-52%', 'Purity: 99%', 'Moisture: <6%', 'Origin: Gujarat, India', 'Types: White, Black', 'Size: 2-4mm'],
            features: ['High Oil Content', 'Premium Quality', 'Machine Cleaned', 'Sorted Grades', 'Natural Color', 'Export Standard'],
            packaging: ['PP Bags 25kg', 'Jute Bags 50kg', 'Bulk Containers', 'Food Grade Packaging', 'Pest Control']
        },
        raisins: {
            name: 'Golden Raisins',
            image: 'images/product-images/raisins.jpg',
            description: 'Premium quality golden raisins with natural sweetness made from Thompson seedless grapes using traditional sun-drying methods.',
            specs: ['Moisture: 12-15%', 'Grade: Premium', 'Size: Medium', 'Origin: Maharashtra, India', 'Variety: Thompson', 'Color: Golden'],
            features: ['Natural Sweetness', 'Premium Grade', 'Uniform Size', 'Long Shelf Life', 'Rich in Iron', 'No Artificial Colors'],
            packaging: ['Cartons 10kg', 'Bags 25kg', 'Consumer Packs', 'Vacuum Sealed', 'Moisture Controlled']
        },
        mint: {
            name: 'Dried Mint Leaves',
            image: 'images/product-images/mint.jpg',
            description: 'Aromatic dried mint leaves with refreshing flavor and natural green color. Carefully processed to retain essential oils and therapeutic properties.',
            specs: ['Moisture: <10%', 'Color: Natural Green', 'Oil Content: 0.8-1.2%', 'Origin: India', 'Form: Cut Leaves', 'Grade: Food Grade'],
            features: ['Refreshing Aroma', 'Natural Green Color', 'High Oil Content', 'Fine Quality', 'Therapeutic Properties', 'Food Grade'],
            packaging: ['Food Grade Bags', 'Moisture Barrier', 'Light Protection', 'Nitrogen Flushed', 'Custom Packaging']
        },
        'roasted-gram': {
            name: 'Roasted Gram',
            image: 'images/product-images/roasted-gram.jpg',
            description: 'Nutritious roasted chickpeas with crispy texture and rich protein content. Perfect for snacking and food processing applications.',
            specs: ['Protein: 20-25%', 'Moisture: <8%', 'Fat: 5-6%', 'Origin: India', 'Size: 6-8mm', 'Color: Golden Brown'],
            features: ['High Protein', 'Crispy Texture', 'Rich Nutrition', 'Long Shelf Life', 'Natural Processing', 'Premium Quality'],
            packaging: ['PP Bags 25kg', 'Food Grade Packaging', 'Moisture Proof', 'Bulk Containers', 'Consumer Packs']
        }
    };
    
    const product = productData[productId];
    if (!product) {
        console.warn(`Product with ID '${productId}' not found`);
        return;
    }
    
    // Populate modal content with animations
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    document.getElementById('modalTitle').textContent = 'Product Details';
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    
    // Populate specifications with icons
    const specsContainer = document.getElementById('modalSpecs');
    specsContainer.innerHTML = `
        <h4><i class="fas fa-cog"></i> Specifications:</h4>
        <div class="specs-grid">
            ${product.specs.map(spec => `
                <div class="spec-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${spec}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Populate features with icons
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = `
        <h4><i class="fas fa-star"></i> Key Features:</h4>
        <div class="features-grid">
            ${product.features.map(feature => `
                <div class="feature-item">
                    <i class="fas fa-gem"></i>
                    <span>${feature}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Populate packaging with icons
    const packagingContainer = document.getElementById('modalPackaging');
    packagingContainer.innerHTML = `
        <h4><i class="fas fa-box"></i> Packaging Options:</h4>
        <div class="packaging-grid">
            ${product.packaging.map(pack => `
                <div class="packaging-item">
                    <i class="fas fa-package"></i>
                    <span>${pack}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Update button actions
    document.getElementById('modalInquireBtn').setAttribute('onclick', `inquireProduct('${product.name}')`);
    document.getElementById('modalDownloadBtn').setAttribute('onclick', `downloadProductInfo('${product.name}')`);
    
    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function inquireProduct(productName) {
    // Create inquiry form with product details
    const subject = `Inquiry for ${productName}`;
    const body = `Hello,\n\nI am interested in learning more about your ${productName}. Please provide me with:\n\n- Current pricing\n- Minimum order quantity\n- Delivery timeline\n- Sample availability\n\nThank you!`;
    
    // Redirect to contact form with pre-filled data
    window.location.href = `contact.html?product=${encodeURIComponent(productName)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(body)}`;
}

function downloadProductInfo(productName) {
    // Generate and download product PDF
    generateProductPDF(productName);
}

function downloadCatalog() {
    // Show loading state
    const downloadBtn = document.querySelector('[onclick="downloadCatalog()"]');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    // Generate comprehensive product catalog with proper PDF formatting
    generateComprehensiveCatalogPDF();
}

// ==========================================================================
// ENHANCED PDF GENERATION FUNCTIONS
// ==========================================================================

function generateProductPDF(productName) {
    showNotification('Generating product information PDF...', 'info');
    
    // Find the product data from the current page
    const productCards = document.querySelectorAll('.product-card');
    let selectedProduct = null;
    
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.trim();
        if (title.toLowerCase().includes(productName.toLowerCase())) {
            selectedProduct = {
                name: title,
                description: card.querySelector('.product-description').textContent.trim(),
                image: card.querySelector('.product-img').src,
                specs: Array.from(card.querySelectorAll('.spec-item')).map(spec => spec.textContent.trim()),
                category: card.getAttribute('data-category')
            };
        }
    });
    
    if (selectedProduct) {
        generateSingleProductPDF(selectedProduct);
    } else {
        showNotification('Product information not found', 'error');
    }
}

function generateComprehensiveCatalogPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Company colors
        const primaryGreen = [34, 197, 94];
        const darkGray = [55, 65, 81];
        const lightGray = [243, 244, 246];
        
        let yPosition = 20;
        
        // Header with company logo area
        doc.setFillColor(...primaryGreen);
        doc.rect(0, 0, 210, 40, 'F');
        
        // Company name
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('PURES INTERNATIONAL', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Premium Agricultural Products Export', 105, 28, { align: 'center' });
        
        doc.setFontSize(10);
        doc.text('Complete Product Catalog 2025', 105, 35, { align: 'center' });
        
        yPosition = 50;
        
        // Company information section
        doc.setTextColor(...darkGray);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPANY INFORMATION', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const companyInfo = [
            'Address: Surat, Gujarat 395007, India',
            'Phone: +91 7572983322, +91 7621078868',
            'Email: info@puresinternational.com',
            'Website: www.puresinternational.com',
            'Established: Premium quality agricultural exports since inception'
        ];
        
        companyInfo.forEach(info => {
            doc.text(info, 20, yPosition);
            yPosition += 6;
        });
        
        yPosition += 10;
        
        // Certifications section
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('QUALITY CERTIFICATIONS', 20, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const certifications = [
            '✓ FSSAI Certified - Food Safety Standards',
            '✓ APEDA Registered - Agricultural Export Authority',  
            '✓ ISO Quality Standards Compliant',
            '✓ Laboratory Tested Products',
            '✓ Export Grade Quality Assurance',
            '✓ Temperature Controlled Logistics'
        ];
        
        certifications.forEach(cert => {
            doc.text(cert, 25, yPosition);
            yPosition += 6;
        });
        
        // Check if we need a new page
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        } else {
            yPosition += 15;
        }
        
        // Products section
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('OUR PRODUCT RANGE', 20, yPosition);
        yPosition += 12;
        
        // Collect all products from the page
        const products = collectProductsData();
        const categories = groupProductsByCategory(products);
        
        // Generate product sections
        Object.keys(categories).forEach(category => {
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Category header
            doc.setFillColor(...lightGray);
            doc.rect(15, yPosition - 5, 180, 8, 'F');
            
            doc.setTextColor(...primaryGreen);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(category.toUpperCase(), 20, yPosition);
            yPosition += 15;
            
            // Products in this category
            doc.setTextColor(...darkGray);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            
            const categoryProducts = categories[category].slice(0, 8); // Limit to prevent overflow
            categoryProducts.forEach(product => {
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }
                
                // Product name
                doc.setFont('helvetica', 'bold');
                doc.text(`• ${product.name}`, 25, yPosition);
                yPosition += 4;
                
                // Product description (truncated)
                doc.setFont('helvetica', 'normal');
                const description = product.description.length > 80 
                    ? product.description.substring(0, 80) + '...' 
                    : product.description;
                doc.text(`  ${description}`, 27, yPosition);
                yPosition += 6;
                
                // Specifications
                if (product.specs && product.specs.length > 0) {
                    const specsText = `  Specifications: ${product.specs.slice(0, 3).join(', ')}`;
                    doc.text(specsText, 27, yPosition);
                    yPosition += 5;
                }
                
                yPosition += 2;
            });
            
            yPosition += 8;
        });
        
        // Add new page for contact and footer
        if (yPosition > 200) {
            doc.addPage();
            yPosition = 20;
        } else {
            yPosition += 20;
        }
        
        // Contact section
        doc.setFillColor(...primaryGreen);
        doc.rect(15, yPosition - 5, 180, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('READY TO PLACE YOUR ORDER?', 20, yPosition + 5);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Contact us for competitive pricing and bulk orders', 20, yPosition + 12);
        doc.text('We ensure timely delivery worldwide', 20, yPosition + 18);
        
        // Footer
        yPosition += 40;
        doc.setTextColor(...darkGray);
        doc.setFontSize(8);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
        doc.text('© 2025 Pures International. All Rights Reserved.', 105, yPosition, { align: 'center' });
        doc.text('Page 1 of ' + doc.internal.getNumberOfPages(), 190, yPosition, { align: 'right' });
        
        // Save the PDF
        doc.save('Pures_International_Complete_Catalog_2025.pdf');
        
        // Reset button
        const downloadBtn = document.querySelector('[onclick="downloadCatalog()"]');
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Catalog';
        downloadBtn.disabled = false;
        
        showNotification('Complete catalog PDF generated successfully!', 'success');
        
    } catch (error) {
        console.error('PDF Generation Error:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
        
        // Reset button on error
        const downloadBtn = document.querySelector('[onclick="downloadCatalog()"]');
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Catalog';
        downloadBtn.disabled = false;
    }
}

function generateSingleProductPDF(product) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const primaryGreen = [34, 197, 94];
        const darkGray = [55, 65, 81];
        
        let yPosition = 20;
        
        // Header
        doc.setFillColor(...primaryGreen);
        doc.rect(0, 0, 210, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('PURES INTERNATIONAL', 105, 15, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Product Information Sheet', 105, 25, { align: 'center' });
        
        yPosition = 50;
        
        // Product name
        doc.setTextColor(...darkGray);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(product.name, 20, yPosition);
        yPosition += 15;
        
        // Category
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Category: ${product.category.toUpperCase()}`, 20, yPosition);
        yPosition += 10;
        
        // Description
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('DESCRIPTION', 20, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const descriptionLines = doc.splitTextToSize(product.description, 170);
        descriptionLines.forEach(line => {
            doc.text(line, 20, yPosition);
            yPosition += 5;
        });
        
        yPosition += 10;
        
        // Specifications
        if (product.specs.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('SPECIFICATIONS', 20, yPosition);
            yPosition += 8;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            product.specs.forEach(spec => {
                doc.text(`• ${spec}`, 25, yPosition);
                yPosition += 6;
            });
        }
        
        yPosition += 15;
        
        // Company contact info
        doc.setFillColor(245, 245, 245);
        doc.rect(15, yPosition, 180, 40, 'F');
        
        doc.setTextColor(...darkGray);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CONTACT INFORMATION', 20, yPosition + 10);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Phone: +91 7572983322, +91 7621078868', 20, yPosition + 18);
        doc.text('Email: info@puresinternational.com', 20, yPosition + 24);
        doc.text('Address: Surat, Gujarat 395007, India', 20, yPosition + 30);
        
        // Footer
        doc.setFontSize(8);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 280);
        doc.text('© 2025 Pures International', 105, 280, { align: 'center' });
        
        // Save
        const fileName = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_Info.pdf`;
        doc.save(fileName);
        
        showNotification('Product PDF generated successfully!', 'success');
        
    } catch (error) {
        console.error('Single Product PDF Error:', error);
        showNotification('Error generating product PDF', 'error');
    }
}

function collectProductsData() {
    const products = [];
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        try {
            const titleElement = card.querySelector('.product-title');
            const descElement = card.querySelector('.product-description');
            const imgElement = card.querySelector('.product-img');
            const specElements = card.querySelectorAll('.spec-item');
            
            if (titleElement && descElement) {
                products.push({
                    name: titleElement.textContent.trim(),
                    description: descElement.textContent.trim(),
                    image: imgElement ? imgElement.src : '',
                    specs: Array.from(specElements).map(spec => spec.textContent.trim()),
                    category: card.getAttribute('data-category') || 'other'
                });
            }
        } catch (error) {
            console.warn('Error processing product card:', error);
        }
    });
    
    return products;
}

function groupProductsByCategory(products) {
    const categories = {};
    const categoryNames = {
        'spices': '🌶️ SPICES & CONDIMENTS',
        'fruits': '🍎 FRESH FRUITS',
        'vegetables': '🥕 FRESH VEGETABLES',
        'dehydrated': '🍃 DEHYDRATED FOODS',
        'oilseeds': '🌱 OIL SEEDS & NUTS',
        'raisins': '🍇 RAISINS & DRIED FRUITS',
        'herbs': '🌿 HERBS & MEDICINAL PLANTS',
        'roasted': '🥜 ROASTED GRAINS & PULSES',
        'healthy-grains': '🌾 HEALTHY GRAINS',
        'other': '📦 OTHER PRODUCTS'
    };
    
    products.forEach(product => {
        const category = categoryNames[product.category] || categoryNames['other'];
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(product);
    });
    
    return categories;
}

// ==========================================================================
// PRODUCT CARDS ENHANCEMENT
// ==========================================================================

function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const categoryIcons = {
        'spices': 'fas fa-pepper-hot',
        'fruits': 'fas fa-apple-alt',
        'vegetables': 'fas fa-carrot',
        'dehydrated': 'fas fa-leaf',
        'oilseeds': 'fas fa-seedling',
        'raisins': 'fas fa-grape-cluster',
        'herbs': 'fas fa-spa',
        'roasted': 'fas fa-fire',
        'healthy-grains': 'fas fa-wheat',
        'other': 'fas fa-cube'
    };
    
    productCards.forEach((card, index) => {
        try {
            const category = card.getAttribute('data-category');
            const titleElement = card.querySelector('.product-title');
            
            if (titleElement && category) {
                // Check if icon already exists
                const existingIcon = titleElement.querySelector('i');
                if (!existingIcon) {
                    // Add icon to title
                    const iconClass = categoryIcons[category] || categoryIcons['other'];
                    const icon = document.createElement('i');
                    icon.className = iconClass;
                    
                    // Insert icon at the beginning of the title
                    titleElement.insertBefore(icon, titleElement.firstChild);
                    titleElement.insertBefore(document.createTextNode(' '), icon.nextSibling);
                }
                
                // Add animation delay based on index
                card.style.animationDelay = `${(index % 8) * 0.1}s`;
                
                // Add hover effect for product overlay
                const productImage = card.querySelector('.product-image');
                let productOverlay = card.querySelector('.product-overlay');
                
                if (productImage && !productOverlay) {
                    // Create overlay if it doesn't exist
                    const overlay = document.createElement('div');
                    overlay.className = 'product-overlay';
                    
                    const viewBtn = document.createElement('button');
                    viewBtn.className = 'product-view-btn';
                    viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
                    viewBtn.onclick = () => {
                        const productName = titleElement.textContent.trim();
                        if (typeof openProductModal === 'function') {
                            openProductModal(productName);
                        } else {
                            // Fallback to inquiry
                            inquireProduct(productName);
                        }
                    };
                    
                    overlay.appendChild(viewBtn);
                    productImage.appendChild(overlay);
                }
            }
        } catch (error) {
            console.warn('Error enhancing product card:', error);
        }
    });
    
    // Add dynamic CSS if not already added
    addDynamicProductStyles();
}

function addDynamicProductStyles() {
    if (document.getElementById('dynamic-product-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamic-product-styles';
    style.textContent = `
        .product-title i {
            margin-right: 0.5rem;
            color: var(--primary-green);
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .product-card:hover .product-title i {
            transform: scale(1.2) rotate(10deg);
            color: var(--accent-emerald);
        }
        
        @media (max-width: 768px) {
            .product-title i {
                font-size: 1rem;
                margin-right: 0.25rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}
// ==========================================================================
// ENHANCED PRODUCT FILTERING & SEARCH
// ==========================================================================

function initProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('productSearch');
    
    // Initialize filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products with animation
            filterProducts(category, productCards);
        });
    });
    
    // Initialize search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchProducts(searchTerm, productCards);
        });
    }
    
    // Initialize on page load animation
    animateProductCards();
}

function filterProducts(category, productCards) {
    productCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        // Add stagger animation delay
        setTimeout(() => {
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }, index * 50);
    });
}

function searchProducts(searchTerm, productCards) {
    productCards.forEach((card, index) => {
        const productTitle = card.querySelector('.product-title').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        const productSpecs = card.querySelector('.product-specs').textContent.toLowerCase();
        
        const matchesSearch = productTitle.includes(searchTerm) || 
                            productDescription.includes(searchTerm) || 
                            productSpecs.includes(searchTerm);
        
        setTimeout(() => {
            if (matchesSearch) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }, index * 30);
    });
}

function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ==========================================================================
// SERVICES PAGE ANIMATIONS
// ==========================================================================

function initServicesAnimations() {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.enhanced-card');
    if (serviceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-slide-up');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        serviceCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Animate process steps
    const processSteps = document.querySelectorAll('.enhanced-step');
    if (processSteps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in-up');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        processSteps.forEach(step => {
            observer.observe(step);
        });
    }

    // Animate choice items
    const choiceItems = document.querySelectorAll('.enhanced-choice');
    if (choiceItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-scale-up');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        choiceItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.animate-fade-in');
    if (sectionHeaders.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        sectionHeaders.forEach(header => {
            observer.observe(header);
        });
    }
}

// ==========================================================================
// BLOG PAGE ANIMATIONS & FILTERING
// ==========================================================================

function initBlogAnimations() {
    // Animate blog cards
    const blogCards = document.querySelectorAll('.enhanced-blog-card');
    if (blogCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-slide-up');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        blogCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Blog filter functionality
    const filterButtons = document.querySelectorAll('.enhanced-blog-filters .filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog cards
                filterBlogCards(category);
            });
        });
    }
}

function filterBlogCards(category) {
    const blogCards = document.querySelectorAll('.enhanced-blog-card');
    
    blogCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        setTimeout(() => {
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }, index * 50);
    });
}

// ==========================================================================
// TOOLTIPS
// ==========================================================================

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            const tooltip = createTooltip(tooltipText);
            this.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `-${tooltip.offsetHeight + 10}px`;
            tooltip.style.left = `50%`;
            tooltip.style.transform = 'translateX(-50%)';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--gray-800);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    return tooltip;
}

// ==========================================================================
// LAZY LOADING
// ==========================================================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// ==========================================================================
// BLOG FILTERS
// ==========================================================================

function initBlogFilters() {
    const blogFilterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (blogFilterButtons.length === 0) return;
    
    blogFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts
            blogCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================================================
// FAQ FUNCTIONALITY
// ==========================================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// ==========================================================================
// NEWSLETTER FORM
// ==========================================================================

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate subscription (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function scheduleMeeting() {
    alert('Meeting scheduling feature coming soon!');
    // In a real application, this would open a calendar widget or redirect to a scheduling system
}

function requestSample() {
    window.location.href = 'contact.html?subject=Sample Request';
}

// Load more blog articles
let currentBlogPage = 1;
const articlesPerPage = 6;

function loadMoreArticles() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more articles
    setTimeout(() => {
        alert('No more articles to load.');
        loadMoreBtn.style.display = 'none';
    }, 1500);
}

// Initialize load more functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }
});

// ==========================================================================
// PERFORMANCE OPTIMIZATION
// ==========================================================================

// Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================================================
// TIMELINE ANIMATIONS
// ==========================================================================

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const index = Array.from(timelineItems).indexOf(item);
                
                // Add delay based on item position
                setTimeout(() => {
                    if (index % 2 === 0) {
                        item.classList.add('animate-fade-in-left');
                    } else {
                        item.classList.add('animate-fade-in-right');
                    }
                }, index * 200);
                
                observer.unobserve(item);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ==========================================================================
// ERROR HANDLING
// ==========================================================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});
