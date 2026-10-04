const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('open');
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    window.setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  progress.style.width = `${pct}%`;
}, { passive: true });

const copyButton = document.getElementById('copyEmail');
copyButton?.addEventListener('click', async () => {
  const email = 'contact@chukeluemmanuel.com';
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = 'Copied';
    window.setTimeout(() => (copyButton.textContent = 'Copy email'), 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});
