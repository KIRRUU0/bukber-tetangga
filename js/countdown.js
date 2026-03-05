/* ═══════════════════════════════════════════════
   countdown.js
   Live countdown to event: 10 March 2026 · 17:00 WIB
   ═══════════════════════════════════════════════ */

const TARGET = new Date('2026-03-10T17:00:00+07:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function tick() {
  const diff = TARGET - Date.now();

  if (diff <= 0) {
    ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  document.getElementById('cd-days').textContent  = pad(Math.floor(diff / 86400000));
  document.getElementById('cd-hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('cd-mins').textContent  = pad(Math.floor((diff % 3600000) / 60000));
  document.getElementById('cd-secs').textContent  = pad(Math.floor((diff % 60000) / 1000));
}

tick();
setInterval(tick, 1000);
