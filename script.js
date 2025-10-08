// ===========================
// Navigation Functionality
// ===========================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Smooth Scrolling
// ===========================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToContact() {
    scrollToSection('contact');
}

// Add click handlers to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===========================
// Form Validation & Submission
// ===========================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dogName: document.getElementById('dogName').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // In production, you would send this to a backend
    // For now, we'll simulate a successful submission
    await simulateFormSubmission(formData);
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.remove('show');
    }, 5000);
});

function validateForm(data) {
    // Validate name
    if (data.name.trim().length < 2) {
        alert('Please enter a valid name');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.trim().length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    // Validate service selection
    if (!data.service) {
        alert('Please select a service');
        return false;
    }
    
    return true;
}

async function simulateFormSubmission(data) {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1000);
    });
}

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    observer.observe(card);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// ===========================
// Stats Counter Animation
// ===========================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');
            
            statNumber.dataset.suffix = suffix;
            animateCounter(statNumber, targetValue);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// Service Cards Interaction
// ===========================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add a subtle pulse effect
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===========================
// Gallery Lightbox (Simple)
// ===========================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // In a production environment, you might want to implement
        // a proper lightbox/modal here
        console.log('Gallery item clicked:', this);
    });
});

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Performance Optimization
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(highlightNavigation, 10));

// ===========================
// Accessibility Enhancements
// ===========================

// Keyboard navigation for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Skip to main content
document.addEventListener('keydown', (e) => {
    // Alt + S to skip to services
    if (e.altKey && e.key === 's') {
        scrollToSection('services');
    }
    // Alt + C to skip to contact
    if (e.altKey && e.key === 'c') {
        scrollToSection('contact');
    }
});

// ===========================
// Browser Compatibility Checks
// ===========================

// Check for IntersectionObserver support
if (!('IntersectionObserver' in window)) {
    // Fallback: Add animate-in class to all elements immediately
    document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(el => {
        el.classList.add('animate-in');
    });
}

// ===========================
// Console Welcome Message
// ===========================

console.log(
    '%c🐕 Welcome to Smeagles! %c\n\nWe hope you enjoy browsing our dog sitting services.',
    'color: #FF6B6B; font-size: 20px; font-weight: bold;',
    'color: #4ECDC4; font-size: 14px;'
);

// ===========================
// Service Worker Registration (for PWA)
// ===========================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===========================
// Email Protection
// ===========================

// Simple email obfuscation to prevent spam bots
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(element => {
        const email = element.getAttribute('href').replace('mailto:', '');
        // Email is already visible, but this could be enhanced
    });
});

// ===========================
// Dynamic Copyright Year
// ===========================

const updateCopyrightYear = () => {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('©')) {
            const currentYear = new Date().getFullYear();
            element.textContent = element.textContent.replace(/\d{4}/, currentYear);
        }
    });
};

updateCopyrightYear();

// ===========================
// Form Input Enhancements
// ===========================

// Add floating label effect
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add filled class when input has value
    input.addEventListener('blur', function() {
        if (this.value) {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
    
    // Real-time validation feedback
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'var(--secondary-color)';
        } else if (this.value) {
            this.style.borderColor = 'var(--primary-color)';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.substr(0, 10);
        
        if (value.length >= 6) {
            e.target.value = `(${value.substr(0, 3)}) ${value.substr(3, 3)}-${value.substr(6)}`;
        } else if (value.length >= 3) {
            e.target.value = `(${value.substr(0, 3)}) ${value.substr(3)}`;
        } else {
            e.target.value = value;
        }
    });
}

// ===========================
// Analytics Tracking (Placeholder)
// ===========================

function trackEvent(category, action, label) {
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});

// Track service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('.service-title').textContent;
        trackEvent('Service', 'View', serviceName);
    });
});

