/* ═══════════════════════════════════════════════
   form.js
   RSVP form — AJAX submit via Formspree
   Endpoint: https://formspree.io/f/xojkaqpy
   ═══════════════════════════════════════════════ */

document.getElementById('rsvp-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('form-msg');

  btn.disabled    = true;
  btn.textContent = 'Mengirim…';
  msg.textContent = '';
  msg.className   = 'form-msg';

  try {
    const res = await fetch('https://formspree.io/f/xojkaqpy', {
      method:  'POST',
      body:    new FormData(this),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      msg.textContent = 'Terima kasih! Sampai jumpa di sana.';
      this.reset();
    } else {
      const json = await res.json();
      msg.textContent = json?.errors?.map(err => err.message).join(', ')
        || 'Terjadi kesalahan, coba lagi.';
      msg.className = 'form-msg err';
    }

  } catch {
    msg.textContent = 'Koneksi gagal. Periksa internet dan coba lagi.';
    msg.className   = 'form-msg err';

  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send';
  }
});
