# AgentHub — Admin Panel Visual & Component Specification

> A SaaS platform dashboard where companies rent AI agents. This document is a **build-ready specification** — it describes structure, components, layout, and behavior. No application code is included.

---

## 1. Tech Stack & Constraints

| Concern | Decision |
| --- | --- |
| Markup | Single/multi-page **HTML5** |
| Styling | **Tailwind CSS via CDN** only (`<script src="https://cdn.tailwindcss.com"></script>`) |
| Scripting | **Vanilla JavaScript** (no frameworks, no libraries) |
| CSS files | **None** — all styling through Tailwind utility classes |
| Data | **Placeholder / mock data** (hardcoded JS arrays/objects) |
| Theming | Light / Dark mode using Tailwind's `dark:` variant (class strategy) |

### Tailwind Dark Mode Setup
- Configure Tailwind for **class-based** dark mode:
  ```html
  <script>
    tailwind.config = { darkMode: 'class' }
  </script>
  ```
- The `<html>` (or `<body>`) element receives/removes the `dark` class via the top-bar toggle.
- Persist preference in memory for the session (placeholder; no localStorage requirement implied, but acceptable).

---

## 2. Global Layout

```
┌─────────────────────────────────────────────────────────────┐
│  TOP BAR  (logo · page title · spacer · dark-mode toggle)     │
├───────────────┬─────────────────────────────────────────────┤
│               │                                               │
│   SIDEBAR     │              MAIN CONTENT AREA                │
│  (persistent  │       (renders the active section)            │
│   nav, 6      │                                               │
│   items)      │                                               │
│               │                                               │
└───────────────┴─────────────────────────────────────────────┘
```

### 2.1 App Shell
- **Outer container:** full viewport height (`min-h-screen`), `flex` row.
- **Sidebar:** fixed width (`w-64`), full height, vertical nav.
- **Right column:** `flex-1 flex flex-col` → top bar on top, scrollable content below.
- **Responsive:** below `md`, sidebar collapses to an off-canvas drawer toggled by a hamburger in the top bar.

### 2.2 Color Tokens (suggested Tailwind classes)

| Role | Light | Dark |
| --- | --- | --- |
| App background | `bg-slate-50` | `dark:bg-slate-950` |
| Surface / card | `bg-white` | `dark:bg-slate-900` |
| Border | `border-slate-200` | `dark:border-slate-800` |
| Primary text | `text-slate-900` | `dark:text-slate-100` |
| Muted text | `text-slate-500` | `dark:text-slate-400` |
| Brand accent | `text-indigo-600` / `bg-indigo-600` | `dark:text-indigo-400` |

Keep the palette to ~4 colors: one brand accent (indigo), neutrals (slate), plus semantic status colors (green/amber/red) used only for badges.

---

## 3. Shared / Reusable Components

These are referenced across multiple sections. Build once, reuse everywhere.

### 3.1 Sidebar Navigation
- **Persistent** vertical list of the six sections:
  1. Dashboard
  2. User Management
  3. Agent Management
  4. Skills
  5. Agent Contracts
  6. Error Log
- Each item: leading icon (inline SVG) + label.
- **Active state:** accent background tint (`bg-indigo-50 dark:bg-indigo-950`) + accent text + left border indicator.
- **Hover state:** subtle surface tint.
- Brand/logo block ("AgentHub") pinned at top of sidebar.
- Section switching handled in JS by showing/hiding `<section>` panels (or a tiny hash router `#dashboard`, `#users`, etc.).

### 3.2 Top Bar
- Left: hamburger (mobile only) + current section title.
- Right: **Dark-mode toggle** — sun/moon icon button that toggles the `dark` class on `<html>`.
- Sticky to top (`sticky top-0 z-30`), surface background with bottom border.

### 3.3 Metric Card (Dashboard)
- Rounded surface card with border/shadow.
- Contents: small label, large value, optional delta/trend line of text.
- Optional leading icon in a tinted square.

### 3.4 Data Table
- Wrapper with horizontal scroll on small screens (`overflow-x-auto`).
- `<thead>`: muted uppercase labels, bottom border.
- `<tbody>` rows: hover tint, bottom dividers.
- Last column reserved for the **Action Dropdown** (`⋮` kebab button), right-aligned.

