// ==================== PARTÍCULAS DE FUNDO ====================
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const duration = Math.random() * 4 + 3;
        particle.style.animation = `floatParticle ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, 8000);
    }
    
    for (let i = 0; i < 60; i++) {
        createParticle();
    }
});

// ==================== DRONE INTERATIVO 3D ====================
const droneContainer = document.getElementById('droneContainer');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

if (droneContainer) {
    // Seguir mouse com tilt 3D
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const rx = (e.clientY - cy) / cy * -8;
        const ry = (e.clientX - cx) / cx * 8;
        droneContainer.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    
    document.addEventListener('mouseleave', () => {
        droneContainer.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
    
    // Hover effects - intensify wing flutter
    droneContainer.addEventListener('mouseenter', () => {
        const wings = document.querySelectorAll('.wing');
        wings.forEach(wing => {
            wing.style.animationDuration = '0.4s';
        });
        droneContainer.style.filter = 'brightness(1.15)';
    });
    
    droneContainer.addEventListener('mouseleave', () => {
        const wings = document.querySelectorAll('.wing');
        wings.forEach(wing => {
            wing.style.animationDuration = '0.6s';
        });
        droneContainer.style.filter = 'brightness(1)';
    });
}

// ==================== PARALLAX NAS FORMAS ====================
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseXparallax = e.clientX / window.innerWidth;
    const mouseYparallax = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = 0.02 * (index + 1);
        const x = (mouseXparallax - 0.5) * 30 * speed;
        const y = (mouseYparallax - 0.5) * 30 * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==================== SCROLL SMOOTH E NAVEGAÇÃO ====================
// Botões "História" e "Saiba mais" do hero
document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const target = document.getElementById(btn.dataset.scrollTo);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const nextSection = document.querySelector('#sobre');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==================== SCROLL REVEAL & ANIMATIONS ====================
// Animar contadores de stats
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const start = 0;
    const duration = 1200;
    let startTime = null;

    function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Observer para seções (Sobre, História)
const sections = document.querySelectorAll('.reveal-section');
const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Animar stats quando a seção entra na viewport
            entry.target.querySelectorAll('.stat-number').forEach(animateCount);
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

sections.forEach(function (s) { sectionObserver.observe(s); });

// Observer para timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const itemObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            itemObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(function (item) { itemObserver.observe(item); });

// ==================== EFEITO RIPPLE NOS BOTÕES ====================
function criarRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar animação ripple ao CSS dinamicamente
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== LOG ====================
console.log('✈️ Taphros Drone Systems - Site carregado com sucesso!');