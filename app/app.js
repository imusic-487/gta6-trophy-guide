// Leonida Trophy Atlas — offline GTA 6 trophy tracker.
// All 55 trophies load from local data/trophies.json; progress lives only in
// this browser (localStorage) and can be exported / imported as JSON.
// The spoiler shield masks hidden trophies until they are ticked earned.
const KEY = 'gta6-trophy-guide-earned-v1';
const SPOILER_KEY = 'gta6-trophy-guide-spoiler-v1';

const listEl = document.getElementById('list');
const qEl = document.getElementById('q');
const gradeEl = document.getElementById('grade');
const spoilerEl = document.getElementById('spoiler');
const earnedOnlyEl = document.getElementById('earned-only');
const countLine = document.getElementById('count-line');
const emptyEl = document.getElementById('empty');
const onlineNote = document.getElementById('online-note');

let earned = new Set();
try {
  earned = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
} catch { earned = new Set(); }

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;

// Deep-linkable initial state, so a filter view can be shared or screenshotted:
// ?q=, ?grade=, ?type=, ?spoiler=off, ?earned=1
const params = new URLSearchParams(location.search);
let typeFilter = 'all';
if (params.get('type') && [...document.querySelectorAll('#type-chips .chip')].some(c => c.dataset.type === params.get('type'))) {
  typeFilter = params.get('type');
}
if (params.get('q')) qEl.value = params.get('q');
if (params.get('grade') && [...gradeEl.options].some(o => o.value === params.get('grade'))) gradeEl.value = params.get('grade');
if (params.get('spoiler') === 'off') spoilerEl.checked = false;
else if (localStorage.getItem(SPOILER_KEY) === 'off') spoilerEl.checked = false;
if (params.get('earned') === '1') earnedOnlyEl.checked = true;

function save() {
  localStorage.setItem(KEY, JSON.stringify([...earned].sort((a, b) => a - b)));
  localStorage.setItem(SPOILER_KEY, spoilerEl.checked ? 'on' : 'off');
}

function visible(t) {
  if (gradeEl.value !== 'all' && t.grade !== gradeEl.value) return false;
  if (typeFilter === 'missable' && !t.missable) return false;
  if (typeFilter === 'online') return false;
  if (typeFilter !== 'all' && typeFilter !== 'missable' && t.type !== typeFilter) return false;
  if (earnedOnlyEl.checked && !earned.has(t.id)) return false;
  const q = qEl.value.trim().toLowerCase();
  if (q && !(t.name + ' ' + t.description + ' ' + t.guide).toLowerCase().includes(q)) return false;
  return true;
}

function gradeLabel(g) {
  return { platinum: '◆ Platinum', gold: '◆ Gold', silver: '◆ Silver', bronze: '◆ Bronze' }[g] ?? g;
}

function render() {
  const shown = trophies.filter(visible);
  listEl.replaceChildren();
  for (const t of shown) {
    const isEarned = earned.has(t.id);
    const masked = t.spoiler && spoilerEl.checked && !isEarned;
    const card = document.createElement('article');
    card.className = 'trophy' + (isEarned ? ' earned' : '') + (t.missable ? ' missable-card' : '');
    card.dataset.id = t.id;

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = isEarned;
    box.setAttribute('aria-label', masked ? `Mark hidden trophy ${t.id} as earned` : `Mark ${t.name} as earned`);
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.id); else earned.delete(t.id);
      save();
      render();
    });

    const body = document.createElement('div');
    body.className = 'trophy-body';

    const head = document.createElement('div');
    head.className = 'trophy-head';
    const name = document.createElement('h3');
    name.textContent = masked ? `Hidden trophy #${t.id}` : t.name;
    const badges = document.createElement('span');
    badges.className = 'badges';
    const gradeBadge = document.createElement('span');
    gradeBadge.className = `badge grade-${t.grade}`;
    gradeBadge.textContent = gradeLabel(t.grade);
    badges.append(gradeBadge);
    const typeBadge = document.createElement('span');
    typeBadge.className = 'badge type';
    typeBadge.textContent = t.type;
    badges.append(typeBadge);
    if (t.missable) {
      const m = document.createElement('span');
      m.className = 'badge missable';
      m.textContent = '⚠ Missable';
      badges.append(m);
    }
    if (t.spoiler && !masked) {
      const h = document.createElement('span');
      h.className = 'badge hidden-flag';
      h.textContent = 'Hidden';
      badges.append(h);
    }
    head.append(name, badges);

    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = masked ? 'Hidden trophy — tick it earned to reveal its name and description.' : t.description;

    const guide = document.createElement('p');
    guide.className = 'guide';
    guide.textContent = masked ? '' : t.guide;
    if (masked) guide.hidden = true;

    const src = document.createElement('p');
    src.className = 'source';
    src.textContent = masked ? '' : `Source: ${t.source}`;
    if (masked) src.hidden = true;

    body.append(head, desc, guide, src);
    card.append(box, body);
    listEl.append(card);
  }

  const pct = Math.round((earned.size / trophies.length) * 100);
  document.getElementById('stat-earned').textContent = earned.size;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('progress-text').textContent =
    `${earned.size} of ${trophies.length} earned — ${pct}%` +
    (earned.size === trophies.length ? ' — Platinum!' : '');
  countLine.textContent = `Showing ${shown.length} of ${trophies.length} trophies` +
    (typeFilter !== 'all' ? ` · type: ${typeFilter}` : '') +
    (gradeEl.value !== 'all' ? ` · grade: ${gradeEl.value}` : '');
  emptyEl.hidden = shown.length !== 0 || typeFilter === 'online';
  onlineNote.hidden = typeFilter !== 'online';
}

document.querySelectorAll('#type-chips .chip').forEach(chip => {
  if (chip.dataset.type === typeFilter) chip.classList.add('active');
  else chip.classList.remove('active');
  chip.addEventListener('click', () => {
    typeFilter = chip.dataset.type;
    document.querySelectorAll('#type-chips .chip').forEach(c => c.classList.toggle('active', c === chip));
    render();
  });
});

qEl.addEventListener('input', render);
gradeEl.addEventListener('change', render);
spoilerEl.addEventListener('change', () => { save(); render(); });
earnedOnlyEl.addEventListener('change', render);

document.getElementById('export').addEventListener('click', () => {
  const payload = { game: 'Grand Theft Auto VI', exported: new Date().toISOString(), earned: [...earned].sort((a, b) => a - b) };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const ids = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(ids)) throw new Error('bad file');
    const valid = new Set(trophies.map(t => t.id));
    earned = new Set(ids.filter(id => valid.has(id)));
    save();
    render();
  } catch {
    alert('That file is not a valid trophy-progress export.');
  }
  e.target.value = '';
});

document.getElementById('reset').addEventListener('click', () => {
  if (!confirm('Clear all earned ticks?')) return;
  earned = new Set();
  save();
  render();
});

render();
