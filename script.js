// ─── Hamburger Menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger-btn');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav when a link is clicked (mobile)
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
    });
});

// ─── Smooth Scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 72,
                behavior: 'smooth'
            });
        }
    });
});

// ─── Header Scroll Effect ───────────────────────────────────────
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background   = 'rgba(15, 23, 42, 0.97)';
        header.style.padding      = '0.4rem 0';
        header.style.boxShadow    = '0 4px 30px rgba(0,0,0,0.6)';
    } else {
        header.style.background   = 'rgba(15, 23, 42, 0.7)';
        header.style.padding      = '0.6rem 0';
        header.style.boxShadow    = '0 10px 30px rgba(0,0,0,0.5)';
    }
}, { passive: true });

// ─── Active Nav Link on Scroll ──────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => activeSpy.observe(sec));

// ─── Scroll-in Animations ───────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);   // animate once
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('section, .card, .partner-card, .cert-badge').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    revealObserver.observe(el);
});
