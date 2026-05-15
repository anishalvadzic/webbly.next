// Atelier Vœrn — shared nav/footer + cursor + curtain + reveal
(function () {
  const active = location.pathname.split('/').pop() || 'index.html';
  const navHTML = `
  <nav class="main">
    <a href="index.html" class="brand" data-link>VŒRN</a>
    <div class="nav-links">
      <a href="kolleksjon.html" data-link class="${active==='kolleksjon.html'?'active':''}">Kolleksjon</a>
      <a href="#" data-link>Lookbook</a>
      <a href="atelier.html" data-link class="${active==='atelier.html'?'active':''}">Atelier</a>
      <a href="#" data-link>Journal</a>
    </div>
    <div class="nav-right">
      <button class="icon-btn" aria-label="Søk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button>
      <button class="icon-btn" aria-label="Konto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></button>
      <button class="cart-pill"><span class="bag" id="cartCount">2</span>Pose</button>
    </div>
  </nav>`;

  const footHTML = `
  <footer>
    <div class="foot-inner">
      <div class="foot-brand">VŒRN<span class="sub">Atelier · Norge · Est. 2019</span></div>
      <div class="foot-col"><h4>Butikk</h4>
        <a href="kolleksjon.html" data-link>Kolleksjon</a><a href="#">Vinter '26</a><a href="#">Atelier</a><a href="#">Gavekort</a>
      </div>
      <div class="foot-col"><h4>Hjelp</h4>
        <a href="#">Frakt</a><a href="#">Retur</a><a href="#">Størrelser</a><a href="#">Reparasjon</a>
      </div>
      <div class="foot-col"><h4>Hus</h4>
        <a href="atelier.html" data-link>Vår historie</a><a href="#">Materialer</a><a href="#">Journal</a><a href="atelier.html" data-link>Kontakt</a>
      </div>
      <div class="foot-col"><h4>Følg</h4>
        <a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">Nyhetsbrev</a><a href="#">Are.na</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Atelier Vœrn AS</span>
      <span>Sydd i Bergen · Sendt med kjærlighet</span>
    </div>
  </footer>`;

  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;
  const footMount = document.getElementById('foot-mount');
  if (footMount) footMount.outerHTML = footHTML;
  const cMount = document.getElementById('cursor-mount');
  if (cMount) cMount.outerHTML = `<div class="cursor" id="cursor"></div><div class="ambient"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>`;

  // cursor
  const cursor = document.getElementById('cursor');
  if (cursor && !matchMedia('(pointer:coarse)').matches) {
    let mx=0,my=0,cx=0,cy=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
    function tick(){cx+=(mx-cx)*.3;cy+=(my-cy)*.3;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(tick);} tick();
    document.querySelectorAll('a,button,.edit-card,.j-card,.lb-img,.story-row,.prod-card,.story-block').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor.classList.add('expand'));
      el.addEventListener('mouseleave',()=>cursor.classList.remove('expand'));
    });
  }

  // reveal
  const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // page transition
  const curtain = document.getElementById('curtain');
  document.querySelectorAll('a[data-link]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href=a.getAttribute('href');
      if(!href||href.startsWith('#')||href.startsWith('http'))return;
      e.preventDefault();
      if (curtain) { curtain.classList.add('in'); curtain.classList.remove('out'); }
      setTimeout(()=>{window.location.href=href;},680);
    });
  });
  window.addEventListener('pageshow',()=>{if (curtain) { curtain.classList.remove('in');curtain.classList.add('out');setTimeout(()=>curtain.classList.remove('out'),780);}});
})();
