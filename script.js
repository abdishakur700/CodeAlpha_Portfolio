/**
  Abdishakur Abdi Hassan - Portfolio Interactivity Script
  Author: Abdishakur Abdi Hassan
  Features: Loading Animation, Sticky Navigation, Theme Toggling, Typing Animation, 
            Scroll Progress, Active Section Tracker, Scroll Reveal, Back-to-Top, Contact Form
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Preloader Animation
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger typing animation and initial reveals after page load
                initTypingAnimation();
                initScrollReveal();
            }, 500);
        });
        
        // Fallback in case load event takes too long
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    /* ==========================================================================
       2. Scroll Progress Bar
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        } else {
            scrollProgress.style.width = '0%';
        }
    });

    /* ==========================================================================
       3. Sticky Navigation & Back-to-Top Toggle
       ========================================================================== */
    const header = document.getElementById('header-navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Sticky Header Toggle
        if (scrollPos > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Back-to-Top Button Toggle
        if (scrollPos > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Back-to-Top Action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       4. Mobile Hamburger Menu Toggle
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        // Toggle Menu
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       5. Dark / Light Theme Toggling
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Toggle Theme Click Listener
    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                // Change to Light Theme
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                // Change to Dark Theme
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    /* ==========================================================================
       6. Dynamic Typing Animation
       ========================================================================== */
    function initTypingAnimation() {
        const typingTextSpan = document.getElementById('typing-text');
        const textArray = [
            "Software Engineering Student",
            "Front-End Web Developer",
            "Responsive Web Designer"
        ];
        const typingSpeed = 100;
        const erasingSpeed = 60;
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (typingTextSpan) {
                    typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                }
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (typingTextSpan) {
                    typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, erasingSpeed);
                }
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingSpeed + 500);
            }
        }

        // Start animation loop
        if (typingTextSpan) {
            setTimeout(type, 500);
        }
    }

    /* ==========================================================================
       7. Active Navigation Link Highlighting on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section.section');
    const scrollActiveMenu = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for sticky menu
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActiveMenu);

    /* ==========================================================================
       8. Scroll Reveal Animations
       ========================================================================== */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        
        const revealOnScroll = () => {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100; // trigger point in px
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('revealed');
                    
                    // If it is a skill card, trigger progress bar animation
                    if (element.classList.contains('skill-card')) {
                        element.classList.add('revealed');
                    }
                }
            });
        };
        
        // Run once initially
        revealOnScroll();
        
        // Run on scroll
        window.addEventListener('scroll', revealOnScroll);
    }

    /* ==========================================================================
       9. Interactive Contact Form Handler & Mock Response
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('btn-submit-contact');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch field values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            // Simple client-side validation check
            if (!name || !email || !subject || !message) {
                showStatusMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatusMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Update UI to sending status
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending Message... <i class="fas fa-spinner fa-spin"></i>';
            }

            // Construct form data
            const formData = new FormData(contactForm);

            // Submit using real Web3Forms endpoint
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                const resJson = await response.json();
                if (response.status === 200 && resJson.success) {
                    showStatusMessage(`Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`, 'success');
                    contactForm.reset();
                } else {
                    showStatusMessage(resJson.message || 'Something went wrong. Please try again later or contact me directly.', 'error');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                showStatusMessage('An error occurred. Please check your connection and try again.', 'error');
            })
            .finally(() => {
                // Re-enable send button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                }
                
                // Hide status message after 7 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.display = 'none';
                        formStatus.className = 'form-status-msg';
                    }
                }, 7000);
            });
        });
    }

    function showStatusMessage(text, type) {
        if (formStatus) {
            formStatus.textContent = text;
            formStatus.style.display = 'block';
            formStatus.className = `form-status-msg ${type}`;
        }
    }
});
