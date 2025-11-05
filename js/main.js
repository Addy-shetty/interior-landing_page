/**
 * EKAARA DESIGNS - MAIN JAVASCRIPT
 * Luxury Interior Design Landing Page
 * Handles interactions, animations, and dynamic behaviors
 */

// ===================================
// 1. GLOBAL VARIABLES & CONSTANTS
// ===================================

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Testimonial carousel
let currentTestimonial = 0;
const testimonialTrack = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ===================================
// 2. HEADER SCROLL BEHAVIOR
// ===================================

/**
 * Add scrolled class to header when page is scrolled
 */
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Throttle scroll events for better performance
let lastScrollTime = 0;
const scrollThrottle = 100;

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime >= scrollThrottle) {
        handleHeaderScroll();
        lastScrollTime = now;
    }
});

// ===================================
// 3. MOBILE NAVIGATION
// ===================================

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

/**
 * Close mobile menu when clicking outside
 */
function handleOutsideClick(event) {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        toggleMobileMenu();
    }
}

menuToggle.addEventListener('click', toggleMobileMenu);
document.addEventListener('click', handleOutsideClick);

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// ===================================
// 4. SMOOTH SCROLL & ACTIVE NAVIGATION
// ===================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

/**
 * Smooth scroll to section
 */
function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        scrollToSection(targetId);
    });
});

// ===================================
// 5. SCROLL-TRIGGERED REVEALS
// ===================================

/**
 * Intersection Observer for reveal animations
 */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after revealing to improve performance
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    }
);

// Observe all elements with reveal-on-scroll class
const revealElements = document.querySelectorAll('.reveal-on-scroll');
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===================================
// 6. PORTFOLIO FILTER
// ===================================

/**
 * Filter portfolio items by category
 */
function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
        }
    });
}

// Add click handlers to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        const category = btn.getAttribute('data-filter');
        filterPortfolio(category);
    });
});

// ===================================
// 7. TESTIMONIAL CAROUSEL
// ===================================

/**
 * Update testimonial carousel position
 */
function updateCarousel() {
    const translateX = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${translateX}%)`;
}

/**
 * Show next testimonial
 */
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateCarousel();
}

/**
 * Show previous testimonial
 */
function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateCarousel();
}

// Add click handlers to carousel buttons
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
}

// Auto-rotate testimonials every 8 seconds
setInterval(nextTestimonial, 8000);

// ===================================
// 8. CONTACT FORM HANDLING
// ===================================

/**
 * Validate form field
 */
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(field.value);
    }
    
    return true;
}

/**
 * Show form message
 */
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate all required fields
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            field.style.borderColor = 'var(--color-ruby)';
        } else {
            field.style.borderColor = 'var(--color-pebble)';
        }
    });
    
    if (!isValid) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    console.log('Form data:', data);
    
    // Show success message
    showFormMessage('Thank you for your message! We will contact you shortly.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send the data to your server:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showFormMessage('Thank you for your message! We will contact you shortly.', 'success');
        contactForm.reset();
    })
    .catch(error => {
        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    });
    */
}

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required')) {
                if (!validateField(input)) {
                    input.style.borderColor = 'var(--color-ruby)';
                } else {
                    input.style.borderColor = 'var(--color-pebble)';
                }
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-brass)';
        });
    });
}

// ===================================
// 9. UTILITY FUNCTIONS
// ===================================

/**
 * Scroll to contact section (used by CTA buttons)
 */
function scrollToContact() {
    scrollToSection('#contact');
}

// Make scrollToContact available globally
window.scrollToContact = scrollToContact;

/**
 * Parallax effect for hero section
 */
function handleParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
}

// Add parallax on scroll with throttling
let lastParallaxTime = 0;
const parallaxThrottle = 16; // ~60fps

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastParallaxTime >= parallaxThrottle) {
        handleParallax();
        lastParallaxTime = now;
    }
});

/**
 * Add hover effect to portfolio items
 */
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// 10. PERFORMANCE OPTIMIZATIONS
// ===================================

/**
 * Lazy load images
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// ===================================
// 11. INITIALIZATION
// ===================================

/**
 * Initialize all functions on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll position detection
    handleHeaderScroll();
    updateActiveNav();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Add animation delay to staggered elements
    const staggeredElements = document.querySelectorAll('.service-card, .portfolio-item');
    staggeredElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    console.log('Ekaara Designs website initialized successfully');
});

// ===================================
// 12. ACCESSIBILITY ENHANCEMENTS
// ===================================

/**
 * Keyboard navigation for carousel
 */
document.addEventListener('keydown', (e) => {
    if (document.activeElement.closest('.testimonials-carousel')) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    }
});

/**
 * Focus trap for mobile menu
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
        
        if (e.key === 'Escape') {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
                menuToggle.focus();
            }
        }
    });
}

if (nav) {
    trapFocus(nav);
}

// ===================================
// 13. SUBTLE BACKGROUND ANIMATION
// ===================================

/**
 * Create subtle animated background pattern (Jali-inspired)
 */
function createBackgroundPattern() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const pattern = document.createElement('div');
            pattern.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.02;
                pointer-events: none;
                background-image: 
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        var(--color-brass) 35px,
                        var(--color-brass) 36px
                    ),
                    repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 35px,
                        var(--color-brass) 35px,
                        var(--color-brass) 36px
                    );
                animation: subtle-shift 60s linear infinite;
            `;
            
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.insertBefore(pattern, section.firstChild);
        }
    });
    
    // Add animation keyframes
    if (!document.getElementById('pattern-animation')) {
        const style = document.createElement('style');
        style.id = 'pattern-animation';
        style.textContent = `
            @keyframes subtle-shift {
                0% { transform: translate(0, 0); }
                100% { transform: translate(50px, 50px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize background pattern
createBackgroundPattern();

// ===================================
// 14. ANALYTICS & TRACKING (Optional)
// ===================================

/**
 * Track user interactions for analytics
 */
function trackEvent(category, action, label) {
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track CTA clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA', 'click', button.textContent.trim());
    });
});

// Track portfolio filter usage
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Portfolio', 'filter', btn.getAttribute('data-filter'));
    });
});

// ===================================
// 15. ERROR HANDLING
// ===================================

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // In production, you might want to send errors to a logging service
});

/**
 * Handle offline/online status
 */
window.addEventListener('offline', () => {
    console.warn('Lost internet connection');
    // Optionally show a user-friendly message
});

window.addEventListener('online', () => {
    console.log('Internet connection restored');
});
