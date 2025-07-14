document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.nav-mobile')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'nav-mobile';
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                
                mobileNav.appendChild(navLinksClone);
                document.body.appendChild(mobileNav);
            }
            
            const mobileNav = document.querySelector('.nav-mobile');
            mobileNav.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileNav = document.querySelector('.nav-mobile');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link on Scroll
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Header Scroll Effect
    function headerScrollEffect() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            document.body.classList.toggle('yearly-pricing', this.checked);
        });
    }
    
    // Testimonial Carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function showTestimonial(index) {
        if (!testimonialTrack) return;
        
        // Update currentTestimonial
        currentTestimonial = index;
        
        // Update testimonial position
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize testimonial position
    showTestimonial(0);
    
    // Event listeners for carousel controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            showTestimonial(i);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotate on hover
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        });
    }
    
    // Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailValue = emailInput.value.trim();
            const formGroup = emailInput.parentElement;
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(emailValue)) {
                formGroup.classList.add('error');
                return;
            }
            
            // If valid, remove error class
            formGroup.classList.remove('error');
            
            // Hide form and show success message
            newsletterForm.style.display = 'none';
            document.querySelector('.success-message').classList.add('show');
            
            // Reset form after submission
            newsletterForm.reset();
            
            // You would typically send the form data to a server here
        });
        
        // Remove error class on input focus
        emailInput.addEventListener('focus', function() {
            this.parentElement.classList.remove('error');
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .instructor-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('show');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        headerScrollEffect();
        setActiveNavLink();
        animateOnScroll();
    });
    
    // Trigger these functions on initial load
    headerScrollEffect();
    setActiveNavLink();
    animateOnScroll();
});