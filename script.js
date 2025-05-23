// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffect();
    initHeroAnimations();
    initParticles();
    initTypingEffect();
    initKeywordAnimations();
    initTechIconAnimations();
    initBadgeAnimations();
    initAvatarAnimation();
    addDynamicStyles();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations when about section is visible
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and key elements
    const sectionsToObserve = document.querySelectorAll('section, .experience-item, .blog-post, .skill-category');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--final-width', width);
        bar.style.width = '0%'; // Start from 0
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200); // Stagger the animations
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isMultiplier = target.includes('x');
        const isPlusSign = target.includes('+');
        
        let finalValue = parseInt(target.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = finalValue / 50; // Animate over 50 steps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPlusSign) displayValue += '+';
            if (isMultiplier) displayValue += 'x';
            if (isPercentage) displayValue += '%';
            
            counter.textContent = displayValue;
        }, 40);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link (이메일 주소는 실제 구현 시 실제 주소로 변경 필요)
            const mailtoLink = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('이메일 클라이언트가 열렸습니다. 메시지를 확인하고 전송해주세요.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add notification animations to CSS dynamically
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        // Parallax for floating shapes
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    // Add dynamic background effects
    createFloatingElements();
}

// Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 3 + 5;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        
        // Random colors
        const colors = ['var(--primary-blue)', 'var(--secondary-cyan)', 'var(--accent-green)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 800);
    
    // Initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 300);
    }
}

// Typing Effect
function initTypingEffect() {
    const typewriterText = document.getElementById('typewriterText');
    const cursor = document.getElementById('cursor');
    
    if (!typewriterText) return;
    
    const texts = [
        '보안 솔루션 개발자',
        '시스템 프로그래머',
        '커널 개발 전문가',
        'EDR 솔루션 개발자'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting) {
            // Typing
            typewriterText.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000); // Pause at end
                return;
            }
        } else {
            // Deleting
            typewriterText.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typeText, 500); // Pause before next text
                return;
            }
        }
        
        if (!isPaused) {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeText, speed);
        }
    }
    
    // Start typing after initial delay
    setTimeout(typeText, 1000);
}

// Keyword Animations
function initKeywordAnimations() {
    const keywords = document.querySelectorAll('.hero-keywords .keyword');
    
    keywords.forEach((keyword, index) => {
        const delay = parseInt(keyword.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
            keyword.style.animationDelay = '0s';
            keyword.classList.add('keyword-animate');
        }, 3000 + delay);
    });
}

// Create floating elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Add interactive floating elements
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-interactive';
    floatingContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(floatingContainer);
    
    // Mouse move interaction
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Move floating shapes based on mouse position
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const moveX = (x - 0.5) * speed * 20;
            const moveY = (y - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
        });
    });
    
    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.transform = '';
        });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Initialize notification styles
addNotificationStyles();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loaded .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Dark mode toggle (bonus feature)
function initDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
    
    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(darkModeToggle);
}

// Initialize dark mode toggle
initDarkModeToggle();

// Add CSS for additional animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .keyword-animate {
            animation: keywordSlideIn 0.6s ease forwards, keywordPulse 2s ease-in-out infinite 1s;
        }
        
        @keyframes keywordPulse {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-2px) scale(1.05); }
        }
        
        .floating-interactive {
            transition: all 0.3s ease;
        }
        
        .hero-visual {
            animation: floatUp 3s ease-in-out infinite;
        }
        
        @keyframes floatUp {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .code-content pre {
            overflow: visible !important;
            white-space: pre-wrap !important;
            animation: none !important;
            width: 100% !important;
            max-width: 100% !important;
        }
        
        /* Enhanced button effects */
        .btn {
            background-size: 200% 100%;
            background-position: 100% 0;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background-image: linear-gradient(45deg, var(--primary-blue) 50%, var(--primary-blue-dark) 50%);
        }
        
        .btn-primary:hover {
            background-position: 0 0;
        }
        
        .btn-secondary {
            background-image: linear-gradient(45deg, transparent 50%, var(--primary-blue) 50%);
        }
        
        /* Status indicator animation - 비활성화 */
        .status-text {
            animation: none;
        }
        
        .status-text::after {
            content: '';
            animation: none;
        }
        
        /* New Tech Icon Animations */
        @keyframes techIconBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
            40% { transform: translateY(-8px) scale(1.1); }
            60% { transform: translateY(-4px) scale(1.05); }
        }
        
        @keyframes techIconClick {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        /* Enhanced profile animations */
        .profile-section {
            animation: profileSlideIn 1.2s ease forwards;
        }
        
        @keyframes profileSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Improved hover transitions */
        .tech-icon, .badge-item, .stat-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Avatar status animation */
        .avatar-status {
            animation: statusFloat 2s ease-in-out infinite;
        }
        
        @keyframes statusFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
        }
    `;
    
    document.head.appendChild(style);
}

// Tech Icon Animations
function initTechIconAnimations() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        // Add hover sound effect (visual feedback)
        icon.addEventListener('mouseenter', () => {
            icon.style.animationName = 'techIconBounce';
            icon.style.animationDuration = '0.6s';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
        
        // Add click effect
        icon.addEventListener('click', () => {
            icon.style.animation = 'techIconClick 0.3s ease';
        });
    });
}

// Badge Animations
function initBadgeAnimations() {
    const badges = document.querySelectorAll('.badge-item');
    
    badges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateX(-5px) scale(1.02)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Enhanced Avatar Animation - 비활성화
function initAvatarAnimation() {
    // 모든 아바타 애니메이션 비활성화
    return;
} 