// DOM Elements
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            // Add smooth scroll with easing
            smoothScrollTo(offsetPosition, 1000);
        }
    });
});

// Custom smooth scroll function with easing
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = Date.now();
    
    function step() {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startY + difference * ease);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Advanced Header Scroll Effects
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Add/remove background based on scroll position with smooth transition
    if (scrollTop > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(20px)';
    }
    
    // Hide/show header on scroll with delay
    scrollTimeout = setTimeout(() => {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }, 100);
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Add stagger effect for multiple elements
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
    });
}, observerOptions);

// Advanced Animation System
class AnimationController {
    constructor() {
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initCounterAnimations();
    }
    
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .review-card, .about-text, .about-image, .contact-info, .contact-form'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }
    
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image img, .about-image img');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                   (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') +
                                    (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    }
}

// WhatsApp Enhanced Tracking
function trackWhatsAppClick(source) {
    console.log(`WhatsApp clicked from: ${source}`);
    
    // Add visual feedback
    const clickedElement = event.target.closest('a');
    if (clickedElement) {
        clickedElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedElement.style.transform = '';
        }, 150);
    }
    
    // You can add analytics tracking here
    // gtag('event', 'whatsapp_click', { 'source': source });
}

// Add tracking to all WhatsApp links
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const source = link.closest('section')?.className || 'unknown';
        trackWhatsAppClick(source);
    });
});

// Enhanced Image Lazy Loading with Blur Effect
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.imageObserver = new IntersectionObserver(this.handleIntersection.bind(this));
        this.init();
    }
    
    init() {
        this.images.forEach(img => {
            img.style.filter = 'blur(10px)';
            img.style.transition = 'filter 0.3s ease';
            this.imageObserver.observe(img);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.imageObserver.unobserve(entry.target);
            }
        });
    }
    
    loadImage(img) {
        const src = img.dataset.src || img.src;
        const newImg = new Image();
        
        newImg.onload = () => {
            img.src = src;
            img.style.filter = 'blur(0)';
        };
        
        newImg.src = src;
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.initializeOptimizations();
    }
    
    initializeOptimizations() {
        // Debounce scroll events
        this.debouncedScrollHandler = this.debounce(this.handleScroll.bind(this), 10);
        window.addEventListener('scroll', this.debouncedScrollHandler, { passive: true });
        
        // Optimize animations for 60fps
        this.enableGPUAcceleration();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    handleScroll() {
        // Additional optimized scroll-based functionality
        requestAnimationFrame(() => {
            // Update scroll-dependent elements
        });
    }
    
    enableGPUAcceleration() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .review-card, .cta-btn, .hero-image img'
        );
        
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
            el.style.backfaceVisibility = 'hidden';
            el.style.perspective = '1000px';
        });
    }
    
    preloadCriticalResources() {
        // Preload hero image
        const heroImg = new Image();
        heroImg.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    }
}

// Mouse Follow Effect for Hero Section
class MouseFollowEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.cursor = this.createCursor();
        this.init();
    }
    
    createCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        this.hero.appendChild(cursor);
        return cursor;
    }
    
    init() {
        this.hero.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
        
        this.hero.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        
        this.hero.addEventListener('mousemove', (e) => {
            const rect = this.hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.cursor.style.left = `${x}px`;
            this.cursor.style.top = `${y}px`;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    new AnimationController();
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        new LazyImageLoader();
    }
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    // Initialize mouse effects
    new MouseFollowEffect();
    
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    console.log('🚀 Лаборатория Контента - Сайт загружен с крутыми анимациями!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid #667eea !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);