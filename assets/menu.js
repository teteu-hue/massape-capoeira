/* =========================================================
   MASSAPÊ CAPOEIRA — cabeçalho + menu + rodapé injetados em toda página
   ========================================================= */
(function () {
  // itens de navegação (label -> arquivo)
  const NAV = [
    { label: 'Início',   href: 'index.html' },
    { label: 'A Capoeira', href: 'about.html' },
    { label: 'Mestres',  href: 'team.html' },
    { label: 'Aulas',    href: 'services.html' },
    { label: 'Eventos',  href: 'cases.html' },
    { label: 'Blog',     href: 'blog.html' },
    { label: 'Contato',  href: 'contact.html' },
  ];
  const CONTACT = {
    email: 'contato@massapecapoeira.com.br',
    phone: '+55 85 99999-9999',
    menuImage: 'https://images.unsplash.com/photo-1641688587310-8be6c75ac116?w=1200&h=1600&fit=crop&q=80&auto=format',
  };

  // arquivo atual (default index.html) — normaliza p/ funcionar com cleanUrls (/about) e /about.html
  const norm = (s) => (s || '').toLowerCase().replace(/\.html$/, '').replace(/^$/, 'index');
  const current = norm(location.pathname.split('/').pop() || 'index');
  const overHero = !!document.querySelector('.hero'); // header branco só na home

  /* ---------- HEADER ---------- */
  const header = document.createElement('header');
  header.className = 'top' + (overHero ? ' top--over' : '');
  header.innerHTML = `
    <button class="menu-btn" id="openMenu" aria-label="Abrir menu">
      <span class="bars"><span></span><span></span></span> Menu
    </button>
    <a class="brand" href="index.html">Massapê Capoeira</a>`;

  /* ---------- BACKDROP + PAINEL ---------- */
  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  backdrop.id = 'backdrop';

  const navItems = NAV.map((item, i) => {
    const active = norm(item.href) === current ? ' is-active' : '';
    return `<li class="nav-item">
      <a class="nav-link${active}" href="${item.href}" style="--i:${i}">
        <span class="arrow">&rarr;</span>
        <span class="roll"><span>${item.label}</span><span>${item.label}</span></span>
      </a></li>`;
  }).join('');

  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.id = 'menu';
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML = `
    <button class="close-btn" id="closeMenu" aria-label="Fechar menu"><span class="x"></span>Fechar</button>
    <div class="menu__nav">
      <ul class="nav-list">${navItems}</ul>
      <div class="menu__foot">
        <div>
          <div class="label">Contato</div>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a><br>
          <a href="tel:${CONTACT.phone.replace(/\s|-/g, '')}">${CONTACT.phone}</a>
        </div>
        <div class="socials">
          <a href="#">Instagram</a><a href="#">YouTube</a><a href="#">Facebook</a>
        </div>
      </div>
    </div>
    <div class="menu__image">
      <img src="${CONTACT.menuImage}" alt="Capoeirista em movimento durante a roda">
      <span class="media-cap">Axé &amp; ginga</span>
    </div>`;

  /* ---------- RODAPÉ ---------- */
  const foot = document.createElement('footer');
  foot.className = 'site-foot';
  foot.innerHTML = `
    <div class="site-foot__cta"><a href="contact.html">Venha jogar<br><em style="font-style:italic">na nossa roda</em>.</a></div>
    <div class="site-foot__row">
      <span>© ${new Date().getFullYear()} Massapê Capoeira — Brasil</span>
      <nav>${NAV.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}</nav>
      <span>Instagram · YouTube · Facebook</span>
    </div>`;

  /* ---------- MONTA ---------- */
  document.body.prepend(menu);
  document.body.prepend(backdrop);
  document.body.prepend(header);
  if (!document.querySelector('.site-foot')) document.body.appendChild(foot);

  /* ---------- COMPORTAMENTO ---------- */
  const body = document.body;
  const openBtn = document.getElementById('openMenu');
  const closeBtn = document.getElementById('closeMenu');

  function open() {
    menu.classList.add('open'); backdrop.classList.add('open');
    menu.setAttribute('aria-hidden', 'false'); body.classList.add('menu-open');
  }
  function close() {
    menu.classList.remove('open'); backdrop.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true'); body.classList.remove('menu-open');
  }
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- ESCONDE O HEADER AO ROLAR P/ BAIXO, MOSTRA AO ROLAR P/ CIMA ---------- */
  const heroEl = document.querySelector('.hero');
  let lastY = window.scrollY;
  let ticking = false;
  const REVEAL_AT_TOP = 80; // sempre visível perto do topo
  function onScroll() {
    const y = window.scrollY;
    // cor: branco sobre o hero, preto depois de passar dele
    if (overHero && heroEl) {
      const overStillHero = y < (heroEl.offsetHeight - 80);
      header.classList.toggle('top--over', overStillHero);
    }
    if (!menu.classList.contains('open')) {
      if (y > lastY && y > REVEAL_AT_TOP) {
        header.classList.add('top--hidden');      // rolando para baixo
      } else if (y < lastY) {
        header.classList.remove('top--hidden');   // rolando para cima
      }
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- PARALLAX DO HERO (se existir) ---------- */
  const heroBg = document.querySelector('.hero__bg');
  const hero = document.querySelector('.hero');
  if (hero && heroBg) {
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX / r.width - .5);
      const py = (e.clientY / r.height - .5);
      heroBg.style.transform = `scale(1.06) translate(${px * -26}px, ${py * -26}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroBg.style.transform = 'scale(1.06) translate(0,0)';
    });
  }
})();
