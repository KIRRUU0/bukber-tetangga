/* ═══════════════════════════════════════════════
   scroll.js
   Scroll progress bar + bidirectional reveal system
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
   ───────────────────────────────────────── */
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const doc   = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  scrollBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
}, { passive: true });

/* ─────────────────────────────────────────
   BIDIRECTIONAL SCROLL REVEAL
   Animates on scroll down AND scroll up
   ───────────────────────────────────────── */
let lastScrollY = window.scrollY;

const revealEls = Array.from(document.querySelectorAll('.reveal'));

function resetReveal(el) {
  el.classList.remove('visible-down', 'visible-up');
  void el.offsetWidth; // force reflow so animation restarts cleanly
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const scrollingDown = window.scrollY >= lastScrollY;

    if (entry.isIntersecting) {
      resetReveal(entry.target);
      entry.target.classList.add(scrollingDown ? 'visible-down' : 'visible-up');
    } else {
      resetReveal(entry.target); // reset so it re-animates next time
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// Track scroll direction
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
}, { passive: true });

/* ─────────────────────────────────────────
   COUNTDOWN BOXES — bidirectional stagger pop
   ───────────────────────────────────────── */
const cdObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const boxes = entry.target.querySelectorAll('.cd-box');
    if (entry.isIntersecting) {
      boxes.forEach(b => { b.classList.remove('visible'); void b.offsetWidth; });
      setTimeout(() => boxes.forEach(b => b.classList.add('visible')), 80);
    } else {
      boxes.forEach(b => b.classList.remove('visible'));
    }
  });
}, { threshold: 0.2 });

const cdGrid = document.querySelector('.cd-grid');
if (cdGrid) cdObs.observe(cdGrid);

/* ─────────────────────────────────────────
   DIVIDERS — draw on enter, reset on leave
   ───────────────────────────────────────── */
const divObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.divider').forEach(el => {
  el.classList.add('divider-anim');
  divObs.observe(el);
});

/* ─────────────────────────────────────────
   HERO — play load animations once on init
   ───────────────────────────────────────── */
document.querySelectorAll('.fu').forEach(el => el.setAttribute('data-paused', ''));

requestAnimationFrame(() => {
  setTimeout(() => {
    document.querySelectorAll('.fu[data-paused]').forEach(el =>
      el.removeAttribute('data-paused')
    );
  }, 80);
});
