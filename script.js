// Chestnut-themed Website JavaScript with Scroll Animations

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and event listeners
    initScrollAnimations();
    initButtonRipples();
    initChatFunctionality();
    initSmoothScrolling();
    initStickyNavbar();
    initChestnutPhysics();
    
    // Add scroll animation classes to elements
    addScrollAnimationClasses();
});

// Add scroll animation classes to elements
function addScrollAnimationClasses() {
    // Add animation classes to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        if (index % 2 === 0) {
            title.classList.add('scroll-fade-in');
        } else {
            title.classList.add('scroll-scale-in');
        }
    });
    
    // Add animation classes to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        const animationClass = index % 3 === 0 ? 'scroll-slide-left' : 
                              index % 3 === 1 ? 'scroll-fade-in' : 'scroll-slide-right';
        card.classList.add(animationClass);
    });
    
    // Add animation classes to about text and stats
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('scroll-slide-left');
    }
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((stat, index) => {
        stat.classList.add('scroll-scale-in');
        stat.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add animation classes to footer content
    const footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) {
        footerBrand.classList.add('scroll-slide-left');
    }
    
    const linkGroups = document.querySelectorAll('.link-group');
    linkGroups.forEach((group, index) => {
        group.classList.add('scroll-slide-right');
        group.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Remove animation class when scrolling back up for re-animation
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize button ripple effects
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            
            // Calculate ripple position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple styles
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover effect for button expansion
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Initialize chat functionality
function initChatFunctionality() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput) {
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add typing animation
        chatInput.addEventListener('input', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Send message function
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response with delay
    setTimeout(() => {
        const botResponses = [
            "感谢您的消息！我正在处理您的请求。",
            "这是一个很有趣的问题！让我为您分析一下。",
            "我理解您的需求，这里是我的建议...",
            "根据您的描述，我认为最好的解决方案是...",
            "很高兴为您服务！还有其他问题吗？"
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomResponse, 'bot');
    }, 1000 + Math.random() * 2000);
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content" style="background: var(--gradient-primary); color: white; margin-left: auto; text-align: right; padding: 1rem; border-radius: var(--border-radius); max-width: 80%;">
                <p>${text}</p>
            </div>
            <div class="message-time" style="text-align: right; margin-top: 0.5rem;">${currentTime}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${currentTime}</div>
        `;
    }
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    chatMessages.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease-out';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // If the link is internal (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links, the default behavior will proceed
        });
    });
}

// Scroll to CTA function
function scrollToCTA() {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = ctaSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add parallax effect to floating chestnuts
function initParallaxEffect() {
    const chestnuts = document.querySelectorAll('.chestnut');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        chestnuts.forEach((chestnut, index) => {
            const speed = (index + 1) * 0.1;
            chestnut.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Initialize sticky navbar with scroll animations
function initStickyNavbar() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add loading animation
window.addEventListener('load', function() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Initialize Chestnut Physics Simulation
function initChestnutPhysics() {
    const chestnuts = document.querySelectorAll('.chestnut');
    if (!chestnuts.length) return;

    // Physics constants - adjusted for smoother motion
    const baseGravity = 0.4; // Softer gravity
    const maxVelocity = 20; // Maximum velocity
    const dampening = 0.96; // Increased air resistance for smoother stops
    const bounceFactor = 0.3; // Bounce intensity
    let lastScrollY = window.scrollY || window.pageYOffset;

    // Create physics data for each chestnut
    const chestnutData = Array.from(chestnuts).map((chestnut, index) => {
        const rect = chestnut.getBoundingClientRect();
        const heroContainer = document.querySelector('.hero'); // Use .hero as the container
        const heroRect = heroContainer.getBoundingClientRect();
        
        return {
            element: chestnut,
            mass: Math.random() * 0.8 + 0.7, // Mass between 0.7 (lighter) and 1.5 (heavier)
            x: parseFloat(chestnut.style.left) || (Math.random() * 90 + 5), // Wider initial spread
            y: parseFloat(chestnut.style.top) || (Math.random() * 20 + 40), // Start in middle-low area
            vx: (Math.random() - 0.5) * 2, // Slightly more initial horizontal velocity
            vy: 0, // Vertical velocity
            initialX: parseFloat(chestnut.style.left) || (Math.random() * 90 + 5),
            initialY: parseFloat(chestnut.style.top) || (Math.random() * 20 + 40), // Start in middle-low area
            onGround: false,
            size: parseFloat(getComputedStyle(chestnut).fontSize), // Get actual size
            opacity: 1, // Start fully visible
            rotation: Math.random() * 360
        };
    });

    // Set initial positions and styles
    chestnutData.forEach(data => {
        const chestnut = data.element;
        chestnut.style.position = 'absolute';
        chestnut.style.left = data.x + '%';
        chestnut.style.top = data.y + '%';
        chestnut.style.opacity = data.opacity;
        chestnut.style.transform = `rotate(${data.rotation}deg)`;
        chestnut.style.transition = 'none'; // Remove CSS transitions for physics
        chestnut.style.filter = 'drop-shadow(0 3px 6px rgba(80, 40, 0, 0.3))';
    });

    // Scroll Event Handling
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY || window.pageYOffset;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Define base strengths for scroll effects - adjusted for smoother motion
        const baseBoostStrength = Math.min(Math.abs(scrollDelta) * 0.2, 18);
        const baseDownwardForce = Math.min(Math.abs(scrollDelta) * 0.08, 4);

        if (scrollDelta > 0) { // Scrolled Down - chestnuts fly up
            chestnutData.forEach(data => {
                // Apply boost more readily
                const effectiveBoost = baseBoostStrength / data.mass;
                const randomBoostFactor = (Math.random() * 4) / data.mass;
                
                data.vy = -(effectiveBoost + randomBoostFactor);
                data.vx += (Math.random() - 0.5) * 1; // Add more horizontal push
                data.onGround = false;
            });
        } else if (scrollDelta < 0) { // Scrolled Up - chestnuts fall faster
            chestnutData.forEach(data => {
                if (!data.onGround) {
                    // Heavier chestnuts are more affected by downward force
                    const effectiveDownwardForce = baseDownwardForce * data.mass;
                    data.vy += effectiveDownwardForce + baseGravity;
                }
            });
        }

        lastScrollY = currentScrollY;
    });

    // Animation Loop
    function animate() {
        const heroContainer = document.querySelector('.hero'); // Use .hero as the container
        const containerHeight = heroContainer.offsetHeight;
        const containerWidth = heroContainer.offsetWidth;

        chestnutData.forEach(data => {
            // Apply gravity
            if (!data.onGround || data.vy < 0) {
                data.vy += baseGravity;
            }

            // Apply velocity with dampening
            data.vy *= dampening;
            data.vx *= dampening;
            
            // Limit maximum velocity
            data.vy = Math.max(-maxVelocity, Math.min(maxVelocity, data.vy));
            data.vx = Math.max(-maxVelocity/2, Math.min(maxVelocity/2, data.vx));

            // Update positions - reduced multiplier for smoother motion
            data.y += data.vy * 0.1;
            data.x += data.vx * 0.1;

            // Collision with container bottom (ground) - MOVED DOWN to 90%
            const groundLevel = 90 - (data.size / parseFloat(getComputedStyle(heroContainer).fontSize)) * 5;
            if (data.y >= groundLevel) {
                data.y = groundLevel;
                if (Math.abs(data.vy) > 1) {
                    data.vy *= -bounceFactor; // Bounce
                    data.vx *= 0.8; // Reduce horizontal velocity on bounce
                    data.onGround = false;
                } else {
                    data.vy = 0;
                    data.vx *= 0.9; // Gradual stop
                    data.onGround = true;
                }
            } else {
                data.onGround = false;
            }

            // Collision with container sides
            if (data.x <= 2) {
                data.x = 2;
                data.vx *= -0.5; // Bounce off left wall
            } else if (data.x >= 98) {
                data.x = 98;
                data.vx *= -0.5; // Bounce off right wall
            }

            // Collision with container top
            if (data.y <= 2) {
                data.y = 2;
                data.vy *= -0.3; // Small bounce off ceiling
            }

            // Update rotation based on movement
            data.rotation += (data.vx + data.vy) * 0.5;

            // Apply physics to DOM element
            const chestnut = data.element;
            chestnut.style.left = data.x + '%';
            chestnut.style.top = data.y + '%';
            chestnut.style.transform = `rotate(${data.rotation}deg)`;
            
            // Add subtle movement-based effects
            if (Math.abs(data.vy) > 2) {
                chestnut.style.filter = 'drop-shadow(0 5px 10px rgba(80, 40, 0, 0.4)) brightness(1.1)';
            } else {
                chestnut.style.filter = 'drop-shadow(0 3px 6px rgba(80, 40, 0, 0.3))';
            }
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}