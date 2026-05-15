// Klang & Form — shared nav/footer + cursor + magnet + curtain + reveal
(function () {
  const active = location.pathname.split('/').pop() || 'index.html';
  const navHTML = `
  <nav class="main" id="nav">
    <a href="index.html" class="brand" data-link>
      <span class="brand-mark">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5"/>
          <path d="M16 2v28M2 16h28M5.2 5.2l21.6 21.6M26.8 5.2L5.2 26.8" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
        </svg>
      </span>
      Klang & Form
    </a>
    <div class="nav-center">
      <a href="index.html" data-link class="${active==='index.html'?'active':''}">Hjem</a>
      <a href="arbeid.html" data-link class="${active==='arbeid.html'?'active':''}">Arbeid</a>
      <a href="studio.html" data-link class="${active==='studio.html'?'active':''}">Studio</a>
      <a href="#" data-link>Journal</a>
      <a href="studio.html" data-link>Kontakt</a>
    </div>
    <div class="nav-cta">
      <div class="status"><span class="dot"></span>Tilgjengelig Q2 2026</div>
      <button class="btn-magnet" data-magnet>Start prosjekt →</button>
    </div>
  </nav>`;

  const footHTML = `
  <footer>
    <div class="foot-grid">
      <div class="foot-big">Klang<br/>& <em>Form</em></div>
      <div class="foot-col"><h4>Studio</h4>
        <a href="arbeid.html" data-link>Arbeid</a><a href="studio.html" data-link>Studio</a><a href="#">Journal</a><a href="studio.html" data-link>Kontakt</a>
      </div>
      <div class="foot-col"><h4>Tjenester</h4>
        <a href="#">Merkevare</a><a href="#">Nettside</a><a href="#">Produkt</a><a href="#">E-handel</a>
      </div>
      <div class="foot-col"><h4>Sosialt</h4>
        <a href="#">Instagram</a><a href="#">Are.na</a><a href="#">LinkedIn</a><a href="#">Vimeo</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Klang & Form AS · Org. 924 105 488</span>
      <span>Designet og kodet i Oslo</span>
    </div>
  </footer>`;

  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;
  const footMount = document.getElementById('foot-mount');
  if (footMount) footMount.outerHTML = footHTML;
  const cMount = document.getElementById('cursor-mount');
  if (cMount) cMount.outerHTML = `<div class="cursor" id="cursor"></div>`;

  // cursor
  const cursor = document.getElementById('cursor');
  if (cursor && !matchMedia('(pointer:coarse)').matches) {
    let mx=0,my=0,cx=0,cy=0;
    window.addEventListener('mousemove', (e) => { mx=e.clientX; my=e.clientY; });
    function tick(){ cx += (mx-cx)*.3; cy += (my-cy)*.3; cursor.style.left=cx+'px'; cursor.style.top=cy+'px'; requestAnimationFrame(tick);} tick();
    document.querySelectorAll('a, button, [data-hover], .work-card, .svc-row, .client').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // magnet
  document.querySelectorAll('[data-magnet]').forEach(b => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      b.style.transform = `translate(${x*0.3}px, ${y*0.4}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });

  // nav scrolled
  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', scrollY > 40); });

  // reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // page transition
  const curtain = document.getElementById('curtain');
  document.querySelectorAll('a[data-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      e.preventDefault();
      if (curtain) curtain.classList.add('in');
      setTimeout(() => { window.location.href = href; }, 720);
    });
  });
  window.addEventListener('pageshow', () => { if (curtain) curtain.classList.remove('in'); });
})();
