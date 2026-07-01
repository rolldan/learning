(function () {
  const STORAGE_KEY = 'ai-toolkit-teacher-progress';

  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      selectedSubjects: [],
      planProgress: {},
      moduleProgress: {},
      activeSubject: null,
      expandedModule: null,
      activeSection: null,
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateHeaderProgress();
  }

  function $(sel) {
    return document.querySelector(sel);
  }

  function $$(sel) {
    return document.querySelectorAll(sel);
  }

  function tierClass(tier) {
    const map = {
      Gratis: 'tier-free',
      Betalt: 'tier-paid',
      Inkludert: 'tier-included',
      Avansert: 'tier-advanced',
      Lisens: 'tier-license',
    };
    return map[tier] || 'tier-included';
  }

  function getTotalItems() {
    let total = 0;
    LEARNING_MODULES.forEach((m) => (total += m.items.length));
    SUBJECTS.forEach((s) => (total += s.plan.length));
    return total;
  }

  function getCompletedItems() {
    let done = 0;
    Object.values(state.moduleProgress).forEach((items) => {
      done += Object.values(items).filter(Boolean).length;
    });
    Object.values(state.planProgress).forEach((items) => {
      done += Object.values(items).filter(Boolean).length;
    });
    return done;
  }

  function updateHeaderProgress() {
    const total = getTotalItems();
    const done = getCompletedItems();
    const pct = total ? Math.round((done / total) * 100) : 0;
    $('#stat-progress').textContent = pct + '%';
    $('#stat-subjects').textContent = SUBJECTS.length;
    $('#stat-modules').textContent = LEARNING_MODULES.length;
    $('#stat-sections').textContent = SECTIONS.length;
  }

  function initNav() {
    $$('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = btn.dataset.panel;
        $$('.nav-item').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        $$('.panel').forEach((p) => p.classList.remove('active'));
        $('#panel-' + panel).classList.add('active');
      });
    });
  }

  function renderSectionGrid() {
    const grid = $('#section-grid');
    grid.innerHTML = SECTIONS.map(
      (s) => `
      <div class="section-card" data-section="${s.id}">
        <div class="section-card-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.subtitle}</p>
      </div>
    `
    ).join('');

    grid.querySelectorAll('.section-card').forEach((card) => {
      card.addEventListener('click', () => showSectionDetail(card.dataset.section));
    });

    if (state.activeSection) showSectionDetail(state.activeSection);
  }

  function showSectionDetail(id) {
    state.activeSection = id;
    saveState();
    const s = SECTIONS.find((x) => x.id === id);
    if (!s) return;

    let extra = '';

    if (s.steps) {
      extra += `<div class="card"><h3>Fem steg for implementering</h3><ol class="list-bullet">${s.steps.map((st, i) => `<li><strong>${i + 1}. ${st.title}</strong> – ${st.desc}</li>`).join('')}</ol></div>`;
    }
    if (s.cases) {
      extra += `<div class="card"><h3>Casestudier</h3><ul class="list-bullet">${s.cases.map((c) => `<li><strong>${c.name}</strong> – ${c.focus}</li>`).join('')}</ul></div>`;
    }
    if (s.checklist) {
      extra += `<div class="card"><h3>Sjekkliste</h3><ul class="list-bullet">${s.checklist.map((c) => `<li>${c}</li>`).join('')}</ul></div>`;
    }
    if (s.tools) {
      extra += `<div class="card"><h3>Verktøy</h3><table class="tool-table"><thead><tr><th>Verktøy</th><th>Type</th><th>Bruk</th></tr></thead><tbody>${s.tools.map((t) => `<tr><td>${t.name}</td><td><span class="tier-badge ${tierClass(t.tier)}">${t.tier}</span></td><td>${t.use}</td></tr>`).join('')}</tbody></table></div>`;
    }
    if (s.resources) {
      extra += `<div class="card"><h3>Ressurser</h3><ul class="list-bullet">${s.resources.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a></li>`).join('')}</ul></div>`;
    }

    $('#section-detail').innerHTML = `
      <div class="card">
        <h2>${s.icon} ${s.title}</h2>
        <p class="card-subtitle">${s.subtitle}</p>
        <p>${s.description}</p>
        <h3 style="margin-top:1.25rem">Hovedtemaer</h3>
        <ul class="list-bullet">${s.topics.map((t) => `<li>${t}</li>`).join('')}</ul>
        <p style="margin-top:1rem">
          <a href="${s.link}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Les mer hos Microsoft →</a>
        </p>
      </div>
      ${extra}
    `;

    $$('.nav-item').forEach((b) => b.classList.remove('active'));
    $$('.nav-item[data-panel="sections"]')[0].classList.add('active');
    $$('.panel').forEach((p) => p.classList.remove('active'));
    $('#panel-sections').classList.add('active');
    $('#section-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderSubjectFilter(containerId, onSelect) {
    const el = $(containerId);
    el.innerHTML = SUBJECTS.map((s) => {
      const active = state.selectedSubjects.includes(s.id) || state.activeSubject === s.id;
      return `<button class="chip ${active ? 'active' : ''}" data-subject="${s.id}" style="${active ? `background:${s.color};border-color:${s.color}` : ''}">${s.icon} ${s.name}</button>`;
    }).join('');

    el.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => onSelect(chip.dataset.subject));
    });
  }

  function toggleSubject(id) {
    const idx = state.selectedSubjects.indexOf(id);
    if (idx === -1) state.selectedSubjects.push(id);
    else state.selectedSubjects.splice(idx, 1);
    state.activeSubject = id;
    saveState();
    renderSubjects();
    renderDashboard();
  }

  function getSubjectProgress(subjectId) {
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    if (!subject) return 0;
    const progress = state.planProgress[subjectId] || {};
    const done = subject.plan.filter((_, i) => progress[i]).length;
    return Math.round((done / subject.plan.length) * 100);
  }

  function renderSubjectDetail(id) {
    const s = SUBJECTS.find((x) => x.id === id);
    if (!s) return;

    const progress = state.planProgress[id] || {};
    const pct = getSubjectProgress(id);

    $('#subject-detail').innerHTML = `
      <div class="card">
        <div class="subject-header">
          <div class="subject-icon-lg" style="background:${s.color}18">${s.icon}</div>
          <div class="subject-meta">
            <h2>${s.name}</h2>
            <div class="subject-level">${s.level}</div>
            <div class="progress-bar-wrap">
              <div class="progress-label"><span>Planfremdrift</span><span>${pct}%</span></div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>
          </div>
        </div>

        <div class="two-col">
          <div>
            <h3>AI-bruksområder i faget</h3>
            <ul class="list-bullet">${s.aiUses.map((u) => `<li>${u}</li>`).join('')}</ul>
          </div>
          <div>
            <h3>Kompetansemål for deg som lærer</h3>
            <ul class="list-bullet">${s.competencies.map((c) => `<li>${c}</li>`).join('')}</ul>
          </div>
        </div>

        <h3 style="margin-top:1.5rem">10-ukers implementeringsplan</h3>
        <p class="card-subtitle">Kryss av når du fullfører hvert steg. Planen følger toolkitens 5-stegs modell tilpasset ${s.name}.</p>
        <div class="timeline">
          ${s.plan
            .map(
              (p, i) => `
            <div class="timeline-item ${progress[i] ? 'done' : ''}">
              <label class="timeline-check">
                <input type="checkbox" data-subject="${id}" data-step="${i}" ${progress[i] ? 'checked' : ''}>
                <div>
                  <div class="timeline-phase">${p.phase}</div>
                  <div class="timeline-task">${p.task}</div>
                </div>
              </label>
            </div>
          `
            )
            .join('')}
        </div>

        <h3 style="margin-top:1.5rem">Copilot-prompt for ${s.name}</h3>
        <div class="prompt-box" id="prompt-text">${s.prompt}</div>
        <button class="btn btn-primary btn-sm" id="copy-prompt">📋 Kopier prompt</button>
        <a href="https://m365copilot.com" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-left:0.5rem">Åpne Copilot Chat →</a>
      </div>
    `;

    $('#subject-detail').querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        const subj = e.target.dataset.subject;
        const step = e.target.dataset.step;
        if (!state.planProgress[subj]) state.planProgress[subj] = {};
        state.planProgress[subj][step] = e.target.checked;
        saveState();
        renderSubjectDetail(subj);
        renderDashboard();
      });
    });

    $('#copy-prompt').addEventListener('click', () => {
      navigator.clipboard.writeText(s.prompt).then(() => {
        $('#copy-prompt').textContent = '✓ Kopiert!';
        setTimeout(() => ($('#copy-prompt').textContent = '📋 Kopier prompt'), 2000);
      });
    });
  }

  function selectSubject(id) {
    state.activeSubject = id;
    if (!state.selectedSubjects.includes(id)) state.selectedSubjects.push(id);
    saveState();
    renderSubjectFilter('#subject-filter', selectSubject);
    renderSubjectDetail(id);
    renderDashboard();
  }

  function renderSubjects() {
    renderSubjectFilter('#subject-filter', selectSubject);
    if (state.activeSubject) renderSubjectDetail(state.activeSubject);
  }

  function renderModules() {
    const list = $('#module-list');
    list.innerHTML = LEARNING_MODULES.map((mod) => {
      const prog = state.moduleProgress[mod.id] || {};
      const done = mod.items.filter((_, i) => prog[i]).length;
      const pct = Math.round((done / mod.items.length) * 100);
      const section = SECTIONS.find((s) => s.id === mod.section);
      const expanded = state.expandedModule === mod.id;

      const circumference = 2 * Math.PI * 16;
      const offset = circumference - (pct / 100) * circumference;

      return `
        <div class="module-card ${expanded ? 'expanded' : ''}" data-module="${mod.id}">
          <div class="module-header">
            <div class="module-progress-ring">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#eef2f9" stroke-width="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#0078d4" stroke-width="4"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
                <text x="20" y="20" text-anchor="middle" dominant-baseline="central">${pct}%</text>
              </svg>
            </div>
            <div class="module-info">
              <h3>${mod.title}</h3>
              <div class="module-meta">
                <span class="module-tag">${mod.type}</span>
                <span>⏱ ${mod.duration}</span>
                <span>${section ? section.icon + ' ' + section.title : ''}</span>
              </div>
            </div>
            <span>${expanded ? '▲' : '▼'}</span>
          </div>
          <div class="module-body">
            ${mod.items
              .map(
                (item, i) => `
              <label class="module-item ${prog[i] ? 'done' : ''}">
                <input type="checkbox" data-module="${mod.id}" data-item="${i}" ${prog[i] ? 'checked' : ''}>
                <span>${item}</span>
              </label>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.module-header').forEach((header) => {
      header.addEventListener('click', () => {
        const id = header.parentElement.dataset.module;
        state.expandedModule = state.expandedModule === id ? null : id;
        saveState();
        renderModules();
      });
    });

    list.querySelectorAll('.module-body input').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        e.stopPropagation();
        const modId = e.target.dataset.module;
        const item = e.target.dataset.item;
        if (!state.moduleProgress[modId]) state.moduleProgress[modId] = {};
        state.moduleProgress[modId][item] = e.target.checked;
        saveState();
        renderModules();
        renderDashboard();
      });
    });
  }

  function renderDashboard() {
    const total = getTotalItems();
    const done = getCompletedItems();
    const pct = total ? Math.round((done / total) * 100) : 0;

    const modulesDone = LEARNING_MODULES.filter((m) => {
      const prog = state.moduleProgress[m.id] || {};
      return m.items.every((_, i) => prog[i]);
    }).length;

    const subjectsStarted = state.selectedSubjects.length;

    $('#dashboard-stats').innerHTML = `
      <div class="dash-card">
        <div class="dash-card-value">${pct}%</div>
        <div class="dash-card-label">Total fremdrift</div>
      </div>
      <div class="dash-card">
        <div class="dash-card-value">${modulesDone}/${LEARNING_MODULES.length}</div>
        <div class="dash-card-label">Moduler fullført</div>
      </div>
      <div class="dash-card">
        <div class="dash-card-value">${subjectsStarted}</div>
        <div class="dash-card-label">Fag i gang</div>
      </div>
      <div class="dash-card">
        <div class="dash-card-value">${done}</div>
        <div class="dash-card-label">Oppgaver fullført</div>
      </div>
    `;

    renderSubjectFilter('#dashboard-subjects', (id) => {
      state.activeSubject = id;
      if (!state.selectedSubjects.includes(id)) state.selectedSubjects.push(id);
      saveState();
      $$('.nav-item').forEach((b) => b.classList.remove('active'));
      $$('.nav-item[data-panel="subjects"]')[0].classList.add('active');
      $$('.panel').forEach((p) => p.classList.remove('active'));
      $('#panel-subjects').classList.add('active');
      renderSubjects();
    });

    const nextSteps = [];

    const incompleteModules = LEARNING_MODULES.filter((m) => {
      const prog = state.moduleProgress[m.id] || {};
      return !m.items.every((_, i) => prog[i]);
    });

    if (incompleteModules.length) {
      const next = incompleteModules[0];
      const prog = state.moduleProgress[next.id] || {};
      const nextItem = next.items.findIndex((_, i) => !prog[i]);
      nextSteps.push({
        icon: '📈',
        text: `Fortsett modulen «${next.title}»: ${next.items[nextItem >= 0 ? nextItem : 0]}`,
        action: () => {
          state.expandedModule = next.id;
          $$('.nav-item[data-panel="learning"]')[0].click();
          renderModules();
        },
      });
    }

    if (!state.selectedSubjects.length) {
      nextSteps.push({
        icon: '🎓',
        text: 'Velg minst ett fag du underviser i for å få en skreddersydd plan',
        action: () => $$('.nav-item[data-panel="subjects"]')[0].click(),
      });
    } else {
      const lowest = state.selectedSubjects
        .map((id) => ({ id, pct: getSubjectProgress(id) }))
        .sort((a, b) => a.pct - b.pct)[0];
      if (lowest && lowest.pct < 100) {
        const subj = SUBJECTS.find((s) => s.id === lowest.id);
        nextSteps.push({
          icon: subj.icon,
          text: `Fortsett AI-planen for ${subj.name} (${lowest.pct}% fullført)`,
          action: () => {
            state.activeSubject = lowest.id;
            $$('.nav-item[data-panel="subjects"]')[0].click();
            renderSubjects();
          },
        });
      }
    }

    if (!state.activeSection) {
      nextSteps.push({
        icon: '📚',
        text: 'Utforsk toolkit-seksjonene for å forstå hele AI-reisen',
        action: () => $$('.nav-item[data-panel="sections"]')[0].click(),
      });
    }

    $('#dashboard-next-steps').innerHTML = nextSteps.length
      ? nextSteps
          .map(
            (ns, i) => `
        <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 0;${i < nextSteps.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
          <span style="font-size:1.5rem">${ns.icon}</span>
          <span style="flex:1;font-size:0.93rem">${ns.text}</span>
          <button class="btn btn-outline btn-sm" data-step="${i}">Gå →</button>
        </div>
      `
          )
          .join('')
      : '<p style="color:var(--accent);font-weight:600">🎉 Gratulerer! Du har fullført alle moduler og planer.</p>';

    $('#dashboard-next-steps').querySelectorAll('button[data-step]').forEach((btn) => {
      btn.addEventListener('click', () => nextSteps[parseInt(btn.dataset.step)].action());
    });
  }

  function init() {
    initNav();
    renderSectionGrid();
    renderSubjects();
    renderModules();
    renderDashboard();
    updateHeaderProgress();
  }

  init();
})();
