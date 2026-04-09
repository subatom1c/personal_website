// Matrix Canvas Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

// Create matrix of drops
const drops = Array(columns).fill(0).map(() => Math.random() * rows);
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン❯❮▲▼◀▶●○◎◉◆';

const colors = [
  'rgba(168, 197, 216, 1)',     // primary
  'rgba(139, 157, 195, 1)',     // secondary
  'rgba(223, 231, 239, 1)',     // accent
  'rgba(100, 200, 255, 1)',     // cyan
  'rgba(150, 150, 255, 1)',     // blue
  'rgba(100, 255, 200, 1)',     // mint
  'rgba(255, 150, 200, 1)',     // pink
  'rgba(255, 200, 100, 1)'      // orange
];

function drawMatrix() {
  // More opaque background for trail effect
  ctx.fillStyle = 'rgba(30, 40, 60, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add glow effect
  ctx.shadowBlur = 10;
  ctx.shadowColor = colors[Math.floor(Math.random() * colors.length)];

  // Draw text
  ctx.font = `bold ${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = color;
    
    const y = drops[i] * fontSize;
    ctx.fillText(text, i * fontSize, y);

    // Faster drop speed
    if (y > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    } else {
      drops[i] += 1 + Math.random() * 1.5;
    }
  }
  
  ctx.shadowBlur = 0;
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}
animate();

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

// Add subtle parallax effect to background shapes
const shapes = document.querySelectorAll('.shape');
window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const offset = (index + 1) * 20;
    const moveX = (mouseX - 0.5) * offset;
    const moveY = (mouseY - 0.5) * offset;
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

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