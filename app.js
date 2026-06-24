const sections = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'User Management' },
  { id: 'agents', label: 'Agent Management' },
  { id: 'skills', label: 'Skills' },
  { id: 'contracts', label: 'Agent Contracts' },
  { id: 'errors', label: 'Error Log' },
];

const state = {
  activeSection: 'dashboard',
  theme: 'light',
  mobileDrawerOpen: false,
  openDropdown: null,
  modal: null,
  expandedAgents: new Set(),
  filters: {
    users: '',
    severity: 'all',
  },
  users: [
    { id: 'u1', name: 'Jane Cooper', email: 'jane@acme.io', plan: 'Pro', status: 'active', signup: '2025-01-14', lastActive: '2026-06-24 14:02', agents: 4, billing: '$1,920/mo' },
    { id: 'u2', name: 'Mark Diaz', email: 'mark@globex.com', plan: 'Enterprise', status: 'active', signup: '2024-11-03', lastActive: '2026-06-24 13:56', agents: 9, billing: '$6,240/mo' },
    { id: 'u3', name: 'Lia Ng', email: 'lia@hooli.net', plan: 'Free', status: 'inactive', signup: '2026-03-21', lastActive: '2026-06-20 09:17', agents: 1, billing: '$0/mo' },
    { id: 'u4', name: 'Omar Chen', email: 'omar@initech.ai', plan: 'Pro', status: 'suspended', signup: '2025-09-08', lastActive: '2026-06-10 11:40', agents: 2, billing: '$980/mo' },
    { id: 'u5', name: 'Priya Banerjee', email: 'priya@starklabs.io', plan: 'Enterprise', status: 'active', signup: '2024-07-19', lastActive: '2026-06-24 12:22', agents: 11, billing: '$8,400/mo' },
    { id: 'u6', name: 'Luis Ortega', email: 'luis@umbrella.co', plan: 'Pro', status: 'inactive', signup: '2025-12-01', lastActive: '2026-05-30 18:04', agents: 3, billing: '$1,350/mo' },
    { id: 'u7', name: 'Amina Noor', email: 'amina@wayline.dev', plan: 'Free', status: 'active', signup: '2026-02-05', lastActive: '2026-06-23 20:18', agents: 1, billing: '$120/mo' },
    { id: 'u8', name: 'Tobias Reed', email: 'tobias@northwind.org', plan: 'Enterprise', status: 'active', signup: '2024-12-28', lastActive: '2026-06-24 10:47', agents: 8, billing: '$5,760/mo' },
  ],
  agents: [
    { id: 'a1', name: 'SupportBot', owner: 'Acme Inc.', status: 'active', skills: ['ticket-triage', 'summarize', 'translate', 'sentiment-detect'], prompt: 'You are SupportBot. Prioritize customer empathy and classify urgency.' },
    { id: 'a2', name: 'DataMiner', owner: 'Globex', status: 'failing', skills: ['web-search', 'code-exec', 'data-analysis', 'summarize', 'sql-query'], prompt: 'You are DataMiner. Retrieve and validate data from approved sources.' },
    { id: 'a3', name: 'InboxZero', owner: 'Hooli', status: 'inactive', skills: ['classify', 'summarize', 'reply-draft'], prompt: 'You are InboxZero. Triage inbox and draft concise responses.' },
    { id: 'a4', name: 'LegalAssist', owner: 'Initech', status: 'active', skills: ['document-qa', 'summarize', 'citation-trace'], prompt: 'You are LegalAssist. Extract clauses and flag risk language.' },
    { id: 'a5', name: 'OpsPulse', owner: 'Umbrella', status: 'active', skills: ['monitoring', 'incident-triage', 'runbook-suggest'], prompt: 'You are OpsPulse. Monitor telemetry and suggest runbooks.' },
    { id: 'a6', name: 'MarketLens', owner: 'Northwind', status: 'inactive', skills: ['web-search', 'trend-clustering', 'summary-brief'], prompt: 'You are MarketLens. Track market signals weekly.' },
    { id: 'a7', name: 'DevAudit', owner: 'Wayline', status: 'active', skills: ['code-exec', 'static-analysis', 'test-plan'], prompt: 'You are DevAudit. Identify regressions and remediation work.' },
    { id: 'a8', name: 'SalesPilot', owner: 'Fabrikam', status: 'active', skills: ['crm-query', 'call-summary', 'email-draft', 'forecast'], prompt: 'You are SalesPilot. Prepare next actions and pipeline risks.' },
  ],
  skills: [
    { id: 's1', name: 'Web Search', description: 'Query live web content', adoption: 124, category: 'Retrieval', pricing: '$0.03 / 1k queries', detail: 'Supports source snippets and domain filtering.' },
    { id: 's2', name: 'Code Execution', description: 'Run sandboxed scripts', adoption: 88, category: 'Runtime', pricing: '$0.12 / compute minute', detail: 'Restricted network with CPU and memory caps.' },
    { id: 's3', name: 'Data Analysis', description: 'Analyze structured datasets', adoption: 56, category: 'Analytics', pricing: '$0.06 / run', detail: 'Supports CSV and JSON sources with profiling.' },
    { id: 's4', name: 'Summarization', description: 'Compress long text into key points', adoption: 201, category: 'Language', pricing: '$0.015 / 1k tokens', detail: 'Adjustable tone and length controls.' },
    { id: 's5', name: 'Translation', description: 'Translate across major languages', adoption: 97, category: 'Language', pricing: '$0.02 / 1k tokens', detail: 'Terminology controls for enterprise glossaries.' },
    { id: 's6', name: 'SQL Query', description: 'Generate safe SQL statements', adoption: 42, category: 'Data Access', pricing: '$0.05 / query', detail: 'Schema-aware generation with guardrails.' },
    { id: 's7', name: 'Sentiment Detect', description: 'Classify sentiment and urgency', adoption: 73, category: 'Classification', pricing: '$0.01 / 1k tokens', detail: 'Returns confidence and urgency score.' },
  ],
  contracts: [
    { id: 'c1', client: 'Acme Inc.', agent: 'SupportBot', start: '2026-01-01', end: '2026-06-30', status: 'active', discounts: 0, items: [{ skill: 'web-search', price: 1200 }, { skill: 'code-exec', price: 1800 }, { skill: 'summarize', price: 1200 }] },
    { id: 'c2', client: 'Globex', agent: 'DataMiner', start: '2026-03-01', end: '2026-09-30', status: 'active', discounts: 200, items: [{ skill: 'web-search', price: 2600 }, { skill: 'data-analysis', price: 3200 }, { skill: 'sql-query', price: 2400 }, { skill: 'summarize', price: 1800 }] },
    { id: 'c3', client: 'Hooli', agent: 'InboxZero', start: '2026-02-01', end: '2026-05-31', status: 'past', discounts: 0, items: [{ skill: 'reply-draft', price: 900 }, { skill: 'summarize', price: 1200 }] },
    { id: 'c4', client: 'Initech', agent: 'LegalAssist', start: '2025-12-01', end: '2026-12-01', status: 'active', discounts: 350, items: [{ skill: 'document-qa', price: 3300 }, { skill: 'citation-trace', price: 1700 }, { skill: 'summarize', price: 900 }] },
    { id: 'c5', client: 'Wayline', agent: 'DevAudit', start: '2025-11-10', end: '2026-04-10', status: 'past', discounts: 100, items: [{ skill: 'code-exec', price: 2100 }, { skill: 'static-analysis', price: 2600 }] },
    { id: 'c6', client: 'Fabrikam', agent: 'SalesPilot', start: '2026-04-01', end: '2026-10-01', status: 'active', discounts: 0, items: [{ skill: 'crm-query', price: 1500 }, { skill: 'forecast', price: 1900 }, { skill: 'call-summary', price: 1200 }] },
    { id: 'c7', client: 'Northwind', agent: 'MarketLens', start: '2025-07-01', end: '2026-01-01', status: 'past', discounts: 50, items: [{ skill: 'web-search', price: 1100 }, { skill: 'trend-clustering', price: 1500 }] },
    { id: 'c8', client: 'Umbrella', agent: 'OpsPulse', start: '2026-05-15', end: '2026-11-15', status: 'active', discounts: 300, items: [{ skill: 'monitoring', price: 3200 }, { skill: 'incident-triage', price: 2500 }, { skill: 'runbook-suggest', price: 1800 }] },
  ],
  errors: [
    { id: 'e1', timestamp: '06-24 14:02:11', agent: 'DataMiner', severity: 'critical', description: 'Timeout while executing external data pull', trace: 'Error: RequestTimeout\n at pipeline.fetchRemoteSource (pipeline.js:142)', resolved: false },
    { id: 'e2', timestamp: '06-24 13:47:55', agent: 'SupportBot', severity: 'warning', description: 'Rate limit reached for summarizer', trace: 'Warning: RateLimitExceeded\n at summarize.batch (llm-gateway.js:88)', resolved: false },
    { id: 'e3', timestamp: '06-24 12:30:02', agent: 'InboxZero', severity: 'info', description: 'Retry queued after transient mailbox lock', trace: 'Info: MailboxLockDetected\n at inbox.sync (mail-bridge.js:57)', resolved: true },
    { id: 'e4', timestamp: '06-24 11:16:43', agent: 'OpsPulse', severity: 'critical', description: 'Malformed telemetry payload parse failure', trace: 'Error: PayloadParseError\n at telemetry.parse (collector.js:109)', resolved: false },
    { id: 'e5', timestamp: '06-24 10:42:18', agent: 'LegalAssist', severity: 'warning', description: 'Citation lookup returned partial references', trace: 'Warning: CitationLookupPartial\n at citation.enrich (legal-engine.js:302)', resolved: false },
    { id: 'e6', timestamp: '06-24 09:10:12', agent: 'SalesPilot', severity: 'minor', description: 'Fallback model selected after latency spike', trace: 'Info: FallbackModelSelected\n at router.selectModel (routing.js:74)', resolved: false },
    { id: 'e7', timestamp: '06-24 08:55:33', agent: 'DevAudit', severity: 'critical', description: 'Sandbox execution terminated for memory cap', trace: 'Error: SandboxMemoryLimit\n at executor.run (sandbox.js:211)', resolved: false },
    { id: 'e8', timestamp: '06-23 21:18:01', agent: 'MarketLens', severity: 'info', description: 'Source crawl completed with one skipped domain', trace: 'Info: CrawlComplete\n skipped-domain=paywalled.example', resolved: true },
    { id: 'e9', timestamp: '06-23 20:12:50', agent: 'SupportBot', severity: 'warning', description: 'Language detector confidence below threshold', trace: 'Warning: LowConfidenceLanguageDetect\n score=0.54 threshold=0.75', resolved: false },
    { id: 'e10', timestamp: '06-23 18:40:27', agent: 'DataMiner', severity: 'minor', description: 'Cached schema expired and refreshed', trace: 'Info: SchemaCacheRefresh\n at schema.sync (schema-registry.js:64)', resolved: true },
  ],
};

