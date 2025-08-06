// novo-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Animação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configuração inicial para animações
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Disparar animação ao carregar e ao rolar
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Efeito hover nos cards de preço
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            } else {
                this.style.transform = 'translateY(-20px)';
            }
        });
    });
});
// ===== Carrossel de Imagens =====
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const images = [
        'img/japao01.jpg',
        'img/japao02.jpg',
        'img/japao03.jpg',
        'img/manga1.jpg'
    ];

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagem ${index + 1}`;
        img.classList.add('carousel-slide');
        if (index === 0) img.classList.add('active');
        carouselContainer.appendChild(img);
    });

    const buttons = document.createElement('div');
    buttons.classList.add('carousel-buttons');
    buttons.innerHTML = `
        <button id="prevBtn">&#10094;</button>
        <button id="nextBtn">&#10095;</button>
    `;
    carouselContainer.appendChild(buttons);

    const heroImage = document.querySelector('.hero-image');
    heroImage.appendChild(carouselContainer);

    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    };

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });
});
const formInscricao = document.getElementById('form-inscricao');
formInscricao.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = this.nome.value.trim();
    const email = this.email.value.trim();
    const telefone = this.telefone.value.trim();

    if (nome && email && telefone) {
        alert(`Obrigado pela inscrição, ${nome}! Entraremos em contato em breve.`);
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('faqCarousel');
  const items = carousel.querySelectorAll('.faq-item');
  const prevBtn = document.getElementById('prevFaq');
  const nextBtn = document.getElementById('nextFaq');
  const toggleBtn = document.getElementById('toggleFaq');

  let index = 0;
  let isPlaying = true;
  let interval;

  const showSlide = (i) => {
    const x = items[i].offsetLeft;
    carousel.scrollTo({ left: x, behavior: 'smooth' });
  };

  const start = () => {
    interval = setInterval(() => {
      index = (index + 1) % items.length;
      showSlide(index);
    }, 5000);
    toggleBtn.textContent = 'Pausar';
    isPlaying = true;
  };

  const stop = () => {
    clearInterval(interval);
    toggleBtn.textContent = 'Retomar';
    isPlaying = false;
  };

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    showSlide(index);
    stop();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    showSlide(index);
    stop();
  });

  toggleBtn.addEventListener('click', () => {
    isPlaying ? stop() : start();
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', () => { if(isPlaying) start(); });
  items.forEach((item) => item.addEventListener('click', stop));

  start();
});