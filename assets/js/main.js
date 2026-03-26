/**
 * Main JS for Speech Therapy Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollAnimations();
    initNavbar();
});

// --- Theme Toggle & RTL ---
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-bs-theme', storedTheme);
    updateToggleIcon(storedTheme);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    };

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('#rtlToggle, #rtlToggleMobile');
    const updateRTL = (isRTL) => {
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        const rtlLink = document.getElementById('rtlStyle');
        if (rtlLink) rtlLink.disabled = !isRTL;
        localStorage.setItem('rtl', isRTL ? 'true' : 'false');
    };

    // Load stored RTL preference
    const storedRTL = localStorage.getItem('rtl') === 'true';
    if (storedRTL) updateRTL(true);

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
            updateRTL(!currentRTL);
        });
    });
}

function updateToggleIcon(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        icon.className = theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun';
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// --- Navbar Behavior ---
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Offcanvas Close on Link Click
    const offcanvas = document.getElementById('mobileMenu');
    if (offcanvas) {
        const navLinks = offcanvas.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) bsOffcanvas.hide();
            });
        });
    }
}