const refs = {
  html: document.documentElement,
  desktopNav: document.getElementById('desktopNav'),
  mobileNav: document.getElementById('mobileNav'),
  mobileDrawer: document.getElementById('mobileDrawer'),
  mobileMenuBtn: document.getElementById('mobileMenuBtn'),
  mobileBackdrop: document.getElementById('mobileBackdrop'),
  topTitle: document.getElementById('topTitle'),
  content: document.getElementById('content'),
  panels: Array.from(document.querySelectorAll('[data-panel]')),
  themeBtn: document.getElementById('themeBtn'),
  themeIcon: document.getElementById('themeIcon'),
  dropdownPortal: document.getElementById('dropdownPortal'),
  modalRoot: document.getElementById('modalRoot'),
};

const svg = {
  sun: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  moon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3c-.01.31-.01.63-.01.95a7.5 7.5 0 0 0 9.8 8.84Z"/></svg>',
  chevron: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6"/></svg>',
};

const THEME_KEY = 'agenthub-theme';

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleCase(text) {
  const t = String(text || '').replaceAll('-', ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function money(n) {
  return `$${Number(n).toLocaleString('en-US')}`;
}

function contractTotals(contract) {
  const subtotal = contract.items.reduce((sum, item) => sum + item.price, 0);
  const discount = contract.discounts || 0;
  return { subtotal, discount, total: subtotal - discount };
}

function badgeClass(kind) {
  if (['active', 'resolved', 'success'].includes(kind)) {
    return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
  }
  if (['critical', 'error', 'failing', 'suspended'].includes(kind)) {
    return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
  }
  if (kind === 'warning') {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
  }
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
}

function statusBadge(kind, label) {
  return `<span class="rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass(kind)}">${esc(label || titleCase(kind))}</span>`;
}

function severityBadge(kind) {
  return statusBadge(kind === 'minor' ? 'info' : kind, kind === 'minor' ? 'Minor' : titleCase(kind));
}

function navBtn(item) {
  const active = state.activeSection === item.id;
  const cls = active
    ? 'bg-indigo-50 text-indigo-700 border-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
    : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100';
  return `<button type="button" data-action="set-section" data-id="${item.id}" class="w-full px-3 py-2 rounded-lg border-l-2 text-sm text-left flex items-center gap-3 ${cls}" ${active ? 'aria-current="page"' : ''}><span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">•</span><span>${esc(item.label)}</span></button>`;
}

function actionBtn(entity, id) {
  const key = `${entity}:${id}`;
  const expanded = state.openDropdown && state.openDropdown.key === key;
  return `<button type="button" data-action="toggle-dropdown" data-entity="${entity}" data-id="${id}" class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" aria-label="Open actions" aria-haspopup="menu" aria-expanded="${expanded ? 'true' : 'false'}">⋮</button>`;
}

function tableShell(headers, body) {
  return `<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><table class="min-w-full text-sm"><thead class="bg-slate-50 dark:bg-slate-800/60"><tr>${headers
    .map((h) => `<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-left ${h.right ? 'text-right' : ''}">${esc(h.label)}</th>`)
    .join('')}</tr></thead><tbody>${body.join('')}</tbody></table></div>`;
}

function renderDashboard() {
  const metrics = [
    ['Total Revenue Generated', '$184,920', 'This month', 'text-indigo-600 dark:text-indigo-400'],
    ['Total Discount and Coupon Losses', '-$12,340', 'This month', 'text-amber-600 dark:text-amber-400'],
    ['Active Agents Across Clients', '342', 'All clients', 'text-green-600 dark:text-green-400'],
    ['Agents Flagged as Failing', '7', 'Needs attention', 'text-red-600 dark:text-red-400'],
  ];
  const bars = [30, 44, 58, 84, 66, 50, 38]
    .map((h, i) => `<div class="flex flex-col items-center gap-2"><div class="w-8 rounded-t-md bg-indigo-500/80 dark:bg-indigo-400/70" style="height:${h * 2}px"></div><span class="text-xs text-slate-500 dark:text-slate-400">${['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span></div>`)
    .join('');

  return `<div class="space-y-6"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">${metrics
    .map((m) => `<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">${esc(m[0])}</p><p class="mt-3 text-3xl font-bold ${m[3]}">${esc(m[1])}</p><p class="mt-2 text-sm text-slate-500 dark:text-slate-400">${esc(m[2])}</p></article>`)
    .join('')}</div><article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="flex items-center justify-between"><h2 class="text-base font-semibold">Weekly Activity</h2><span class="text-xs text-slate-500 dark:text-slate-400">Placeholder</span></div><div class="mt-4 h-72 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40"><div class="h-full flex items-end justify-around">${bars}</div></div></article></div>`;
}

function filteredUsers() {
  const q = state.filters.users.trim().toLowerCase();
  if (!q) return state.users;
  return state.users.filter((u) => [u.name, u.email, u.plan, u.status].some((v) => String(v).toLowerCase().includes(q)));
}

function renderUsersDesktop(rows) {
  const body = rows.map((u) => `<tr class="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"><td class="px-4 py-3 font-medium">${esc(u.name)}</td><td class="px-4 py-3 text-slate-600 dark:text-slate-300">${esc(u.email)}</td><td class="px-4 py-3">${esc(u.plan)}</td><td class="px-4 py-3">${statusBadge(u.status)}</td><td class="px-4 py-3 text-right">${actionBtn('user', u.id)}</td></tr>`);
  return tableShell([
    { label: 'Name' },
    { label: 'Email' },
    { label: 'Plan' },
    { label: 'Status' },
    { label: 'Actions', right: true },
  ], body.length ? body : ['<tr><td colspan="5" class="px-4 py-8 text-center text-slate-500 dark:text-slate-400">No users match this search.</td></tr>']);
}

function renderUsersMobile(rows) {
  if (!rows.length) {
    return '<div class="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">No users match this search.</div>';
  }
  return `<div class="space-y-2">${rows
    .map((u) => `<article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="flex items-start justify-between gap-3"><div class="min-w-0"><p class="font-medium truncate">${esc(u.name)}</p><div class="mt-1">${statusBadge(u.status)}</div></div><div class="shrink-0">${actionBtn('user', u.id)}</div></div></article>`)
    .join('')}</div>`;
}

function renderUsers() {
  const rows = filteredUsers();
  return `<div class="space-y-4"><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 class="text-xl font-semibold">User Management</h2><input type="search" data-action="users-search" value="${esc(state.filters.users)}" placeholder="Search users" class="w-full sm:w-72 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 placeholder:text-slate-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-900" aria-label="Search users" /></div><div class="hidden md:block">${renderUsersDesktop(rows)}</div><div class="md:hidden">${renderUsersMobile(rows)}</div></div>`;
}

function renderAgents() {
  return `<div class="space-y-4"><h2 class="text-xl font-semibold">Agent Management</h2><div class="space-y-3">${state.agents
    .map((a) => {
      const open = state.expandedAgents.has(a.id);
      return `<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="flex items-start justify-between gap-4"><div><h3 class="text-base font-semibold">${esc(a.name)}</h3><p class="text-sm text-slate-500 dark:text-slate-400">Owner: ${esc(a.owner)}</p></div><div class="flex items-center gap-2">${statusBadge(a.status)}${actionBtn('agent', a.id)}</div></div><button type="button" data-action="toggle-agent" data-id="${a.id}" aria-expanded="${open ? 'true' : 'false'}" class="mt-3 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"><span class="transition-transform ${open ? 'rotate-90' : ''}">${svg.chevron}</span><span>${open ? 'Hide skills' : 'Show skills'}</span></button><div class="grid transition-all duration-200 ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}"><div class="overflow-hidden"><div class="flex flex-wrap gap-2">${a.skills.map((s) => `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">${esc(s)}</span>`).join('')}</div></div></div></article>`;
    })
    .join('')}</div></div>`;
}

function renderSkills() {
  const body = state.skills.map((s) => `<tr class="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"><td class="px-4 py-3 font-medium">${esc(s.name)}</td><td class="px-4 py-3 text-slate-600 dark:text-slate-300">${esc(s.description)}</td><td class="px-4 py-3"><div class="space-y-2"><div class="text-sm text-slate-600 dark:text-slate-300">Enabled on ${s.adoption} agents</div><div class="h-1.5 w-40 rounded-full bg-slate-200 dark:bg-slate-700"><div class="h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" style="width:${Math.min(100, Math.round((s.adoption / 220) * 100))}%"></div></div></div></td><td class="px-4 py-3 text-right">${actionBtn('skill', s.id)}</td></tr>`);
  return `<div class="space-y-4"><h2 class="text-xl font-semibold">Skills</h2><div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 text-sm text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200"><p class="font-semibold">What is a skill?</p><p class="mt-1">Skills are modular capabilities such as web search, code execution, and data analysis that can be attached to agents.</p></div>${tableShell([{ label: 'Name' }, { label: 'Description' }, { label: 'Adoption' }, { label: 'Actions', right: true }], body)}</div>`;
}

function renderContracts() {
  const body = state.contracts.map((c) => {
    const t = contractTotals(c);
    return `<tr class="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"><td class="px-4 py-3 font-medium">${esc(c.client)}</td><td class="px-4 py-3">${esc(c.agent)}</td><td class="px-4 py-3">${c.items.length} skills</td><td class="px-4 py-3 text-slate-600 dark:text-slate-300">${esc(c.start)} → ${esc(c.end)}</td><td class="px-4 py-3 font-medium">${money(t.total)}</td><td class="px-4 py-3">${statusBadge(c.status)}</td><td class="px-4 py-3 text-right">${actionBtn('contract', c.id)}</td></tr>`;
  });
  return `<div class="space-y-4"><h2 class="text-xl font-semibold">Agent Contracts</h2>${tableShell([{ label: 'Client' }, { label: 'Rented Agent' }, { label: 'Contracted Skills' }, { label: 'Contract Dates' }, { label: 'Total Paid' }, { label: 'Status' }, { label: 'Actions', right: true }], body)}</div>`;
}

function renderErrors() {
  const show = state.filters.severity === 'all' ? state.errors : state.errors.filter((e) => e.severity === state.filters.severity);
  const body = show.map((e) => `<tr class="border-t border-slate-200 ${e.resolved ? 'opacity-60' : ''} hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"><td class="px-4 py-3 font-medium whitespace-nowrap">${esc(e.timestamp)}</td><td class="px-4 py-3">${esc(e.agent)}</td><td class="px-4 py-3">${severityBadge(e.severity)} ${e.resolved ? statusBadge('resolved', 'Resolved') : ''}</td><td class="px-4 py-3 text-slate-600 dark:text-slate-300">${esc(e.description)}</td><td class="px-4 py-3 text-right">${actionBtn('error', e.id)}</td></tr>`);
  return `<div class="space-y-4"><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 class="text-xl font-semibold">Error Log</h2><label class="inline-flex items-center gap-2 text-sm"><span class="text-slate-500 dark:text-slate-400">Severity</span><select data-action="severity-filter" class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" aria-label="Filter errors by severity">${[
    ['all', 'All'],
    ['critical', 'Critical'],
    ['warning', 'Warning'],
    ['info', 'Info'],
    ['minor', 'Minor'],
  ]
    .map((opt) => `<option value="${opt[0]}" ${state.filters.severity === opt[0] ? 'selected' : ''}>${opt[1]}</option>`)
    .join('')}</select></label></div>${tableShell([{ label: 'Timestamp' }, { label: 'Agent Name' }, { label: 'Error Type' }, { label: 'Description' }, { label: 'Actions', right: true }], body.length ? body : ['<tr><td colspan="5" class="px-4 py-8 text-center text-slate-500 dark:text-slate-400">No entries match this filter.</td></tr>'])}</div>`;
}

function renderPanels() {
  panel('dashboard').innerHTML = renderDashboard();
  panel('users').innerHTML = renderUsers();
  panel('agents').innerHTML = renderAgents();
  panel('skills').innerHTML = renderSkills();
  panel('contracts').innerHTML = renderContracts();
  panel('errors').innerHTML = renderErrors();
}

function panel(id) {
  return refs.panels.find((p) => p.getAttribute('data-panel') === id);
}

function renderNavs() {
  refs.desktopNav.innerHTML = sections.map(navBtn).join('');
  refs.mobileNav.innerHTML = sections.map(navBtn).join('');
}

function syncActiveSection() {
  refs.panels.forEach((p) => {
    const show = p.getAttribute('data-panel') === state.activeSection;
    p.classList.toggle('hidden', !show);
  });
  const item = sections.find((s) => s.id === state.activeSection);
  refs.topTitle.textContent = item ? item.label : 'Dashboard';
}

function setSection(id, updateHash = true) {
  if (!sections.find((s) => s.id === id)) return;
  state.activeSection = id;
  closeDropdown();
  renderNavs();
  syncActiveSection();
  refs.content.scrollTop = 0;
  if (updateHash) window.location.hash = id;
  if (state.mobileDrawerOpen) setMobileDrawer(false);
}

function setMobileDrawer(open) {
  state.mobileDrawerOpen = !!open;
  refs.mobileDrawer.classList.toggle('hidden', !state.mobileDrawerOpen);
  refs.mobileDrawer.setAttribute('aria-hidden', String(!state.mobileDrawerOpen));
}

function setTheme(next, options = {}) {
  const { persist = true } = options;
  state.theme = next === 'dark' ? 'dark' : 'light';
  refs.html.classList.toggle('dark', state.theme === 'dark');
  refs.themeIcon.innerHTML = state.theme === 'dark' ? svg.sun : svg.moon;
  refs.themeBtn.setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  if (persist) {
    sessionStorage.setItem(THEME_KEY, state.theme);
  }
}

function getRecord(entity, id) {
  const map = { user: state.users, agent: state.agents, skill: state.skills, contract: state.contracts, error: state.errors };
  return (map[entity] || []).find((r) => r.id === id);
}

function dropdownActions(entity, id) {
  if (entity === 'user') return [{ label: 'View detail', action: 'open-modal' }, { label: 'Delete', action: 'delete', destructive: true }];
  if (entity === 'agent') return [{ label: 'Configure', action: 'open-modal' }, { label: 'Delete', action: 'delete', destructive: true }];
  if (entity === 'skill') return [{ label: 'View detail', action: 'open-modal' }, { label: 'Delete', action: 'delete', destructive: true }];
  if (entity === 'contract') return [{ label: 'View detail', action: 'open-modal' }];
  if (entity === 'error') {
    const e = getRecord('error', id);
    if (!e) return [{ label: 'View detail', action: 'open-modal' }];
    if (e.resolved) return [{ label: 'View detail', action: 'open-modal' }, { label: 'Already resolved', action: 'noop', disabled: true }];
    return [{ label: 'View detail', action: 'open-modal' }, { label: 'Mark as resolved', action: 'resolve' }];
  }
  return [];
}

function openDropdown(entity, id, triggerEl) {
  const rect = triggerEl.getBoundingClientRect();
  const key = `${entity}:${id}`;
  if (state.openDropdown && state.openDropdown.key === key) {
    closeDropdown();
    return;
  }
  state.openDropdown = { key, entity, id, rect, triggerEl };
  renderDropdownPortal();
}

function closeDropdown() {
  state.openDropdown = null;
  renderDropdownPortal();
  renderPanels();
}

function renderDropdownPortal() {
  const d = state.openDropdown;
  if (!d) {
    refs.dropdownPortal.innerHTML = '';
    return;
  }

  const actions = dropdownActions(d.entity, d.id);
  const width = 184;
  const margin = 8;
  let left = Math.min(d.rect.right - width, window.innerWidth - width - margin);
  left = Math.max(margin, left);
  let top = d.rect.bottom + 6;
  const approxHeight = actions.length * 40 + 12;
  if (top + approxHeight > window.innerHeight - margin) {
    top = Math.max(margin, d.rect.top - approxHeight - 6);
  }

  refs.dropdownPortal.innerHTML = `<div class="absolute inset-0 pointer-events-auto" data-action="close-dropdown-backdrop"></div><div class="absolute pointer-events-auto w-46 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" style="top:${top}px;left:${left}px;width:${width}px" role="menu">${actions
    .map((a) => `<button type="button" class="w-full text-left px-3 py-2 text-sm rounded-md ${a.destructive ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'} ${a.disabled ? 'opacity-50 cursor-not-allowed' : ''}" data-action="dropdown-item" data-item-action="${a.action}" data-entity="${d.entity}" data-id="${d.id}" ${a.disabled ? 'disabled' : ''}>${esc(a.label)}</button>`)
    .join('')}</div>`;

  renderPanels();
}

function openModal(entity, id, triggerEl) {
  const record = getRecord(entity, id);
  if (!record) return;
  state.modal = { entity, id, triggerEl: triggerEl || document.activeElement };
  refs.modalRoot.classList.remove('hidden');
  refs.modalRoot.setAttribute('aria-hidden', 'false');
  refs.modalRoot.innerHTML = modalMarkup(entity, record);
  const closeBtn = refs.modalRoot.querySelector('[data-role="modal-close"]');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (!state.modal) return;
  const trigger = state.modal.triggerEl;
  state.modal = null;
  refs.modalRoot.innerHTML = '';
  refs.modalRoot.classList.add('hidden');
  refs.modalRoot.setAttribute('aria-hidden', 'true');
  if (trigger && typeof trigger.focus === 'function') trigger.focus();
}

function modalMarkup(entity, record) {
  let title = '';
  let body = '';

  if (entity === 'user') {
    title = `User Detail - ${record.name}`;
    body = `<dl class="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm"><div><dt class="text-slate-500 dark:text-slate-400">Name</dt><dd class="font-medium">${esc(record.name)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Email</dt><dd class="font-medium">${esc(record.email)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Plan</dt><dd>${esc(record.plan)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Status</dt><dd>${statusBadge(record.status)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Signup Date</dt><dd>${esc(record.signup)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Last Active</dt><dd>${esc(record.lastActive)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Rented Agents</dt><dd>${record.agents}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Billing Summary</dt><dd>${esc(record.billing)}</dd></div></dl>`;
  }

  if (entity === 'agent') {
    title = `Agent Config - ${record.name}`;
    body = `<p class="text-sm text-slate-500 dark:text-slate-400">Owner: ${esc(record.owner)}</p><div class="mt-3">${statusBadge(record.status)}</div><h4 class="mt-4 text-sm font-semibold">System Prompt</h4><pre class="mt-2 max-h-72 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-800">${esc(record.prompt)}</pre><h4 class="mt-4 text-sm font-semibold">Attached Skills</h4><div class="mt-2 flex flex-wrap gap-2">${record.skills.map((s) => `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">${esc(s)}</span>`).join('')}</div>`;
  }

  if (entity === 'skill') {
    title = `Skill Detail - ${record.name}`;
    body = `<dl class="space-y-3 text-sm"><div><dt class="text-slate-500 dark:text-slate-400">Description</dt><dd>${esc(record.description)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Category</dt><dd>${esc(record.category)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Adoption</dt><dd>Enabled on ${record.adoption} agents</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Pricing</dt><dd>${esc(record.pricing)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Details</dt><dd>${esc(record.detail)}</dd></div></dl>`;
  }

  if (entity === 'contract') {
    const t = contractTotals(record);
    title = `Contract - ${record.client} / ${record.agent}`;
    body = `<p class="text-sm text-slate-500 dark:text-slate-400">Period: ${esc(record.start)} → ${esc(record.end)}</p><div class="mt-4 rounded-lg border border-slate-200 dark:border-slate-700">${record.items.map((i) => `<div class="flex items-center justify-between px-3 py-2 text-sm border-b border-slate-200 last:border-b-0 dark:border-slate-700"><span>${esc(i.skill)}</span><span class="font-medium">${money(i.price)}</span></div>`).join('')}</div><div class="mt-4 space-y-2 text-sm"><div class="flex items-center justify-between"><span>Subtotal</span><span>${money(t.subtotal)}</span></div><div class="flex items-center justify-between"><span>Discounts</span><span>-${money(t.discount)}</span></div><div class="flex items-center justify-between text-base font-semibold"><span>Total Paid</span><span>${money(t.total)}</span></div></div>`;
  }

  if (entity === 'error') {
    title = `Error Detail - ${record.agent}`;
    body = `<dl class="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm"><div><dt class="text-slate-500 dark:text-slate-400">Timestamp</dt><dd>${esc(record.timestamp)}</dd></div><div><dt class="text-slate-500 dark:text-slate-400">Severity</dt><dd>${severityBadge(record.severity)}</dd></div><div class="sm:col-span-2"><dt class="text-slate-500 dark:text-slate-400">Description</dt><dd>${esc(record.description)}</dd></div></dl><h4 class="mt-4 text-sm font-semibold">Stack Trace</h4><pre class="mt-2 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-800">${esc(record.trace)}</pre>`;
  }

  return `<div class="absolute inset-0 bg-black/50" data-role="modal-backdrop"></div><div class="relative z-10 min-h-full w-full p-4 md:p-8 flex items-center justify-center"><div class="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700"><h3 class="font-semibold">${esc(title)}</h3><button type="button" data-role="modal-close" class="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Close dialog">✕</button></div><div class="max-h-[calc(90vh-58px)] overflow-auto p-4">${body}</div></div></div>`;
}

function rerenderAll() {
  renderNavs();
  renderPanels();
  syncActiveSection();
}

function handleDelete(entity, id) {
  if (entity === 'user') state.users = state.users.filter((x) => x.id !== id);
  if (entity === 'agent') {
    state.agents = state.agents.filter((x) => x.id !== id);
    state.expandedAgents.delete(id);
  }
  if (entity === 'skill') state.skills = state.skills.filter((x) => x.id !== id);
  closeDropdown();
}

function handleDropdownAction(itemAction, entity, id, trigger) {
  if (itemAction === 'open-modal') {
    closeDropdown();
    openModal(entity, id, trigger);
    return;
  }
  if (itemAction === 'delete') {
    handleDelete(entity, id);
    rerenderAll();
    return;
  }
  if (itemAction === 'resolve') {
    state.errors = state.errors.map((e) => (e.id === id ? { ...e, resolved: true } : e));
    closeDropdown();
    rerenderAll();
    return;
  }
  closeDropdown();
}

function onDocumentClick(event) {
  const target = event.target;
  const actionEl = target.closest('[data-action]');

  if (!actionEl) {
    if (state.openDropdown && !target.closest('#dropdownPortal')) {
      closeDropdown();
    }
    return;
  }

  const action = actionEl.getAttribute('data-action');

  if (action === 'set-section') {
    setSection(actionEl.getAttribute('data-id'));
    return;
  }

  if (action === 'toggle-dropdown') {
    openDropdown(actionEl.getAttribute('data-entity'), actionEl.getAttribute('data-id'), actionEl);
    return;
  }

  if (action === 'toggle-agent') {
    const id = actionEl.getAttribute('data-id');
    if (state.expandedAgents.has(id)) state.expandedAgents.delete(id);
    else state.expandedAgents.add(id);
    renderPanels();
    return;
  }

  if (action === 'close-dropdown-backdrop') {
    closeDropdown();
    return;
  }

  if (action === 'dropdown-item') {
    const itemAction = actionEl.getAttribute('data-item-action');
    handleDropdownAction(itemAction, actionEl.getAttribute('data-entity'), actionEl.getAttribute('data-id'), state.openDropdown ? state.openDropdown.triggerEl : null);
    return;
  }

  if (action === 'users-search') return;
  if (action === 'severity-filter') return;
}

function onInput(event) {
  const target = event.target;
  const action = target.getAttribute('data-action');
  if (action === 'users-search') {
    state.filters.users = target.value;
    renderPanels();
  }
}

function onChange(event) {
  const target = event.target;
  const action = target.getAttribute('data-action');
  if (action === 'severity-filter') {
    state.filters.severity = target.value;
    renderPanels();
  }
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    if (state.modal) {
      closeModal();
      return;
    }
    if (state.openDropdown) {
      closeDropdown();
      return;
    }
    if (state.mobileDrawerOpen) {
      setMobileDrawer(false);
    }
  }

  if (event.key === 'Tab' && state.modal) {
    const focusables = refs.modalRoot.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function bindCore() {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('input', onInput);
  document.addEventListener('change', onChange);
  document.addEventListener('keydown', onKeydown);

  refs.mobileMenuBtn.addEventListener('click', () => setMobileDrawer(true));
  refs.mobileBackdrop.addEventListener('click', () => setMobileDrawer(false));
  refs.mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="set-section"]')) {
      setMobileDrawer(false);
    }
  });

  refs.themeBtn.addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));

  refs.modalRoot.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('[data-role="modal-close"]');
    if (closeBtn) {
      closeModal();
      return;
    }

    if (event.target.matches('[data-role="modal-backdrop"]')) {
      closeModal();
    }
  });

  window.addEventListener('resize', () => {
    if (state.openDropdown) closeDropdown();
  });

  window.addEventListener('scroll', () => {
    if (state.openDropdown) closeDropdown();
  }, true);

  window.addEventListener('hashchange', () => {
    const id = window.location.hash.replace('#', '');
    if (sections.find((s) => s.id === id)) {
      setSection(id, false);
    }
  });
}

function hydrate() {
  const saved = sessionStorage.getItem(THEME_KEY);
  const initialTheme = saved === 'dark' || saved === 'light' ? saved : 'light';
  setTheme(initialTheme, { persist: false });

  const hash = window.location.hash.replace('#', '');
  if (sections.find((s) => s.id === hash)) state.activeSection = hash;
}

function boot() {
  hydrate();
  rerenderAll();
  bindCore();
}

boot();
