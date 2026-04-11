// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  htmlElement.classList.add('light');
  themeToggle.querySelector('.theme-icon').textContent = '☀️';
} else {
  htmlElement.classList.remove('light');
  themeToggle.querySelector('.theme-icon').textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  if (htmlElement.classList.contains('light')) {
    htmlElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    themeToggle.querySelector('.theme-icon').textContent = '🌙';
  } else {
    htmlElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }
});

// Matrix Canvas Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 30;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);
const drawChance = 0.15;

// Pre-compute font
ctx.font = `bold ${fontSize}px monospace`;

// Create matrix of drops
const drops = Array(columns).fill(0).map(() => Math.random() * rows);
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン❯❮▲▼◀▶●○◎◉◆';

const colors = [
  'rgba(168, 197, 216, 1)',
  'rgba(139, 157, 195, 1)',
  'rgba(223, 231, 239, 1)',
  'rgba(100, 200, 255, 1)',
  'rgba(150, 150, 255, 1)',
  'rgba(100, 255, 200, 1)',
  'rgba(255, 150, 200, 1)',
  'rgba(255, 200, 100, 1)'
];

let frameCounter = 0;
function drawMatrix() {
  ctx.fillStyle = 'rgba(30, 40, 60, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drops.length; i++) {
    if (Math.random() > drawChance) continue;
    
    const text = chars[Math.floor(Math.random() * chars.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    
    const y = drops[i] * fontSize;
    ctx.fillText(text, i * fontSize, y);
    ctx.globalAlpha = 1;

    if (y > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    } else {
      drops[i] += 0.5 + Math.random() * 0.8;
    }
  }
  
  frameCounter++;
  if (frameCounter < 2) {
    requestAnimationFrame(drawMatrix);
  } else {
    frameCounter = 0;
    setTimeout(() => requestAnimationFrame(drawMatrix), 16);
  }
}
drawMatrix();

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Subtle background only, no parallax—keep it chill
// const shapes = document.querySelectorAll('.shape');
// window.addEventListener('mousemove', (e) => { ... });

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe hero and cv sections
document.querySelectorAll('.hero, .cv-section').forEach(el => {
  observer.observe(el);
});