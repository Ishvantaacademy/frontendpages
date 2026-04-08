const JOBS_API = 'https://script.google.com/macros/s/AKfycbzu9XeX1qzHQTHp6et6J2UAs13M6RJ4rcDLy6DwdyI4BAoI3Kae1pg-OSORpyNHrlcoFQ/exec';
const APPLY_PLACEHOLDER = 'https://docs.google.com/forms/d/e/1FAIpQLSeyJrP6sy0qEIWQf4dVci99KxjsxgOl8a3u_qPs_5uMGtoC1Q/viewform';

const SKILL_ICONS = {
  'Business Analyst': '📋',
  'Data Engineer': '❄️',
  'DevOps': '🚀',
  'QA': '🧪',
  'React': '⚛️',
  'React Native': '📱',
  'Python': '🐍',
  'Java': '☕',
  'Frontend': '🌐',
  'Backend': '⚙️',
  'Full Stack': '🔧',
  'Analytics': '📊',
  'SQL': '🗄️',
  'Cloud': '☁️',
  'Mobile': '📱',
};

function getSkillIcon(skill) {
  for (const [key, icon] of Object.entries(SKILL_ICONS)) {
    if (skill && skill.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '💼';
}

function groupBySkill(jobs) {
  const map = {};
  jobs.forEach(job => {
    const skill = job['Core Skill'] || 'Other';
    if (!map[skill]) map[skill] = [];
    map[skill].push(job);
  });
  return map;
}

function buildPositionsBadge(value) {
  const n = parseInt(value, 10);
  const label = n === 1 ? '1 position' : `${n} positions`;
  return `<span class="badge badge-teal">${label}</span>`;
}

function buildOfficeModeBadge(mode) {
  if (!mode) return '';
  if (mode.toLowerCase().includes('remote')) return `<span class="badge badge-purple">Remote</span>`;
  if (mode.toLowerCase().includes('hybrid')) return `<span class="badge badge-gold">Hybrid</span>`;
  return `<span class="badge badge-orange">In Office</span>`;
}

function buildJobCard(job) {
  const id = job['Job ID'];
  const title = job['Job Title'] || 'Untitled Role';
  const positions = job['Number of Positions'];
  const mode = job['Nature of Office Presence'];

  const div = document.createElement('div');
  div.className = 'job-card';
  div.setAttribute('data-job-id', id);
  div.innerHTML = `
    <div class="job-card-id">JOB #${id}</div>
    <div class="job-card-title">${title}</div>
    <div class="job-card-meta">
      ${positions ? buildPositionsBadge(positions) : ''}
      ${buildOfficeModeBadge(mode)}
    </div>
    <div class="job-card-hint">Tap to view details →</div>
  `;
  div.addEventListener('click', () => openDrawer(job));
  return div;
}

function buildSkillSection(skill, jobs) {
  const section = document.createElement('div');
  section.className = 'skill-section';

  const icon = getSkillIcon(skill);
  section.innerHTML = `
    <div class="skill-header">
      <div class="skill-header-left">
        <span style="font-size:1.3rem">${icon}</span>
        <h3>${skill}</h3>
        <span class="skill-count">${jobs.length} role${jobs.length > 1 ? 's' : ''}</span>
      </div>
      <div class="skill-chevron">▼</div>
    </div>
    <div class="skill-jobs">
      <div class="job-cards"></div>
    </div>
  `;

  const jobCards = section.querySelector('.job-cards');
  jobs.forEach(job => jobCards.appendChild(buildJobCard(job)));

  const header = section.querySelector('.skill-header');
  header.addEventListener('click', () => {
    section.classList.toggle('open');
  });

  return section;
}

function openDrawer(job) {
  const overlay = document.getElementById('job-drawer-overlay');
  const drawer = document.getElementById('job-drawer');
  const content = document.getElementById('drawer-content');

  const id = job['Job ID'];
  const title = job['Job Title'] || 'Untitled Role';
  const client = job['Client'] || '—';
  const skill = job['Core Skill'] || '—';
  const desc = job['Job Description'] || 'No description provided.';
  const positions = job['Number of Positions'];
  const mode = job['Nature of Office Presence'] || '—';
  const location = job['Office Location'] || '—';

  content.innerHTML = `
    <div class="drawer-job-id">Job #${id}</div>
    <div class="drawer-job-title">${title}</div>
    <div class="drawer-meta-grid">
      <div class="drawer-meta-item">
        <label>Client</label>
        <span>${client}</span>
      </div>
      <div class="drawer-meta-item">
        <label>Core Skill</label>
        <span>${skill}</span>
      </div>
      <div class="drawer-meta-item">
        <label>Openings</label>
        <span>${positions || '—'}</span>
      </div>
      <div class="drawer-meta-item">
        <label>Work Mode</label>
        <span>${mode}</span>
      </div>
      <div class="drawer-meta-item">
        <label>Location</label>
        <span>${location}</span>
      </div>
    </div>
    <div class="drawer-desc-label">About the Role</div>
    <div class="drawer-desc">${desc}</div>
  `;

  const applySection = document.createElement('div');
  applySection.className = 'drawer-apply';
  applySection.innerHTML = `<a href="${APPLY_PLACEHOLDER}" target="_blank" rel="noopener noreferrer" class="drawer-apply-btn">Apply for this Role →</a>`;
  drawer.appendChild(applySection);

  overlay.classList.add('active');
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const overlay = document.getElementById('job-drawer-overlay');
  const drawer = document.getElementById('job-drawer');
  const applySection = drawer.querySelector('.drawer-apply');

  overlay.classList.remove('active');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
  if (applySection) applySection.remove();
}

async function loadPositions() {
  const loading = document.getElementById('positions-loading');
  const error = document.getElementById('positions-error');
  const container = document.getElementById('positions-container');

  try {
    const res = await fetch(JOBS_API);
    if (!res.ok) throw new Error('Network response not ok');
    const raw = await res.json();

    const jobs = raw.filter(j => j['Job ID'] && j['Job Title']);

    loading.style.display = 'none';

    if (jobs.length === 0) {
      container.style.display = 'block';
      container.innerHTML = `
        <div class="empty-state">
          <h3>No open positions right now</h3>
          <p>Check back soon or reach out directly — new roles are posted regularly.</p>
        </div>`;
      return;
    }

    const grouped = groupBySkill(jobs);
    container.style.display = 'block';

    const summary = document.createElement('div');
    summary.style.cssText = 'margin-bottom:2rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap';
    summary.innerHTML = `
      <span style="color:rgba(255,255,255,0.5);font-size:0.88rem">${jobs.length} open role${jobs.length > 1 ? 's' : ''} across ${Object.keys(grouped).length} skill area${Object.keys(grouped).length > 1 ? 's' : ''}</span>
    `;
    container.appendChild(summary);

    Object.entries(grouped).forEach(([skill, skillJobs]) => {
      container.appendChild(buildSkillSection(skill, skillJobs));
    });

  } catch (err) {
    loading.style.display = 'none';
    error.style.display = 'block';
    console.error('Failed to load positions:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPositions();

  document.getElementById('job-drawer-overlay').addEventListener('click', closeDrawer);
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });
});
