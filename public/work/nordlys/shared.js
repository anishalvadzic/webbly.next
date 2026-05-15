// Studio Nordlys — shared cursor + nav + footer + curtain + reveal
(function () {
  const active = location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <nav class="main" id="nav">
    <a href="index.html" class="brand" data-link>Studio <em>Nordlys</em></a>
    <div class="nav-links">
      <a href="index.html" data-link class="${active==='index.html'?'active':''}">Index</a>
      <a href="prosjekter.html" data-link class="${active==='prosjekter.html'?'active':''}">Prosjekter</a>
      <a href="#" data-link>Journal</a>
      <a href="studio.html" data-link class="${active==='studio.html'?'active':''}">Studio</a>
      <a href="studio.html" data-link>Kontakt</a>
    </div>
  </nav>`;

  const footHTML = `
  <footer>
    <div class="foot-inner">
      <div class="foot-brand">Studio <em>Nordlys</em></div>
      <div class="foot-col"><h4>Studio</h4>
        <a href="studio.html" data-link>Om oss</a><a href="studio.html" data-link>Kontakt</a><a href="#">Karriere</a><a href="#">Presse</a>
      </div>
      <div class="foot-col"><h4>Arkiv</h4>
        <a href="prosjekter.html" data-link>Prosjekter</a><a href="#">Journal</a><a href="#">Bok</a><a href="#">Utstillinger</a>
      </div>
      <div class="foot-col"><h4>Følg</h4>
        <a href="#">Instagram</a><a href="#">Are.na</a><a href="#">Pinterest</a><a href="#">Nyhetsbrev</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Studio Nordlys AS</span>
      <span>Tegnet med kjærlighet i Oslo</span>
    </div>
  </footer>`;

  const cursorHTML = `<div class="cursor"><div class="cursor-dot"></div></div><div class="cursor-ring" id="cursorRing"></div>`;

  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;
  const footMount = document.getElementById('foot-mount');
  if (footMount) footMount.outerHTML = footHTML;
  const cMount = document.getElementById('cursor-mount');
  if (cMount) cMount.outerHTML = cursorHTML;

  // cursor
  const cursor = document.querySelector('.cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function tick() { rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tick); }
    tick();
    document.querySelectorAll('a, button, .project, .press-card, .ap-step, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });
  }

  // nav shrink
  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); });

  // reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .split-line').forEach(el => io.observe(el));

  // page transition
  const curtain = document.getElementById('curtain');
  document.querySelectorAll('a[data-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      e.preventDefault();
      if (curtain) { curtain.classList.add('in'); curtain.classList.remove('out'); }
      setTimeout(() => { window.location.href = href; }, 620);
    });
  });
  window.addEventListener('pageshow', () => {
    if (curtain) { curtain.classList.remove('in'); curtain.classList.add('out'); setTimeout(()=>curtain.classList.remove('out'), 700); }
  });
})();
