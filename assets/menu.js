/* =========================================================
   PRODUTORA — header + menu + rodapé injetados em toda página
   ========================================================= */
(function () {
  // itens de navegação (label -> arquivo)
  const NAV = [
    { label: 'Home',     href: 'index.html' },
    { label: 'About',    href: 'about.html' },
    { label: 'Team',     href: 'team.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Cases',    href: 'cases.html' },
    { label: 'Blog',     href: 'blog.html' },
    { label: 'Contact',  href: 'contact.html' },
  ];
  const CONTACT = {
    email: 'info@produtora.com',
    phone: '+55 99 99999-9999',
    menuImage: 'https://picsum.photos/seed/prod-menu/1200/1600',
  };

  // arquivo atual (default index.html) — normaliza p/ funcionar com cleanUrls (/about) e /about.html
  const norm = (s) => (s || '').toLowerCase().replace(/\.html$/, '').replace(/^$/, 'index');
  const current = norm(location.pathname.split('/').pop() || 'index');
  const overHero = !!document.querySelector('.hero'); // header branco só na home

  /* ---------- HEADER ---------- */
  const header = document.createElement('header');
  header.className = 'top' + (overHero ? ' top--over' : '');
  header.innerHTML = `
    <button class="menu-btn" id="openMenu">
      <span class="bars"><span></span><span></span></span> Menu
    </button>
    <a class="brand" href="index.html">Maré</a>`;

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
    <button class="close-btn" id="closeMenu"><span class="x"></span>Close</button>
    <div class="menu__nav">
      <ul class="nav-list">${navItems}</ul>
      <div class="menu__foot">
        <div>
          <div class="label">Contact</div>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a><br>
          <a href="tel:${CONTACT.phone.replace(/\s|-/g, '')}">${CONTACT.phone}</a>
        </div>
        <div class="socials">
          <a href="#">Instagram</a><a href="#">Vimeo</a><a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="menu__image">
      <img src="${CONTACT.menuImage}" alt="">
      <span class="media-cap">Selected work</span>
    </div>`;

  /* ---------- RODAPÉ ---------- */
  const foot = document.createElement('footer');
  foot.className = 'site-foot';
  foot.innerHTML = `
    <div class="site-foot__cta"><a href="contact.html">Vamos criar algo<br><em style="font-style:italic">memorável</em>.</a></div>
    <div class="site-foot__row">
      <span>© ${new Date().getFullYear()} Maré — São Paulo</span>
      <nav>${NAV.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}</nav>
      <span>Instagram · Vimeo · LinkedIn</span>
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