### 3.5 Action Dropdown (Kebab Menu)
- Trigger: `⋮` (vertical ellipsis) icon button.
- On click → toggles an absolutely-positioned menu panel anchored to the trigger.
- Menu items vary per section (see each section).
- **Behavior (vanilla JS):**
  - Only one dropdown open at a time.
  - Clicking outside closes it (document click listener).
  - `Esc` closes it.
  - Destructive items ("Delete") styled in red text.

### 3.6 Modal Overlay
- **Backdrop:** fixed, full-screen, semi-transparent (`bg-black/50`), `z-40`.
- **Dialog:** centered surface card, `z-50`, max-width per content, max-height with internal scroll.
- **Close mechanisms (both required):**
  1. An explicit close button (`✕`) in the modal header.
  2. **Clicking the backdrop** dismisses the modal.
  3. (Recommended) `Esc` key closes it.
- One generic modal pattern reused; content injected per use case.

### 3.7 Status Badge
- Small pill (`rounded-full px-2 py-0.5 text-xs font-medium`).
- Color-coded by semantic meaning:
  - **Active / Resolved / Success:** green (`bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400`)
  - **Inactive / Pending:** slate/gray
  - **Failing / Error / Critical:** red (`bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400`)
  - **Warning:** amber

### 3.8 Expand/Collapse Control
- Used for agent skill lists.
- Chevron icon that rotates on toggle; revealed content animates via Tailwind transition utilities (`transition-all`, height/opacity, or `max-h` technique).

---

## 4. Section Specifications

### 4.1 Dashboard
**Purpose:** at-a-glance health and revenue overview.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  Dashboard                                                     │
├──────────────┬──────────────┬──────────────┬──────────────────┤
│ Total Revenue│ Discount/    │ Active Agents│ Failing Agents   │
│              │ Coupon Loss  │              │                  │
│  $184,920    │  -$12,340    │     342      │      7  ▲red     │
│  this month  │  this month  │  all clients │  needs attention │
└──────────────┴──────────────┴──────────────┴──────────────────┘
┌──────────────────────────────────────────────────────────────┐
│  Weekly Activity                                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │   ▁  ▃  ▅  █  ▆  ▄  ▂   (placeholder bars / empty state)  │ │
│  │   M  T  W  T  F  S  S                                      │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Layout:**
- **Metric card grid** at top — responsive: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4`.
- **Four metric cards** (each using component 3.3):
  1. **Total Revenue Generated** (this month) — e.g. `$184,920`.
  2. **Total Discount & Coupon Losses** — e.g. `-$12,340`.
  3. **Active Agents Across All Clients** — count, e.g. `342`.
  4. **Agents Currently Flagged as Failing** — count, e.g. `7` (emphasize with red accent).
- **Weekly Activity Chart — placeholder area** below the cards:
  - Full-width card, fixed height (e.g. `h-72`).
  - Contains a **placeholder** (e.g. dashed-border box, faux bar/line shapes drawn with divs, or a labeled empty state "Weekly activity chart placeholder").
  - **No charting library** — represent with simple Tailwind-styled `<div>` bars if a visual is desired.

**Components used:** Metric Card ×4, placeholder chart card.

---

### 4.2 User Management
**Purpose:** manage all registered users.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  User Management                            [ search… ]        │
├───────────────┬─────────────────────┬─────────┬────────┬──────┤
│ Name          │ Email               │ Plan    │ Status │      │
├───────────────┼─────────────────────┼─────────┼────────┼──────┤
│ Jane Cooper   │ jane@acme.io        │ Pro     │ ●Active│  ⋮   │
│ Mark Diaz     │ mark@globex.com     │ Enterpr.│ ●Active│  ⋮   │
│ Lia Ng        │ lia@hooli.net       │ Free    │ ○Inact.│  ⋮   │← click ⋮
│                                              ┌─────────────┐   │
│                                              │ View detail │   │
│                                              │ Delete  (red)│  │
│                                              └─────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

**Layout:**
- Section header with title + optional search/filter input (placeholder, non-functional or simple client-side filter).
- **Data Table** with columns:
  | Name | Email | Plan | Status | Actions |
  - **Plan:** e.g. Free / Pro / Enterprise.
  - **Status:** Status Badge (Active / Inactive / Suspended).
  - **Actions:** kebab dropdown.

**Action Dropdown options (min two):**
- **View detail** → opens **User Detail Modal**.
- **Delete** → destructive (red); for spec purposes, removes the row / shows confirm (optional).

**User Detail Modal contents:**
- Full user record: name, email, plan, status, signup date, last active, number of rented agents, billing summary — all placeholder fields.
- Closes via close button **and** backdrop click.

**Placeholder data:** ~8–12 mock users.

---

### 4.3 Agent Management
**Purpose:** list all AI agents on the platform.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  Agent Management                                              │
├──────────────────────────────────────────────────────────────┤
│  SupportBot      Owner: Acme Inc.       ●active        ⋮       │
│    ▸ Show skills                                               │
├──────────────────────────────────────────────────────────────┤
│  DataMiner       Owner: Globex          ●failing       ⋮       │
│    ▾ Hide skills   (expanded, smooth transition)               │
│      [web-search] [code-exec] [summarize] [translate]          │
├──────────────────────────────────────────────────────────────┤
│  InboxZero       Owner: Hooli           ○inactive      ⋮       │
│    ▸ Show skills                        ┌──────────────┐       │
│                                         │ Configure    │       │
│                                         │ Delete  (red)│       │
│                                         └──────────────┘       │
└──────────────────────────────────────────────────────────────┘
   Configure → modal shows the agent's system prompt
```

