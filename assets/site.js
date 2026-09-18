const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.navlinks');

function setHeaderState() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 28);
}
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxSections = [...document.querySelectorAll('[data-parallax]')];

function updateParallax() {
  if (reducedMotion || window.innerWidth < 821) return;
  for (const section of parallaxSections) {
    const bg = section.querySelector('.parallax-bg');
    if (!bg) continue;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    const speed = Number(section.dataset.parallax || 0.12);
    const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
    bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
  }
}
updateParallax();
window.addEventListener('scroll', updateParallax, { passive: true });
window.addEventListener('resize', updateParallax);

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('in-view'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
