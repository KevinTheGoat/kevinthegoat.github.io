// Accident Assist Network - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    // Accident Type Buttons
    const accidentButtons = document.querySelectorAll('.accident-btn');
    accidentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            accidentButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update form dropdown to match selected accident type
            const accidentType = this.getAttribute('data-type');
            const selectElement = document.getElementById('accident-type');
            if (selectElement && accidentType) {
                selectElement.value = accidentType;
            }
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Handling
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            // Basic form validation
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const accidentDate = formData.get('accident-date');
            const accidentType = formData.get('accident-type');
            const helpNeeded = formData.getAll('help-needed');

            // Validation
            if (!name || !phone || !email || !accidentDate || !accidentType) {
                alert('Please fill in all required fields.');
                e.preventDefault();
                return;
            }

            // Check if at least one help type is selected
            if (helpNeeded.length === 0) {
                alert('Please select at least one type of help needed.');
                e.preventDefault();
                return;
            }

            // Phone number validation
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                e.preventDefault();
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                e.preventDefault();
                return;
            }

            // If validation passes, form will submit to Formspree
            // No need to prevent default - let the form submit naturally
        });
    }

    // Form Success Message
    function showFormSuccess() {
        const form = document.getElementById('consultation-form');
        const originalHTML = form.innerHTML;
        
        form.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-teal); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--primary-navy); margin-bottom: 1rem;">Thank You!</h3>
                <p style="margin-bottom: 2rem;">We've received your consultation request. Our team will contact you within 24 hours.</p>
                <button type="button" class="submit-btn" onclick="location.reload()">Submit Another Request</button>
            </div>
        `;
    }

    // Appointment Button Click
    const appointmentBtns = document.querySelectorAll('.appointment-btn');
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Phone Number Formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }

    // Accessibility Widget
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', function() {
            accessibilityMenu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!accessibilityToggle.contains(e.target) && !accessibilityMenu.contains(e.target)) {
                accessibilityMenu.classList.remove('show');
            }
        });
    }

    // Scroll to Top on Page Load
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });

    // Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Header Background Change on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(248, 249, 250, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(0, 166, 147, 0.3)';
        } else {
            header.style.background = 'var(--light-gray)';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '1px solid rgba(0, 166, 147, 0.2)';
        }
    });

    // Language Selector (placeholder functionality)
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // In a real application, you would implement language switching here
            console.log('Language changed to:', selectedLanguage);
            
            if (selectedLanguage === 'es') {
                // Placeholder for Spanish translation
                alert('Spanish translation would be implemented here.');
            }
        });
    }
});

// Accessibility Functions
let currentTextSize = 1;
let isHighContrast = false;

function adjustTextSize(delta) {
    currentTextSize += delta * 0.1;
    currentTextSize = Math.max(0.8, Math.min(1.4, currentTextSize));
    
    document.body.style.fontSize = currentTextSize + 'rem';
    
    // Store preference in localStorage
    localStorage.setItem('textSize', currentTextSize);
}

function toggleHighContrast() {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast', isHighContrast);
    
    // Store preference in localStorage
    localStorage.setItem('highContrast', isHighContrast);
}

// Load accessibility preferences
window.addEventListener('load', function() {
    const savedTextSize = localStorage.getItem('textSize');
    const savedHighContrast = localStorage.getItem('highContrast');
    
    if (savedTextSize) {
        currentTextSize = parseFloat(savedTextSize);
        document.body.style.fontSize = currentTextSize + 'rem';
    }
    
    if (savedHighContrast === 'true') {
        isHighContrast = true;
        document.body.classList.add('high-contrast');
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        const mobileToggle = document.querySelector('.mobile-menu-toggle i');
        if (mobileToggle) {
            mobileToggle.classList.add('fa-bars');
            mobileToggle.classList.remove('fa-times');
        }
    }
});

// Emergency Contact Function
function callEmergency() {
    if (confirm('This will attempt to dial (305) 537-6764. Continue?')) {
        window.location.href = 'tel:305-537-6764';
    }
}

// Hero CTA Functions
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add click event to phone numbers
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(phone => {
        phone.style.cursor = 'pointer';
        phone.addEventListener('click', callEmergency);
    });
});

// Form Input Enhancements
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Prevent form submission on Enter in text inputs (except textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
        e.preventDefault();
        // Move to next input
        const form = e.target.form;
        const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
        const currentIndex = inputs.indexOf(e.target);
        const nextInput = inputs[currentIndex + 1];
        
        if (nextInput) {
            nextInput.focus();
        }
    }
});

// Add loading state to submit button
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('consultation-form');

    if (form && submitBtn) {
        form.addEventListener('submit', function() {
            // Only show loading if form validation passes
            const formData = new FormData(form);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const accidentDate = formData.get('accident-date');
            const accidentType = formData.get('accident-type');
            const helpNeeded = formData.getAll('help-needed');

            // Basic validation check
            if (name && phone && email && accidentDate && accidentType && helpNeeded.length > 0) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
                submitBtn.disabled = true;
            }
        });
    }
});