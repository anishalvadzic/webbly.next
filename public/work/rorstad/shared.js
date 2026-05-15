// Rørstad VVS — shared nav/footer mount + scroll reveal + page transition
(function () {
  const active = location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <div class="util">
    <div class="util-inner">
      <span><span class="pulse"></span>&nbsp;&nbsp;Døgnvakt — vi rykker ut nå</span>
      <a href="#">Oslo, Bærum, Asker, Lillestrøm</a>
      <span class="spacer"></span>
      <a href="#">📍 Sandakerveien 24c</a>
      <a href="#">Logg inn</a>
    </div>
  </div>
  <nav class="main">
    <div class="nav-inner">
      <a href="index.html" class="logo" data-link>
        <span class="logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5C12 2.5 6 9 6 14a6 6 0 0 0 12 0c0-5-6-11.5-6-11.5z"/></svg>
        </span>
        Rørstad VVS
      </a>
      <div class="nav-links">
        <a href="index.html" data-link class="${active==='index.html'?'active':''}">Hjem</a>
        <a href="tjenester.html" data-link class="${active==='tjenester.html'?'active':''}">Tjenester</a>
        <a href="#" data-link>Prosjekter</a>
        <a href="#" data-link>Om oss</a>
        <a href="kontakt.html" data-link class="${active==='kontakt.html'?'active':''}">Kontakt</a>
      </div>
      <div class="nav-cta">
        <span class="phone-num"><span class="dot"></span> 22 50 40 30</span>
        <a href="kontakt.html" class="btn btn-warn" data-link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Akutt hjelp
        </a>
      </div>
    </div>
  </nav>`;

  const footHTML = `
  <footer>
    <div class="foot-inner">
      <div class="foot-col">
        <div class="logo">
          <span class="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5C12 2.5 6 9 6 14a6 6 0 0 0 12 0c0-5-6-11.5-6-11.5z"/></svg>
          </span>
          Rørstad VVS
        </div>
        <p class="foot-about">Familiebedrift fra Sandaker. Vi har holdt Oslo tørt siden 1998 — og fortsetter med det.</p>
      </div>
      <div class="foot-col"><h4>Tjenester</h4>
        <a href="tjenester.html" data-link>Bad og sanitær</a>
        <a href="tjenester.html" data-link>Varmeanlegg</a>
        <a href="tjenester.html" data-link>Akutt utrykning</a>
        <a href="tjenester.html" data-link>Vedlikehold</a>
      </div>
      <div class="foot-col"><h4>Selskap</h4>
        <a href="#">Om oss</a><a href="#">Prosjekter</a><a href="#">Karriere</a><a href="#">Presse</a>
      </div>
      <div class="foot-col"><h4>Kontakt</h4>
        <a href="#">22 50 40 30</a><a href="#">post@rorstad.no</a>
        <a href="#">Sandakerveien 24c, 0473 Oslo</a><a href="#">Org. 916 504 233</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Rørstad VVS AS</span>
      <span>Personvern · Vilkår · Cookies</span>
    </div>
  </footer>`;

  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;
  const footMount = document.getElementById('foot-mount');
  if (footMount) footMount.outerHTML = footHTML;

  // reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // page transition
  const curtain = document.getElementById('curtain');
  document.querySelectorAll('a[data-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      e.preventDefault();
      if (curtain) curtain.classList.add('in');
      setTimeout(() => { window.location.href = href; }, 580);
    });
  });
  window.addEventListener('pageshow', () => { if (curtain) { curtain.classList.remove('in'); curtain.classList.add('out'); } });
})();
