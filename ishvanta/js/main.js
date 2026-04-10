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

function buildNav(links) {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const items = links.map(l => {
    const name = l.href.split('/').pop();
    const active = name === current ? ' active' : '';
    const isCta = l.label === 'Contact';
    return `<li><a href="${l.href}" class="${isCta ? 'nav-cta' : ''}${active}">${l.label}</a></li>`;
  }).join('');
  return `
  <nav class="nav" id="main-nav">
    <a href="${links[0].href}" class="nav-logo"><img src="${isRoot ? 'images/Logo.png' : '../images/Logo.png'}" alt="Ishvanta Solutions" style="height: 32px;"></a>
    <ul class="nav-links" id="nav-links">${items}</ul>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;
}

function buildFooter(links) {
  const quickLinks = links.slice(0, 5).map(l =>
    `<li><a href="${l.href}">${l.label}</a></li>`
  ).join('');
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo"><img src="${isRoot ? 'images/Logo.png' : '../images/Logo.png'}" alt="Ishvanta Solutions" style="height: 48px; margin-bottom: 0.5rem;"></div>
        <p>Upskilling India's tech workforce since 2006. Real trainers, real projects, real career growth.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/ishvanta-solutions-041399402/" target="_blank" class="social-icon" aria-label="LinkedIn">in</a>
          <a href="https://x.com/ishvantaacademy" target="_blank" class="social-icon" aria-label="Twitter">𝕏</a>
          <a href="https://www.youtube.com/@IshvantaSolutions" target="_blank" class="social-icon" aria-label="YouTube">▶</a>
          <a href="https://www.instagram.com/ishvantaacademy/" target="_blank" class="social-icon" aria-label="Instagram">◎</a>
          <a href="https://www.facebook.com/profile.php?id=61572075207513" target="_blank" class="social-icon" aria-label="Facebook">ⓕ</a>
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
      <p>Madhapur, Hyderabad · ishvantaacademy@gmail.com</p>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const isRoot = !window.location.pathname.includes('/pages/');
  const links = isRoot ? ROOT_NAV_LINKS : NAV_LINKS;

  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder) navPlaceholder.outerHTML = buildNav(links);
  if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter(links);

  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
    });

    // Close menu when a nav link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
});
