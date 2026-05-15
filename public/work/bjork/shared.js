// Bjørk & Brød — shared nav/footer + curtain + reveal
(function () {
  const active = location.pathname.split('/').pop() || 'index.html';
  const navHTML = `
  <nav class="main">
    <a href="index.html" class="brand" data-link>
      <span class="mark">B</span>
      Bjørk & <em>Brød</em>
    </a>
    <div class="nav-links">
      <a href="index.html" data-link class="${active==='index.html'?'active':''}">Hjem</a>
      <a href="meny.html" data-link class="${active==='meny.html'?'active':''}">Meny</a>
      <a href="#" data-link>Kafé</a>
      <a href="#" data-link>Brød på bestilling</a>
      <a href="bestilling.html" data-link class="${active==='bestilling.html'?'active':''}">Besøk oss</a>
    </div>
    <div class="nav-right">
      <span class="hours-pill"><span class="dot"></span>Åpent nå · til 17:00</span>
      <a href="bestilling.html" class="btn-book" data-link>Reservér bord</a>
    </div>
  </nav>`;

  const footHTML = `
  <footer>
    <div class="foot-inner">
      <div class="foot-brand">Bjørk<br/>& <em>Brød</em></div>
      <div class="foot-col"><h4>Besøk</h4>
        <a href="meny.html" data-link>Meny</a><a href="bestilling.html" data-link>Reservasjon</a><a href="#">Kafé</a><a href="#">Vinbar torsdag</a>
      </div>
      <div class="foot-col"><h4>Bakeri</h4>
        <a href="#">Brød på bestilling</a><a href="#">Catering</a><a href="#">Bursdagskaker</a><a href="#">Gavekort</a>
      </div>
      <div class="foot-col"><h4>Kontakt</h4>
        <a href="#">22 35 88 12</a><a href="#">hei@bjorkogbrod.no</a><a href="#">Instagram</a><a href="#">Nyhetsbrev</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Bjørk & Brød · Org. 919 442 187</span>
      <span>Bakt med kjærlighet på Grünerløkka</span>
    </div>
  </footer>`;

  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.outerHTML = navHTML;
  const footMount = document.getElementById('foot-mount');
  if (footMount) footMount.outerHTML = footHTML;

  const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const curtain = document.getElementById('curtain');
  document.querySelectorAll('a[data-link]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href=a.getAttribute('href');
      if(!href||href.startsWith('#')||href.startsWith('http'))return;
      e.preventDefault();
      if (curtain) { curtain.classList.add('in'); curtain.classList.remove('out'); }
      setTimeout(()=>{window.location.href=href;},620);
    });
  });
  window.addEventListener('pageshow',()=>{if (curtain) {curtain.classList.remove('in');curtain.classList.add('out');setTimeout(()=>curtain.classList.remove('out'),700);}});
})();
