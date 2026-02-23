// ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#home') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Закрываем мобильное меню после клика
      document.querySelector('.nav-list').classList.remove('active');
    }
  });
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Анимация кнопки меню
    const spans = menuToggle.querySelectorAll('span');
    if (navList.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'rotate(0deg) translate(0, 0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0deg) translate(0, 0)';
    }
  });
}

// ===== ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО =====
document.addEventListener('click', (e) => {
  if (navList && menuToggle) {
    if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
      navList.classList.remove('active');
      
      // Сбрасываем анимацию кнопки
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'rotate(0deg) translate(0, 0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0deg) translate(0, 0)';
    }
  }
});

// ===== ЗАКРЫТИЕ МЕНЮ ПРИ ПРОКРУТКЕ =====
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && navList) {
    navList.classList.remove('active');
  }
});

// ===== АНИМАЦИЯ ПРИ ПРОКРУТКЕ =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Наблюдаем за всеми секциями кроме главной
document.querySelectorAll('.section:not(.hero)').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Анимация галереи
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});