**Layout:**
- Listing of agents — can be a **table or card list**. Each agent row/card shows:
  - **Agent name**
  - **Owner** (client/company)
  - **Current status** — Status Badge: `active` / `inactive` / `failing`.
  - **Collapsed skill list** — hidden by default.

**Skill list expand behavior:**
- An **expand control** (chevron / "Show skills") per agent.
- Clicking reveals the full list of that agent's skills with a **smooth transition** (component 3.8).
- Skills shown as small chips/tags.

**Action Dropdown options:**
- **Configure** → opens **Agent Config Modal** showing the agent's **system prompt** (multi-line text in a read-only styled block / textarea).
- **Delete** → destructive.

**Agent Config Modal contents:**
- Agent name + owner header.
- The agent's **system prompt** displayed in a monospace, scrollable block.
- (Optional) status and attached skills summary.
- Closes via button + backdrop.

**Placeholder data:** ~8–10 agents, each with 2–6 skills, varied statuses (include at least one `failing`).

---

### 4.4 Skills
**Purpose:** catalog of capabilities that can be attached to agents.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  Skills                                                        │
│  ╔════════════════════════════════════════════════════════╗   │
│  ║ ⓘ What is a skill?  Skills are modular capabilities     ║   │
│  ║   that can be attached to any agent to extend it.       ║   │
│  ╚════════════════════════════════════════════════════════╝   │
├──────────────────────────────────────────────────────────────┤
│  Web Search      Query the live web        enabled on 124  ⋮   │
│  Code Execution  Run sandboxed code        enabled on 88   ⋮   │
│  Data Analysis   Parse & chart datasets    enabled on 56   ⋮   │
│                                            ┌─────────────┐     │
│                                            │ View detail │     │
│                                            │ Delete (red)│     │
│                                            └─────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

**Layout:**
- **In-panel explanation block** at top: a brief, styled callout explaining what a "skill" means in this platform context — e.g. *"Skills are modular capabilities (web search, code execution, data analysis…) that can be attached to any agent to extend what it can do."*
- **Skill listing** — table or card grid. Each skill shows:
  - **Name**
  - **Short description**
  - **Adoption indicator** — count/number of agents that currently have it enabled (e.g. `enabled on 124 agents`), optionally with a small visual bar.

**Action Dropdown options:**
- **View detail** → **Skill Detail Modal** (full description, category, pricing if applicable, list/count of agents using it).
- **Delete** → destructive.

**Placeholder data:** ~6–10 skills.

---

### 4.5 Agent Contracts
**Purpose:** track all active and past rental contracts.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  Agent Contracts                                               │
├──────────┬────────────┬───────────┬───────────────┬───────┬───┤
│ Client   │ Rented Agent│ Skills    │ Dates         │ Paid  │   │
├──────────┼────────────┼───────────┼───────────────┼───────┼───┤
│ Acme Inc.│ SupportBot │ 3 skills  │ Jan→Jun 2026  │ $4,200│ ⋮ │
│ Globex   │ DataMiner  │ 5 skills  │ Mar→Sep 2026  │ $9,800│ ⋮ │
│ Hooli    │ InboxZero  │ 2 skills  │ Feb→May 2026  │ $2,100│ ⋮ │
└──────────┴────────────┴───────────┴───────────────┴───────┴───┘
   View detail → modal: itemized skills + individual prices + total
   ┌────────────────────────────────────────┐
   │ Contract — Acme Inc. / SupportBot    ✕ │
   │ Period: Jan 1 → Jun 30, 2026           │
   │ ─ web-search ................. $1,200  │
   │ ─ code-exec .................. $1,800  │
   │ ─ summarize .................. $1,200  │
   │ Total paid ................... $4,200  │
   └────────────────────────────────────────┘
