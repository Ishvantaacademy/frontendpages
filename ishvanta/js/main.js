const NAV_LINKS = [
  { label: 'Home',           href: '../index.html' },
  { label: 'About',          href: '../pages/about.html' },
  { label: 'Courses',        href: '../pages/courses.html' },
  { label: 'Trainers',       href: '../pages/trainers.html' },
  { label: 'Open Positions', href: '../pages/positions.html' },
  { label: 'Contact',        href: '../pages/contact.html' },
];

const ROOT_NAV_LINKS = NAV_LINKS.map(l => ({
  ...l,
  href: l.href.replace('../', '')
}));

/* ── SOCIAL MEDIA SVG ICONS ── */
const ICONS = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/></svg>`,

  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/></svg>`,

  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/></svg>`,

  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><defs><radialGradient id="igGrad" cx="30%" cy="107%" r="130%"><stop offset="0%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#igGrad)"/></svg>`,

  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>`
};

function buildNav(links, isRoot) {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const items = links.map(l => {
    const name = l.href.split('/').pop();
    const active = name === current ? ' active' : '';
    const isCta = l.label === 'Contact';
    return `<li><a href="${l.href}" class="${isCta ? 'nav-cta' : ''}${active}">${l.label}</a></li>`;
  }).join('');
  const logoSrc = isRoot ? 'images/Logo.png' : '../images/Logo.png';
  return `
  <nav class="nav" id="main-nav">
    <a href="${links[0].href}" class="nav-logo"><img src="${logoSrc}" alt="Ishvanta Solutions"></a>
    <ul class="nav-links" id="nav-links">${items}</ul>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;
}

function buildFooter(links, isRoot) {
  const quickLinks = links.slice(0, 5).map(l =>
    `<li><a href="${l.href}">${l.label}</a></li>`
  ).join('');
  const logoSrc = isRoot ? 'images/Logo.png' : '../images/Logo.png';
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo"><img src="${logoSrc}" alt="Ishvanta Solutions" style="height:52px;margin-bottom:0.75rem;"></div>
        <p>Upskilling India's tech workforce since 2006. Real trainers, real projects, real career growth.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/ishvanta-solutions-041399402/" target="_blank" class="social-icon" aria-label="LinkedIn">${ICONS.linkedin}</a>
          <a href="https://x.com/ishvantaacademy" target="_blank" class="social-icon" aria-label="Twitter">${ICONS.twitter}</a>
          <a href="https://www.youtube.com/@IshvantaSolutions" target="_blank" class="social-icon" aria-label="YouTube">${ICONS.youtube}</a>
          <a href="https://www.instagram.com/ishvantaacademy/" target="_blank" class="social-icon" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="https://www.facebook.com/profile.php?id=61572075207513" target="_blank" class="social-icon" aria-label="Facebook">${ICONS.facebook}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>${quickLinks}</ul>
      </div>
      <div class="footer-col">
        <h4>Domains</h4>
        <ul>
          <li><a href="${links[2].href}">Analytics</a></li>
          <li><a href="${links[2].href}">Data Engineering</a></li>
          <li><a href="${links[2].href}">Web &amp; Mobile</a></li>
          <li><a href="${links[2].href}">DevOps &amp; QA</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:ishvantaacademy@gmail.com">ishvantaacademy@gmail.com</a></li>
          <li><a href="tel:+919032800664">+91 90328 00664</a></li>
          <li><a href="#">Madhapur, Hyderabad</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Ishvanta Solutions. All rights reserved.</p>
      <div class="footer-legal-links">
        <a href="${isRoot ? 'pages/privacy-policy.html' : 'privacy-policy.html'}">Privacy Policy</a>
        <span>·</span>
        <a href="${isRoot ? 'pages/data-deletion.html' : 'data-deletion.html'}">Data Deletion</a>
      </div>
      <p>Madhapur, Hyderabad · ishvantaacademy@gmail.com</p>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const isRoot = !window.location.pathname.includes('/pages/');
  const links = isRoot ? ROOT_NAV_LINKS : NAV_LINKS;

  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder) navPlaceholder.outerHTML = buildNav(links, isRoot);
  if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter(links, isRoot);

  /* ── SMART STICKY NAVBAR (hide on scroll down, show on scroll up) ── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      // Add glass bg once scrolled past hero
      if (currentY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.remove('hidden');
      }
      // Hide on scroll down, reveal on scroll up
      if (currentY > lastScrollY && currentY > 200) {
        nav.classList.add('hidden');
      } else if (currentY < lastScrollY) {
        nav.classList.remove('hidden');
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

  /* ── MOBILE MENU TOGGLE ── */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
});
