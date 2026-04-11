const JOBS_API = 'https://script.google.com/macros/s/AKfycbzu9XeX1qzHQTHp6et6J2UAs13M6RJ4rcDLy6DwdyI4BAoI3Kae1pg-OSORpyNHrlcoFQ/exec';
const APPLY_PLACEHOLDER = 'https://docs.google.com/forms/d/e/1FAIpQLSeyJrP6sy0qEIWQf4dVci99KxjsxgOl8a3u_qPs_5uMGtoC1Q/viewform';

function getJobIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function showError() {
  document.getElementById('job-loading-section').style.display = 'none';
  document.getElementById('job-error-section').style.display = 'block';
}

function buildOfficeModeBadge(mode) {
  if (!mode) return '';
  if (mode.toLowerCase().includes('remote')) return `<span class="badge badge-purple">Remote</span>`;
  if (mode.toLowerCase().includes('hybrid')) return `<span class="badge badge-gold">Hybrid</span>`;
  return `<span class="badge badge-orange">In Office</span>`;
}

function renderJobDetail(job) {
  const id = job['Job ID'];
  const title = job['Job Title'] || 'Untitled Role';
  const client = job['Client'] || '—';
  const skill = job['Core Skill'] || '—';
  const desc = job['Job Description'] || 'No description provided.';
  const positions = job['Number of Positions'];
  const mode = job['Nature of Office Presence'] || '—';
  const location = job['Office Location'] || '—';

  // Update page title and meta
  document.title = `${title} — Job #${id} | Ishvanta Solutions`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `Apply for ${title} at Ishvanta Solutions. ${skill} role${location !== '—' ? ' in ' + location : ''}.`;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = `${title} — Job #${id} | Ishvanta Solutions`;

  // Render hero section
  document.getElementById('job-detail-id').textContent = `JOB #${id}`;
  document.getElementById('job-detail-title').textContent = title;

  const badgesEl = document.getElementById('job-detail-badges');
  let badgesHTML = '';
  if (positions) {
    const n = parseInt(positions, 10);
    badgesHTML += `<span class="badge badge-teal">${n === 1 ? '1 position' : n + ' positions'}</span>`;
  }
  badgesHTML += buildOfficeModeBadge(mode);
  if (skill !== '—') badgesHTML += `<span class="badge badge-orange">${skill}</span>`;
  badgesEl.innerHTML = badgesHTML;

  // Render meta grid
  const metaGrid = document.getElementById('job-meta-grid');
  const metaItems = [
    { label: 'Client', value: client, icon: '🏢' },
    { label: 'Core Skill', value: skill, icon: '⚡' },
    { label: 'Openings', value: positions || '—', icon: '👥' },
    { label: 'Work Mode', value: mode, icon: '🏠' },
    { label: 'Location', value: location, icon: '📍' },
  ];
  metaGrid.innerHTML = metaItems.map(item => `
    <div class="job-meta-item">
      <div class="job-meta-icon">${item.icon}</div>
      <div class="job-meta-info">
        <span class="job-meta-label">${item.label}</span>
        <span class="job-meta-value">${item.value}</span>
      </div>
    </div>
  `).join('');

  // Render description
  const descEl = document.getElementById('job-desc-content');
  descEl.innerHTML = desc;

  // Apply button
  document.getElementById('job-apply-btn').href = APPLY_PLACEHOLDER;

  // Share buttons
  const jobUrl = window.location.href;
  const shareText = `Check out this job: ${title} — Job #${id} at Ishvanta Solutions`;

  document.getElementById('share-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + jobUrl)}`;
  document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;

  document.getElementById('share-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(jobUrl).then(() => {
      const toast = document.getElementById('copy-toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });

  // Show detail section
  document.getElementById('job-loading-section').style.display = 'none';
  document.getElementById('job-detail-section').style.display = 'block';
}

async function loadJobDetail() {
  const jobId = getJobIdFromURL();
  if (!jobId) {
    showError();
    return;
  }

  try {
    const res = await fetch(JOBS_API);
    if (!res.ok) throw new Error('Network response not ok');
    const raw = await res.json();

    const job = raw.find(j => String(j['Job ID']) === String(jobId));
    if (!job) {
      showError();
      return;
    }

    renderJobDetail(job);
  } catch (err) {
    console.error('Failed to load job:', err);
    showError();
  }
}

document.addEventListener('DOMContentLoaded', loadJobDetail);
