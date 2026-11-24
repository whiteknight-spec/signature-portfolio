/**
 * Bento Grid Interactive Controller
 * Author: Keerthivasan R
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. LIVE REAL-TIME DIGITAL CLOCK
  const liveDayEl = document.getElementById('liveDay');
  const liveTimeEl = document.getElementById('liveTime');

  function updateClock() {
    const now = new Date();
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    if (liveDayEl) liveDayEl.textContent = days[now.getDay()];

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (liveTimeEl) liveTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. MOUSE SPOTLIGHT EFFECT ON CARDS
  const spotlightCards = document.querySelectorAll('[data-spotlight]');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. THEME TOGGLE (DARK / LIGHT BENTO)
  const themeToggleCard = document.getElementById('themeToggleCard');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or respect document theme attribute
  const initialTheme = htmlEl.getAttribute('data-theme') || 'dark';
  const savedTheme = localStorage.getItem('keerthi-bento-theme') || initialTheme;
  applyTheme(savedTheme);

  if (themeToggleCard) {
    themeToggleCard.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('keerthi-bento-theme', next);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon && themeLabel) {
      if (theme === 'dark') {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'SWITCH TO LIGHT MODE.';
      } else {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'SWITCH TO DARK MODE.';
      }
    }
  }

  // 4. ACTION TRIGGERS & MODALS
  const sayHelloCard = document.getElementById('sayHelloCard');
  const aboutTriggerCard = document.getElementById('aboutTriggerCard');
  const worksTriggerCard = document.getElementById('worksTriggerCard');
  const allProjectsBtn = document.getElementById('allProjectsBtn');
  const statusInfoBtn = document.getElementById('statusInfoBtn');

  if (sayHelloCard) {
    sayHelloCard.addEventListener('click', () => openModal('contactModal'));
  }
  if (statusInfoBtn) {
    statusInfoBtn.addEventListener('click', () => openModal('contactModal'));
  }
  if (aboutTriggerCard) {
    aboutTriggerCard.addEventListener('click', () => openModal('aboutModal'));
  }
  if (worksTriggerCard) {
    worksTriggerCard.addEventListener('click', () => openProjectModal('all'));
  }
  if (allProjectsBtn) {
    allProjectsBtn.addEventListener('click', () => openProjectModal('all'));
  }

  // 5. COPY EMAIL FUNCTIONALITY WITH TOAST
  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 2500);
    }
  }

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'keerthivasan6383007833@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: ' + email);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'COPIED! ✅';
        copyEmailBtn.style.borderColor = 'var(--radar-green)';
        copyEmailBtn.style.color = 'var(--radar-green)';
        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      });
    });
  }

  document.querySelectorAll('.copy-email-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'keerthivasan6383007833@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      });
    });
  });

  // 6. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      alert(`Thank you, ${name}! Your message has been sent directly to Keerthivasan.`);
      contactForm.reset();
      closeModal('contactModal');
    });
  }

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    }
  });
});

// GLOBAL MODAL HELPERS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// PROJECT DETAILS DATA STORE
const projectDetails = {
  terrascope: {
    title: 'TerraScope AI — Mineral & Rock Exploration Platform',
    badge: 'AI & Machine Learning (Milestone 1A.14)',
    overview: 'A production-grade scientific exploration engine combining deep convolutional neural networks (FastAI / PyTorch) with geological domain verification for AI-assisted mineral and crystal identification.',
    highlights: [
      'Stage 1 mineral classes: Quartz, Pyrite, Malachite, Muscovite.',
      'Containerized with multi-stage Docker builds and Python FastAPI microservices.',
      'Comprehensive holdout dataset validation with rigorous calibration curves.'
    ],
    tech: ['Python', 'PyTorch', 'FastAI', 'Docker', 'FastAPI'],
    github: 'https://github.com/whiteknight-spec'
  },
  flowbox: {
    title: 'Flowbox — Personal Self-Hosted Workflow Engine',
    badge: 'Full-Stack Automation Platform',
    overview: 'An n8n-style workflow orchestration canvas built for local execution. Features visual drag-and-drop workflow graphs, automated webhooks, scheduled triggers, and end-to-end encrypted credential storage.',
    highlights: [
      'Real integrations with YouTube OAuth, Slack, Email, and Google Sheets.',
      'Node.js & Express execution engine with SQLite transaction management.',
      'Fast visual reactive canvas built with React and Vite.'
    ],
    tech: ['Node.js', 'Express', 'React', 'Vite', 'SQLite', 'Docker Compose'],
    github: 'https://github.com/whiteknight-spec'
  },
  examarena: {
    title: 'ExamArena CBT — High-Security Testing Suite',
    badge: 'Cross-Platform Flutter & Dart Application',
    overview: 'Modern high-performance computer-based testing client designed for rigorous examinations, real-time timer countdowns, and glassmorphic UI responsiveness.',
    highlights: [
      'Comprehensive question navigator with instant flag & review state.',
      'Production release APK with automated QR Code distribution guides.',
      'Tested with full unit, widget, and integration test suites.'
    ],
    tech: ['Flutter', 'Dart', 'Android APK', 'iOS Ready', 'State Management'],
    github: 'https://github.com/whiteknight-spec'
  },
  autojob: {
    title: 'Auto-Job-Hunter v1.0 — Intelligent Application Pipeline',
    badge: 'Autonomous Human-in-the-Loop Agent',
    overview: 'A smart Python automation system tailored to discover, rank, and submit job applications for software engineering roles, integrated with an interactive Telegram approval bot.',
    highlights: [
      'Interactive Telegram bot with Approve/Reject inline keyboard controls.',
      'Automated resume tailoring based on candidate profile and job requirements.',
      'Capped safety rate limiting with full audit logging.'
    ],
    tech: ['Python', 'Telegram Bot API', 'BeautifulSoup', 'Automation'],
    github: 'https://github.com/whiteknight-spec'
  }
};

function openProjectModal(key) {
  const modal = document.getElementById('projectModal');
  const titleEl = document.getElementById('modalProjectTitle');
  const bodyEl = document.getElementById('modalProjectBody');

  if (!modal || !titleEl || !bodyEl) return;

  if (key === 'all') {
    titleEl.textContent = 'ALL ENGINEERING PROJECTS';
    let html = '<div style="display:flex; flex-direction:column; gap:20px;">';
    Object.keys(projectDetails).forEach(k => {
      const p = projectDetails[k];
      html += `
        <div style="background:rgba(255,255,255,0.04); border:1px solid var(--card-border); border-radius:16px; padding:18px;">
          <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-color); font-weight:700;">${p.badge}</span>
          <h4 style="font-size:1.05rem; margin:6px 0; color:var(--text-primary); font-family:var(--font-mono);">${p.title}</h4>
          <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:10px;">${p.overview}</p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${p.tech.map(t => `<span style="font-family:var(--font-mono); font-size:0.68rem; background:rgba(255,255,255,0.08); padding:2px 8px; border-radius:5px; color:var(--text-muted);">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });
    html += '</div>';
    bodyEl.innerHTML = html;
  } else if (projectDetails[key]) {
    const p = projectDetails[key];
    titleEl.textContent = p.title;
    bodyEl.innerHTML = `
      <div style="display:inline-block; font-family:var(--font-mono); font-size:0.74rem; color:var(--accent-color); font-weight:700; margin-bottom:12px; border:1px solid var(--card-border); padding:3px 10px; border-radius:6px;">${p.badge}</div>
      <p style="font-size:0.9rem; line-height:1.6; color:var(--text-secondary); margin-bottom:16px;">${p.overview}</p>
      <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-primary); margin-bottom:8px; text-transform:uppercase;">Key Architectural Highlights</h4>
      <ul style="padding-left:20px; font-size:0.85rem; color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">
        ${p.highlights.map(h => `<li style="margin-bottom:6px;">${h}</li>`).join('')}
      </ul>
      <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-primary); margin-bottom:8px; text-transform:uppercase;">Technologies Used</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
        ${p.tech.map(t => `<span style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(255,255,255,0.08); padding:4px 10px; border-radius:6px; color:var(--text-primary);">${t}</span>`).join('')}
      </div>
      <div style="margin-top:20px; border-top:1px solid var(--card-border); padding-top:16px;">
        <a href="${p.github}" target="_blank" rel="noopener" class="btn-submit" style="display:inline-block; text-decoration:none; text-align:center; padding:10px 20px;">VIEW GITHUB REPOSITORY ↗</a>
      </div>
    `;
  }

  modal.classList.add('active');
}
