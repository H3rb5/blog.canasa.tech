// Mobile Optimized JavaScript - Knowledge Canvas
// This file contains all mobile-specific functionality and optimizations

class MobileOptimizer {
    constructor() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.isMobile = window.innerWidth <= 768;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupTouchInteractions();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.setupResponsiveHandlers();
        this.setupCategoryButtons();
    }
    
    // Mobile Menu Functionality
    setupMobileMenu() {
        if (!this.mobileMenuToggle || !this.navLinks) return;
        
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when clicking on a link
        this.navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navLinks.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        
        // Animate hamburger to X
        const spans = this.mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.add('active'));
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstLink = this.navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }
    
    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        
        // Animate X back to hamburger
        const spans = this.mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        this.mobileMenuToggle.focus();
    }
    
    // Touch Interactions
    setupTouchInteractions() {
        const touchTargets = document.querySelectorAll(`
            .nav-links a,
            .category-btn,
            .read-more,
            .newsletter-btn,
            .tab-button,
            .ucd-stage,
            .card,
            .blog-card
        `);
        
        touchTargets.forEach(target => {
            // Touch feedback
            target.addEventListener('touchstart', (e) => {
                if (this.isMobile) {
                    target.style.transform = 'scale(0.95)';
                    target.style.transition = 'transform 0.1s ease';
                }
            });
            
            target.addEventListener('touchend', (e) => {
                if (this.isMobile) {
                    target.style.transform = 'scale(1)';
                }
            });
            
            // Prevent double-tap zoom on buttons
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                target.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    target.click();
                });
            }
        });
    }
    
    // Performance Optimizations
    setupPerformanceOptimizations() {
        if (!this.isMobile) return;
        
        // Reduce animations on mobile
        const animatedElements = document.querySelectorAll('.blog-card, .card');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
        
        // Optimize scroll performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll-based animations here if needed
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Optimize resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    // Accessibility Improvements
    setupAccessibility() {
        // Improve focus management
        const focusableElements = document.querySelectorAll(`
            a[href],
            button,
            input,
            textarea,
            select,
            [tabindex]:not([tabindex="-1"])
        `);
        
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isMenuOpen) {
                const focusableInMenu = this.navLinks.querySelectorAll(`
                    a[href],
                    button,
                    [tabindex]:not([tabindex="-1"])
                `);
                
                const firstElement = focusableInMenu[0];
                const lastElement = focusableInMenu[focusableInMenu.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        // Improve ARIA labels
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
            this.mobileMenuToggle.setAttribute('aria-controls', 'mobile-menu');
        }
        
        if (this.navLinks) {
            this.navLinks.setAttribute('id', 'mobile-menu');
            this.navLinks.setAttribute('aria-label', 'Mobile navigation menu');
        }
    }
    
    // Responsive Handlers
    setupResponsiveHandlers() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        });
        
        // Handle viewport changes
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        mediaQuery.addEventListener('change', (e) => {
            this.isMobile = e.matches;
            this.handleResize();
        });
    }
    
    handleResize() {
        // Close mobile menu if screen becomes larger
        if (!this.isMobile && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update mobile state
        this.isMobile = window.innerWidth <= 768;
        
        // Reinitialize touch interactions if needed
        if (this.isMobile) {
            this.setupTouchInteractions();
        }
    }
    
    setupCategoryButtons() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    }

    // Utility Methods
    updateAriaLabels() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
        }
    }
    
    // Chart.js Mobile Optimization
    optimizeCharts() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(canvas => {
            if (this.isMobile) {
                // Reduce chart complexity on mobile
                const chart = Chart.getChart(canvas);
                if (chart) {
                    chart.options.responsive = true;
                    chart.options.maintainAspectRatio = false;
                    
                    // Optimize for mobile
                    if (chart.options.scales) {
                        Object.values(chart.options.scales).forEach(scale => {
                            if (scale.ticks) {
                                scale.ticks.maxTicksLimit = 5;
                            }
                        });
                    }
                    
                    chart.resize();
                }
            }
        });
    }
}

// Enhanced Touch Interactions
class TouchOptimizer {
    constructor() {
        this.setupTouchOptimizations();
    }
    
    setupTouchOptimizations() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Improve touch scrolling
        const scrollableElements = document.querySelectorAll('.nav-links, .content-section');
        scrollableElements.forEach(el => {
            el.style.webkitOverflowScrolling = 'touch';
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.monitorPerformance();
    }
    
    monitorPerformance() {
        // Monitor frame rate on mobile
        if (window.innerWidth <= 768) {
            let frameCount = 0;
            let lastTime = performance.now();
            
            const countFrames = () => {
                frameCount++;
                const currentTime = performance.now();
                
                if (currentTime - lastTime >= 1000) {
                    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                    
                    // Log performance issues
                    if (fps < 30) {
                        console.warn('Low frame rate detected:', fps, 'fps');
                    }
                    
                    frameCount = 0;
                    lastTime = currentTime;
                }
                
                requestAnimationFrame(countFrames);
            };
            
            requestAnimationFrame(countFrames);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile optimizations
    window.mobileOptimizer = new MobileOptimizer();
    window.touchOptimizer = new TouchOptimizer();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Optimize charts if they exist
    if (typeof Chart !== 'undefined') {
        setTimeout(() => {
            window.mobileOptimizer.optimizeCharts();
        }, 1000);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// Export for use in other scripts
window.MobileOptimizer = MobileOptimizer;
window.TouchOptimizer = TouchOptimizer;
window.PerformanceMonitor = PerformanceMonitor;
