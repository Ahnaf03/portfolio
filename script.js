// =========================================================
// AF. Portfolio — shared behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-primary');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // close menu when a link is tapped (mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // no JS animation support / reduced motion → just show content
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form ---------- */
  // NOTE: this form has no backend yet. It only validates client-side
  // and shows a confirmation message. To actually receive submissions,
  // connect this form to a service like Formspree / Getform / your own
  // API, then swap the code below for a real fetch() call.
  document.querySelectorAll('.contact-form').forEach(form => {
    const note = form.querySelector('.form-note');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (note) {
        note.textContent = 'Terima kasih! Pesan kamu sudah tercatat (form ini masih perlu dihubungkan ke layanan pengiriman email seperti Formspree agar benar-benar terkirim).';
      }
      form.reset();
    });
  });

});
