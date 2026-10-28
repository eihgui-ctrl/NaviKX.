// Scroll progress
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';

    const header = document.getElementById('siteHeader');
    if(h.scrollTop > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Mobile menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Animated counter
  const counterEls = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let cur = 0;
        const step = Math.max(1, Math.round(target / 60));
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target.toLocaleString() + '+'; return; }
          el.textContent = cur.toLocaleString() + '+';
          requestAnimationFrame(tick);
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => counterIO.observe(el));
