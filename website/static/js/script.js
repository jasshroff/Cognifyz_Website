document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.classList.add('fade-out');
                // Enable scrolling after loader disappears
                document.body.style.overflow = 'visible';
            }, 1000);
        });
        // Disable scrolling while loader is visible
        document.body.style.overflow = 'hidden';
    }
    
    // Scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const logoDark = document.querySelectorAll('.logo-dark');
    const logoLight = document.querySelectorAll('.logo-light');
    const faviconDark = document.getElementById('favicon-dark');
    const faviconLight = document.getElementById('favicon-light');
    
    function updateThemeElements(theme) {
        // Update icons
        if (theme === 'light') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
            
            // Update logo visibility
            logoDark.forEach(logo => logo.style.display = 'none');
            logoLight.forEach(logo => logo.style.display = 'inline-block');
            
            // Update favicon
            if (faviconDark && faviconLight) {
                faviconDark.setAttribute('disabled', '');
                faviconLight.removeAttribute('disabled');
            }
            
            // Update theme toggle button style
            themeToggle.classList.remove('btn-outline-light');
            themeToggle.classList.add('btn-outline-dark');
        } else {
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
            
            // Update logo visibility
            logoDark.forEach(logo => logo.style.display = 'inline-block');
            logoLight.forEach(logo => logo.style.display = 'none');
            
            // Update favicon
            if (faviconDark && faviconLight) {
                faviconLight.setAttribute('disabled', '');
                faviconDark.removeAttribute('disabled');
            }
            
            // Update theme toggle button style
            themeToggle.classList.remove('btn-outline-dark');
            themeToggle.classList.add('btn-outline-light');
        }
    }
    
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeElements(savedTheme);
    }
    
    // Theme toggle button click event
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeElements(newTheme);
    });
    
    // Typing animation for the hero section
    function initTypingAnimation() {
        const element = document.querySelector('.typing-effect');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 150; // milliseconds per character
        const deleteSpeed = 75; // faster deletion speed
        const pauseTime = 2000; // pause between typing cycles
        let isDeleting = false;
        
        function typeEffect() {
            // Current text in the element
            const currentText = element.textContent;
            
            if (!isDeleting && charIndex < text.length) {
                // Add next character
                element.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                
                // If full word has been typed, pause then start deleting
                if (charIndex === text.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, pauseTime);
                    return;
                }
                
                setTimeout(typeEffect, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                // Remove one character
                element.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                
                // If all characters have been deleted
                if (charIndex === 0) {
                    isDeleting = false;
                    setTimeout(typeEffect, pauseTime / 2);
                    return;
                }
                
                setTimeout(typeEffect, deleteSpeed);
            } else {
                setTimeout(typeEffect, pauseTime / 2);
            }
        }
        
        // Start typing animation
        setTimeout(typeEffect, pauseTime / 2);
    }
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Navbar scroll behavior with smooth transition
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-sm');
        }
    });
    
    // Interactive hover effects for cards and buttons
    const addHoverInteraction = () => {
        // Program cards hover effect
        document.querySelectorAll('.program-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        });
        
        // Benefit items hover effect
        document.querySelectorAll('.benefit-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
                
                const icon = this.querySelector('.benefit-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.transition = 'transform 0.3s ease';
                
                const icon = this.querySelector('.benefit-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
        });
        
        // Button hover animations
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.transition = 'transform 0.2s ease';
            });
        });
    };

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.fade-in');
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };
    
    const handleScrollAnimation = () => {
        animateElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize animations
    handleScrollAnimation();
    
    // Add scroll-triggered number counter animation
    const counterAnimation = () => {
        const counters = document.querySelectorAll('.counter-value');
        
        counters.forEach(counter => {
            // Only animate once
            if (counter.dataset.animated === 'true') return;
            
            const elementTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (elementTop < windowHeight) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 30)); // Update every 30ms
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = current;
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 30);
            }
        });
    };
    
    // Process steps animation
    const animateProcessSteps = () => {
        const processItems = document.querySelectorAll('.process-item');
        
        processItems.forEach((item, index) => {
            // Skip if already animated
            if (item.dataset.animated === 'true') return;
            
            const elementTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (elementTop < windowHeight) {
                item.dataset.animated = 'true';
                
                // Delayed animation based on index (sequential animation)
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    
                    // Animate connector after item appears
                    const connector = item.querySelector('.process-connector');
                    if (connector) {
                        setTimeout(() => {
                            connector.style.width = '60px';
                            connector.style.opacity = '1';
                        }, 300);
                    }
                }, index * 200);
            }
        });
    };
    
    // Run counter animation on scroll
    window.addEventListener('scroll', () => {
        counterAnimation();
        animateProcessSteps();
    });
    
    // Run animations initially
    counterAnimation();
    animateProcessSteps();
    addHoverInteraction();

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset previous error messages
            contactForm.querySelectorAll('.invalid-feedback').forEach(el => {
                el.style.display = 'none';
            });
            contactForm.querySelectorAll('.form-control').forEach(el => {
                el.classList.remove('is-invalid');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                name.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.classList.add('is-invalid');
                email.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                message.nextElementSibling.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success mt-3';
                successAlert.role = 'alert';
                successAlert.innerHTML = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successAlert);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
            }
        });
    }

    // Testimonial carousel initialization
    const testimonialCarousel = document.querySelector('#testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // 3D Tilt effect for cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateY = 10 * mouseX / (cardRect.width / 2);
            const rotateX = -10 * mouseY / (cardRect.height / 2);
            
            // Apply transformation
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transformation
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Enhanced scroll-based animations
    const allAnimatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .fade-in-up');
    
    function checkElementsInView() {
        allAnimatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementPosition.top < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }
    
    // Run on scroll and initial page load
    window.addEventListener('scroll', checkElementsInView);
    checkElementsInView();
    
    // Animation for testimonial items
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    function animateTestimonials() {
        testimonialItems.forEach(item => item.classList.remove('active'));
        
        if (testimonialItems.length > 0) {
            testimonialItems[currentTestimonial].classList.add('active');
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        }
    }
    
    // Animate testimonials every 5 seconds
    if (testimonialItems.length > 0) {
        setInterval(animateTestimonials, 5000);
        animateTestimonials(); // Run initially
    }
    
    // Initialize OpenStreetMap
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Pune, Maharashtra coordinates
        const puneCoordinates = [18.5204, 73.8567];
        
        // Create map instance centered on Pune
        const map = L.map('map', {
            zoomControl: true,
            scrollWheelZoom: false, // Disable scroll wheel zoom for better UX
            dragging: true,         // Allow dragging
            zoomDelta: 0.5,         // Smoother zoom
            zoomSnap: 0.5
        }).setView(puneCoordinates, 14);
        
        // Set theme-aware map tiles
        function setMapTheme() {
            // Check current theme
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            
            // Remove any existing tile layers
            map.eachLayer(layer => {
                if (layer instanceof L.TileLayer) {
                    map.removeLayer(layer);
                }
            });
            
            // Add appropriate themed tiles
            if (currentTheme === 'dark') {
                // Dark theme tiles
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    maxZoom: 19
                }).addTo(map);
            } else {
                // Light theme tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }).addTo(map);
            }
        }
        
        // Add marker for Cognifyz office location
        const marker = L.marker(puneCoordinates, {
            title: 'Cognifyz Technologies',
            alt: 'Cognifyz Technologies Office Location',
            riseOnHover: true
        }).addTo(map);
        
        // Add a custom popup with company info
        const popupContent = `
            <div class="company-popup">
                <h5 class="mb-1">Cognifyz Technologies</h5>
                <p class="mb-1"><i class="fas fa-map-marker-alt me-1"></i> Pune, Maharashtra, India</p>
                <p class="mb-1"><i class="fas fa-phone me-1"></i> +91 7806034035</p>
                <p class="mb-0"><i class="fas fa-envelope me-1"></i> jasshroff1@gmail.com</p>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            minWidth: 200,
            maxWidth: 300,
            className: 'company-popup-container',
            closeButton: true,
            autoClose: false
        }).openPopup();
        
        // Initialize map with current theme
        setMapTheme();
        
        // Update map theme when theme toggle is clicked
        document.getElementById('themeToggle').addEventListener('click', function() {
            setTimeout(setMapTheme, 100); // Short delay to allow theme change to propagate
        });
        
        // Add a subtle pulsing animation to the marker to draw attention
        const pulseIcon = L.divIcon({
            className: 'marker-pulse-icon',
            html: '<div class="pulse-circle"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        // Add a pulse effect behind the marker
        L.marker(puneCoordinates, {
            icon: pulseIcon,
            zIndexOffset: -1000
        }).addTo(map);
        
        // Ensure map renders correctly
        setTimeout(() => {
            map.invalidateSize();
        }, 500);
    }
});