```

**Layout:**
- **Data Table** with columns:
  | Client | Rented Agent | Contracted Skills | Contract Dates | Total Paid | Actions |
  - **Contracted Skills:** condensed (e.g. chips or "3 skills"); full list lives in the modal.
  - **Contract Dates:** start → end range.
  - **Total Paid:** currency amount.
  - **Status (optional column):** Active / Past badge.

**Action Dropdown options:**
- **View detail** → **Contract Detail Modal**.
- (Optional second action.)

**Contract Detail Modal contents:**
- Full contract breakdown:
  - Client & rented agent.
  - Contract period (start/end).
  - **Itemized list of contracted skills with individual prices.**
  - Subtotal / discounts / **total amount paid**.
- Closes via button + backdrop.

**Placeholder data:** ~8–12 contracts, mix of active and past.

---

### 4.6 Error Log
**Purpose:** log of agent execution errors.

**Wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  Error Log                              [ All ▾ severity ]     │
├──────────────────┬────────────┬────────────┬──────────────┬───┤
│ Timestamp        │ Agent      │ Type       │ Description   │   │
├──────────────────┼────────────┼────────────┼──────────────┼───┤
│ 06-24 14:02:11   │ DataMiner  │ ▮Critical  │ Timeout on…  │ ⋮ │
│ 06-24 13:47:55   │ SupportBot │ ▮Warning   │ Rate limit…  │ ⋮ │
│ 06-24 12:30:02   │ InboxZero  │ ▮Info      │ Retry queued │ ⋮ │
│                                            ┌────────────────┐  │
│                                            │ View detail    │  │
│                                            │ Mark as resolved│ │
│                                            └────────────────┘  │
└──────────────────────────────────────────────────────────────┘
   View detail → modal with full stack trace (monospace, scroll)
```

**Layout:**
- **Data Table** (or list) with columns:
  | Timestamp | Agent Name | Error Type | Description | Actions |
  - **Error Type:** rendered as **color-coded badge** categorized by type/severity:
    - **Critical** → red
    - **Warning** → amber
    - **Info / Minor** → slate/blue
  - **Description:** short one-line summary.
- Optional filter control by severity (client-side).

**Action Dropdown options:**
- **View detail** → **Error Detail Modal** showing the **full error trace** (stack trace / log in a monospace scrollable block).
- **Mark as resolved** → updates the row's visual state (e.g. dims it / adds a "Resolved" badge).

**Error Detail Modal contents:**
- Timestamp, agent, error type badge, full description, **full stack trace** (placeholder multi-line text).
- Closes via button + backdrop.

**Placeholder data:** ~10–15 error entries across severities.

---

## 5. Interaction & State Summary (Vanilla JS responsibilities)

| Behavior | Implementation note |
| --- | --- |
| Section navigation | Show/hide section panels (or hash routing); update active sidebar item + top-bar title |
| Dark mode toggle | Add/remove `dark` class on `<html>`; swap sun/moon icon |
| Mobile sidebar | Toggle off-canvas drawer + backdrop |
| Action dropdowns | Toggle menu; close on outside-click & `Esc`; one open at a time |
| Modals | Open with injected content; close via button, backdrop click, `Esc` |
| Skill list expand | Toggle collapsed content with CSS transition (chevron rotates) |
| Mark as resolved | Mutate row state visually (badge + dimmed) |
| Delete | Remove row from DOM / mock array (optionally with confirm) |
| Filtering/search | Optional simple client-side filtering of table rows |

---

## 5.5 Acceptance Criteria (per interactive behavior)

Each behavior below is **done** only when every listed criterion passes. Written in Given / When / Then form.

### AC-1 — Sidebar Section Navigation
- **Given** the panel is loaded, **When** it first renders, **Then** the Dashboard section is shown by default and its sidebar item is in the active state.
- **When** a user clicks any sidebar item, **Then** only that section's panel becomes visible, all others are hidden, the clicked item shows the active state (accent tint + left border), and the top-bar title updates to match.
- **Then** at most one sidebar item is in the active state at any time.
- **When** the section changes, **Then** the content area scroll position resets to top.

