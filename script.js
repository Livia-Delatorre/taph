// Configuração das partículas de fundo
document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas manualmente (já que o particles.js pode não estar funcionando)
    const particlesContainer = document.querySelector('.particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório entre 2px e 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Duração da animação aleatória
        const duration = Math.random() * 4 + 3;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
        
        // Remover e recriar partícula após um tempo para efeito contínuo
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, 8000);
    }
    
    // Criar 60 partículas iniciais
    for (let i = 0; i < 60; i++) {
        createParticle();
    }
});

// Drone interativo que segue o mouse
const droneContainer = document.getElementById('droneContainer');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let targetScale = 1;
let currentScale = 1;

if (droneContainer) {
    document.addEventListener('mousemove', (e) => {
        // Calcula posição do mouse relativa ao centro da tela
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        mouseX = (e.clientX - centerX) / 40;
        mouseY = (e.clientY - centerY) / 40;
    });
    
    // Anima o drone suavemente seguindo o mouse
    function animateDrone() {
        // Suaviza o movimento
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        // Aplica a transformação 3D
        droneContainer.style.transform = `rotateY(${currentX}deg) rotateX(${-currentY}deg) translateZ(20px) scale(${currentScale})`;
        
        requestAnimationFrame(animateDrone);
    }
    
    animateDrone();
    
    // Efeito de hover no drone
    droneContainer.addEventListener('mouseenter', () => {
        targetScale = 1.05;
        // Acelera as hélices ao passar o mouse
        const propellers = document.querySelectorAll('.propeller');
        propellers.forEach(prop => {
            prop.style.animationDuration = '0.15s';
        });
        
        // Intensifica o brilho dos LEDs
        const leds = document.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.animationDuration = '0.5s';
        });
        
        // Efeito de escala suave
        let scaleStep = 0;
        function smoothScale() {
            if (scaleStep < 1) {
                scaleStep += 0.1;
                currentScale = 1 + (scaleStep * 0.05);
                setTimeout(smoothScale, 20);
            }
        }
        smoothScale();
    });
    
    droneContainer.addEventListener('mouseleave', () => {
        targetScale = 1;
        // Volta à velocidade normal das hélices
        const propellers = document.querySelectorAll('.propeller');
        propellers.forEach(prop => {
            prop.style.animationDuration = '0.3s';
        });
        
        // Normaliza o brilho dos LEDs
        const leds = document.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.animationDuration = '1.5s';
        });
        
        // Volta à escala normal
        let scaleStep = 1;
        function smoothScaleBack() {
            if (scaleStep > 0) {
                scaleStep -= 0.1;
                currentScale = 1 + (scaleStep * 0.05);
                setTimeout(smoothScaleBack, 20);
            }
        }
        smoothScaleBack();
        
        // Reseta a rotação do mouse
        mouseX = 0;
        mouseY = 0;
    });
    
    // Efeito de clique no drone
    droneContainer.addEventListener('click', () => {
        droneContainer.style.animation = 'shake 0.5s ease-in-out';
        
        // Efeito de pulsar nas hélices
        const propellers = document.querySelectorAll('.propeller');
        propellers.forEach(prop => {
            prop.style.animationDuration = '0.1s';
            setTimeout(() => {
                prop.style.animationDuration = '0.3s';
            }, 500);
        });
        
        setTimeout(() => {
            droneContainer.style.animation = '';
        }, 500);
    });
}

// Animação de shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotateY(0deg) rotateX(0deg) translateZ(20px); }
        25% { transform: rotateY(10deg) rotateX(5deg) translateZ(25px); }
        75% { transform: rotateY(-10deg) rotateX(-5deg) translateZ(15px); }
    }
    
    @keyframes floatDrone {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
        }
    }
    
    @keyframes glowPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0.3;
        }
    }
    
    @keyframes ledBlink {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.3;
            transform: scale(0.8);
        }
    }
    
    @keyframes rotorGlow {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 0.7;
            transform: scale(1.15);
        }
    }
    
    .drone-container {
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    /* Efeito de hover nos botões com ripple */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .btn:hover::before {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);

// Botões interativos
const historiaBtn = document.querySelector('.btn-primary');
const saibaMaisBtn = document.querySelector('.btn-secondary');

if (historiaBtn) {
    historiaBtn.addEventListener('click', (e) => {
        criarRipple(e, historiaBtn);
        console.log('História clicada');
        // Adicione sua ação aqui
        alert('Em breve: Nossa história!');
    });
}

if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener('click', (e) => {
        criarRipple(e, saibaMaisBtn);
        console.log('Saiba mais clicado');
        // Adicione sua ação aqui
        alert('Em breve: Mais informações!');
    });
}

// Função para criar efeito ripple nos botões
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

// Adicionar animação ripple ao CSS
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

// Efeito de rotação nas hélices com variação de velocidade
let rotationSpeed = 0.3;
setInterval(() => {
    const propellers = document.querySelectorAll('.propeller');
    // Pequena variação aleatória na velocidade para efeito mais realista
    const variation = Math.random() * 0.05 + 0.28;
    propellers.forEach(prop => {
        prop.style.animationDuration = variation + 's';
    });
}, 3000);

// Efeito de brilho nos LEDs
const leds = document.querySelectorAll('.led');
setInterval(() => {
    leds.forEach(led => {
        const randomIntensity = Math.random() * 0.5 + 0.5;
        led.style.boxShadow = `0 0 ${10 + Math.random() * 10}px ${led.style.backgroundColor || '#00ff00'}`;
    });
}, 500);

// Scroll suave para o indicador
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Adicionar efeito de paralax ao fundo
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

// Prevenir que o drone saia da tela em dispositivos móveis
if ('ontouchstart' in window) {
    droneContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        mouseX = (touch.clientX - centerX) / 40;
        mouseY = (touch.clientY - centerY) / 40;
    });
}

console.log('Drone interativo carregado com sucesso! 🚁');