### AC-2 — Dark / Light Mode Toggle
- **Given** the toggle in the top bar, **When** clicked, **Then** the `dark` class is added/removed on `<html>` and every surface, text, border, and badge updates to its themed variant with no unstyled/contrast-broken elements.
- **Then** the toggle icon reflects the current mode (moon in light mode, sun in dark mode) and exposes an `aria-label` describing the action.
- **Then** the chosen mode persists across section navigation within the session.

### AC-3 — Action Dropdown (Kebab Menu)
- **Given** a row's `⋮` button, **When** clicked, **Then** its menu opens anchored to the trigger and `aria-expanded` becomes `true`.
- **When** another kebab is clicked while one is open, **Then** the first closes and only the newly clicked one stays open (max one open at a time).
- **When** the user clicks anywhere outside the open menu, **Then** it closes.
- **When** the user presses `Esc`, **Then** the open menu closes.
- **Then** every menu exposes at least its required options, and destructive options ("Delete") are visually distinct (red).

### AC-4 — Modal Open / Close
- **Given** a "View detail" / "Configure" action, **When** selected, **Then** the backdrop and dialog appear centered, the dialog is populated with that record's data, and focus moves into the dialog.
- **When** the user clicks the `✕` button, **Then** the modal closes.
- **When** the user clicks the backdrop (outside the dialog), **Then** the modal closes.
- **When** the user presses `Esc`, **Then** the modal closes.
- **When** clicking inside the dialog body, **Then** the modal does **not** close.
- **Then** on close, focus returns to the trigger element and the dialog has `role="dialog"` + `aria-modal="true"`.
- **Then** if content overflows, the dialog body scrolls internally rather than the page.

### AC-5 — Agent Skill List Expand / Collapse
- **Given** an agent row, **When** first rendered, **Then** its skill list is collapsed and the chevron points to the closed state.
- **When** the expand control is clicked, **Then** the full skill list reveals with a smooth transition and the chevron rotates.
- **When** clicked again, **Then** the list collapses with the same transition.
- **Then** expanding/collapsing one agent does not affect the expanded state of any other agent.

### AC-6 — Delete Action
- **Given** a "Delete" option, **When** chosen, **Then** the corresponding row/card is removed from the visible list (and the underlying mock array), and the dropdown closes.
- **Then** the remaining rows reflow correctly with no layout gaps.

### AC-7 — Error Log "Mark as Resolved"
- **Given** an unresolved error entry, **When** "Mark as resolved" is chosen, **Then** the row updates to a resolved visual state (dimmed + "Resolved" badge) and the dropdown closes.
- **Then** an already-resolved row no longer offers "Mark as resolved" (or it is disabled).

### AC-8 — Error Severity Badges
- **Given** any error entry, **Then** its type renders as a color-coded badge — Critical=red, Warning=amber, Info/Minor=slate/blue — and the meaning is conveyed by text label, not color alone.

### AC-9 — Contract Detail Itemization
- **Given** a contract's "View detail" modal, **Then** it lists each contracted skill with its individual price and shows a total that equals the row's "Total Paid" value.

### AC-10 — Responsive / Mobile Sidebar
- **Given** a viewport below `md`, **Then** the sidebar is hidden and a hamburger appears in the top bar.
- **When** the hamburger is clicked, **Then** the sidebar slides in as an off-canvas drawer over a backdrop.
- **When** the backdrop or a nav item is clicked, **Then** the drawer closes.
- **Then** all data tables remain readable via horizontal scroll without breaking layout.

### AC-11 — Optional Search / Filter
- **Given** a section with search/filter, **When** the user types or selects a filter, **Then** only matching rows remain visible, **And** clearing the input restores the full list.

---

## 6. Suggested File Structure (when built)

```
/index.html          → app shell (sidebar, top bar, all 6 section panels)
/app.js              → all interaction logic + mock data
                       (Tailwind + config inline via CDN in <head>)
```
> Single-file approach is acceptable given the CDN + vanilla JS constraint. Split `app.js` only if it grows unwieldy. No CSS file is created.

---

## 7. Accessibility Notes
- All icon-only buttons (kebab, toggle, modal close) need `aria-label`.
- Modals: `role="dialog"`, `aria-modal="true"`, focus moved into dialog on open, returned on close.
- Dropdowns: `aria-haspopup="menu"`, `aria-expanded` state.
- Status/error badges: include text, not color alone, to convey meaning.
- Sufficient contrast in both light and dark themes.
