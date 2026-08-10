---
name: UI/UX Designer
description: A skill to act as the Graphic Designer for the static menu and portfolio, enforcing strict adherence to the brand's visual identity, color palette, typography, and component styling. Reference source: `docs/06_Interfaz_Grafica/README.md`.
---

# UI/UX Designer Skill — App Canela Canela Elaborados

This skill provides all design tokens, principles, and guidelines to design, update, or style any component or page. When acting under this skill, enforce **absolute brand consistency** with the decisions documented in `docs/06_Interfaz_Grafica/` (the canonical reference).

> **REGLA OBLIGATORIA (AGENTS.md):** Todas las tablas deben tener columnas ordenables (asc/desc) haciendo clic en sus cabeceras.

---

## Brand Principles

| Attribute | Value |
|---|---|
| **Personality** | Professional, Sophisticated, Authoritative |
| **Aesthetic** | Corporate / Modern with Minimalist influences |
| **Goal** | High clarity and information density without sacrificing elegance |
| **Emotional response** | Calm efficiency (*eficiencia tranquila*) |
| **Context** | Commercial menu, professional portfolio, static frontend |

---

## Color Palette — 12 Tokens (Updated 2026-07-17)

### Primary (Rose Family)
| Token | Value | Name | Use |
|---|---|---|---|
| `--color-primary` | `#931c47` | Crimson Rose | CTAs, active nav, brand moments |
| `--color-primary-container` | `#ad1c4b` | Deep Rose | Hover states, active borders, error |
| `--color-primary-fixed` | `#fcdbb8` | Peach Blush | Selected rows, chips, highlights |

### Secondary (Mauve Family)
| Token | Value | Name | Use |
|---|---|---|---|
| `--color-secondary` | `#a07fa5` | Muted Mauve | Secondary interactive elements |
| `--color-secondary-fixed` | `#caa6ce` | Soft Lavender | Secondary badge backgrounds |

### Tertiary (Blue Family)
| Token | Value | Name | Use |
|---|---|---|---|
| `--color-tertiary` | `#38559e` | Royal Blue | Info, links, action icons |
| `--color-tertiary-container` | `#476cb5` | Cornflower Blue | Tertiary hover, info chip BG |

### Organic Accent
| Token | Value | Name | Use |
|---|---|---|---|
| `--color-organic` | `#424d30` | Olive Dark | Category tags |
| `--color-organic-fixed` | `#e8ead3` | Olive Light | Tag backgrounds |

### Surfaces and Backgrounds
| Token | Value | Name | Use |
|---|---|---|---|
| `--bg-app` | `#f4f0ed` | Pale Cream | App background |
| `--bg-surface` | `#ffffff` | White | Cards, panels |
| `--bg-surface-variant` | `#ede4da` | Warm Linen | Inputs, thead, topnav, collapsed sidebar |
| `--bg-sidebar` | `#1d1d1b` | Near Black | Expanded sidebar |

### Text
| Token | Value | Use |
|---|---|---|
| `--text-primary` | `#1d1d1b` | Main text |
| `--text-muted` | `rgba(29,29,27,0.60)` | Secondary text, placeholders |
| `--text-on-dark` | `#ffffff` | Text on dark backgrounds |
| `--text-on-primary` | `#ffffff` | Text on Crimson Rose |

### Status Colors
| State | Text | Background |
|---|---|---|
| **Success** | `#065F46` | `#ECFDF5` |
| **Warning** | `#a69b03` (Chartreuse Gold) | `#f9f6dc` |
| **Error** | `#ad1c4b` (Deep Rose) | `#fce8ef` |
| **Info** | `#38559e` (Royal Blue) | `#eaeffa` |
| **Tag/Category** | `#424d30` (Olive Dark) | `#e8ead3` |

### Borders
| Token | Value | Use |
|---|---|---|
| `--border-subtle` | `#ede4da` | Cards, separators, resting inputs |
| `--border-primary` | `#931c47` | Input focus (2px), active border |
| `--border-error` | `#ad1c4b` | Invalid input border |

---

## Typography (Updated 2026-07-17)

**Rule:** `Montserrat` is the ONLY font for all text (headers, body, labels). `JetBrains Mono` is ONLY for numeric/tabular data.

### Font Import (HTML head)
`html
<link rel=preconnect href=https://fonts.googleapis.com>
<link rel=preconnect href=https://fonts.gstatic.com crossorigin>
<link href=https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap rel=stylesheet>
`

### CSS Import (alternative)
`css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@400;500&display=swap');
body { font-family: Montserrat, sans-serif; font-optical-sizing: auto; }
`

### Type Scale
| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| display-lg | 40px | 800 | -0.02em | Page/section hero titles |
| headline-lg | 32px | 700 | -0.01em | Main page titles |
| headline-md | 24px | 700 | normal | Card and modal titles |
| headline-sm | 18px | 600 | 0.01em | Section subtitles |
| body-lg | 16px | 400 | normal | Standard body text |
| body-md | 14px | 400 | normal | Forms, dense body |
| body-sm | 13px | 400 | normal | Support text, tooltips |
| label-caps | 12px | 600 | 0.05em | Table headers, tabs (UPPERCASE) |
| mono-data | 13px JetBrains Mono | 500 | normal | ALL numeric table data |

> **Critical rule:** ALL numeric columns MUST use JetBrains Mono, right-aligned, tabular-nums.

---

## Border Radius — Soft & Elegant (Updated 2026-07-18)

**RULE: The application uses soft rounded corners to provide a modern, premium, and organic feel.**
- Large containers, modals, and main cards: `rounded-xl` (12px)
- Internal elements, inputs, buttons, badges, dropdown items: `rounded-lg` (8px)
- Small accents (checkboxes): `rounded` (4px)

```css
.card, .modal { border-radius: 12px; }
.btn, .input, .badge { border-radius: 8px; }
```

---

## Layout and Spacing

### Spacing (8px base unit)
`--space-1: 8px` | `--space-2: 16px` | `--space-3: 24px` | `--space-4: 32px` | `--space-6: 48px`

### Elevation
| Level | Component | BG | Border | Shadow |
|---|---|---|---|---|
| 0 Base | App BG | `#f4f0ed` | — | — |
| 1 Surface | Cards | `#ffffff` | 1px `#ede4da` | `0 2px 4px rgba(0,0,0,0.02)` |
| 2 Overlay | Modals | `#ffffff` | 1px `#ede4da` | `0 12px 24px rgba(0,0,0,0.08)` + blur(8px) |

---

## Navigation — Single Sidebar Layout (Updated 2026-07-18)

The application uses exclusively a **Sidebar navigation** layout. There is NO top horizontal menu.

### Sidebar Expanded (default)
- Width: 260px | BG: `#1d1d1b` (Near Black)
- Item text: `rgba(255,255,255,0.75)`
- Active item BG: `rgba(147,28,71,0.60)` (Crimson Rose 60%)
- Hover item BG: `rgba(255,255,255,0.08)`
- Item corners: `rounded-r-lg` (on the active state side)

### Sidebar Collapsed
- Width: 64px (icon only)
- Active item indicator: tooltip or distinct icon color.

---

## Buttons (Updated 2026-07-17)

All buttons: border-radius 8px (`rounded-lg`), font: Montserrat 600 14px.

**Primary:** BG `#1d1d1b`, text white. Hover: `#333333`. Active: `#000000`.
**Secondary:** BG white, border `#ede4da`, text `#931c47`. Hover: border `#931c47`, BG `#f4f0ed`.
**Ghost/Icon (table actions):** Transparent, icon `rgba(29,29,27,0.55)`. Hover: BG `rgba(29,29,27,0.08)`.
**Danger (delete):** icon `#ad1c4b`. Hover: BG `#fce8ef`.

```css
.btn { padding: 8px 16px; font-family: 'Montserrat', sans-serif;
       font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer;
       transition: background 0.15s ease; }
.btn-sm { padding: 4px 10px; font-size: 13px; }
.btn-lg { padding: 10px 24px; font-size: 16px; }
```

---

## Inputs and Forms (Updated 2026-07-17)

| State | Border | Background |
|---|---|---|
| Rest | `1px solid #ede4da` | `#ffffff` |
| Hover | `1px solid rgba(147,28,71,0.50)` | `#ffffff` |
| Focus | `2px solid #931c47` | `#ffffff` |
| Invalid | `1px solid #ad1c4b` | `#fce8ef` |
| Valid | `1px solid #065F46` | `#ECFDF5` |
| Disabled | `1px solid #ede4da` | `#f5f5f5` |

**Affordance Rule:** ALL editable fields (inputs, textareas, selects) must clearly indicate they are interactive. Do NOT style them as plain text. Always use a subtle border (`border-border-subtle`), rounded corners (`rounded-md`), and a subtle background (like `bg-black/[0.03]`).
**Placeholders & Helper Text:** Ensure high contrast. Use `#737373` for placeholders. For colored helper text (like error/warning reds), use bold fonts and darker shades (`#7A153A`) to maintain legibility.

Form groups: label left / input right (grid `fit-content(160px) 1fr`), gap 16px/12px.

---

## Module Cards (Form/Settings Containers) (Updated 2026-07-27)

For main content modules (like settings, form sections, or tool configuration panels), use this strict structural pattern to ensure aesthetic consistency:

### 1. Main Container
Use a defined surface container with large rounded corners and a subtle shadow:
```html
<div className="bg-surface-container p-6 rounded-2xl border border-border-subtle flex flex-col gap-5 shadow-xs">
  ...
</div>
```

### 2. Module Header
Headers must be uppercase, bordered at the bottom, and include a primary-colored icon:
```html
<h4 className="text-[15px] font-bold text-on-surface uppercase border-b border-border-subtle pb-3 flex items-center gap-2">
  <Icon size={18} className="text-primary" /> Título del Módulo
</h4>
```

### 3. Info / Alert Boxes
If the module needs explanatory text at the top:
```html
<div className="bg-surface-container-low p-4 rounded-xl border border-primary/20 flex items-start gap-3">
  <Info size={18} className="text-primary shrink-0 mt-0.5" />
  <p className="text-xs text-on-surface-variant leading-relaxed">Explicación...</p>
</div>
```

### 4. Input Fields in Modules
Inputs should be large and tactile (`rounded-xl` instead of `rounded-lg` for prominent forms):
```html
<div className="flex flex-col gap-1.5">
  <label className="text-[11px] font-bold text-on-surface-variant uppercase">Etiqueta del Campo</label>
  <input className="w-full p-3 text-[14px] border border-border-subtle rounded-xl bg-surface text-on-surface outline-none focus:border-primary transition-all shadow-2xs" />
</div>
```

### 5. Section Sub-headers (Internal Dividers)
For grouping fields inside the module:
```html
<h5 className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1.5 border-b border-border-subtle pb-1 mb-2 mt-2">
  <Icon size={14} /> Título de Sub-sección
</h5>
```

---

## Data Tables (Updated 2026-07-17)

Technology: native `<table>` + `useSortableData` hook (`src/hooks/useSortableData.ts`).

### Key CSS Tokens
`css
--table-header-bg:       #ede4da;               /* Warm Linen */
--table-row-hover-bg:    rgba(147,28,71,0.06);  /* Crimson Rose 6% */
--table-row-selected-bg: #fcdbb8;               /* Peach Blush */
--table-border:          #ede4da;               /* Warm Linen */
--table-row-height:      44px;
--table-sort-icon-default: rgba(29,29,27,0.30);
--table-sort-icon-active:  #931c47;             /* Crimson Rose */
`

### Sort Icons — ALWAYS visible
| State | Icon | Color |
|---|---|---|
| No sort | ⇅ | `rgba(29,29,27,0.30)` — visible but muted |
| Ascending | ↑ | `#931c47` — Crimson Rose |
| Descending | ↓ | `#931c47` — Crimson Rose |

`	sx
const getSortIcon = (key: string): string => {
  if (!sortConfig || sortConfig.key !== key) return '⇅';
  return sortConfig.direction === 'asc' ? '↑' : '↓';
};
`

### Rules
- **Zebra-striping:** Implement subtle zebra striping (e.g. alternating rows with `bg-black/[0.015]`) and hover effects on entire rows (e.g. `hover:bg-black/[0.04]`) to improve horizontal reading.
- Column 1: checkbox 44px wide (`seleccionar todo` in header).
- Last column: ghost action buttons — ALWAYS visible (not hover-only).
- Numeric cells: JetBrains Mono, right-aligned, `tabular-nums`.
- `tfoot`: BG `#ede4da` + 2px `#1d1d1b` top border + JetBrains Mono bold.
- Row height: 44px data | 40px header | 40px footer.

---

## Badges and Status Chips

All badges are RECTANGULAR (border-radius: 0).

`css
.badge { display: inline-flex; padding: 2px 10px; border-radius: 0;
         font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; }
.badge-success { color: #065F46; background: #ECFDF5; }
.badge-warning { color: #a69b03; background: #f9f6dc; }
.badge-error   { color: #ad1c4b; background: #fce8ef; }
.badge-info    { color: #38559e; background: #eaeffa; }
.badge-tag     { color: #424d30; background: #e8ead3; }
.badge-neutral { color: #1d1d1b; background: #ede4da; }
`

---

## Modals and Dialogs

Sizes: sm 420px | md 640px | lg 900px | fs 100vw/100vh.
Structure for small/medium: fixed header + scrollable body + fixed footer.
Footer standard: **Cancelar** (secondary) + **Guardar** (primary).

### Fullscreen Complex Forms (Odoo Style Layout)
For highly complex forms like "Recipe Editing", use a full 100% width layout divided into two columns:
1. **Left Column (`flex-1`)**: Main workspace. Key identification fields (Name, Type) are persistently visible at the top. Tabs are used *only* for dividing lower workspace sections (e.g., Composition vs Procedure).
2. **Right Column (`w-[400px] shrink-0`)**: Contextual/Performance panel fixed to the right side, so the user can see live metric updates (Yield, Total Weight) while scrolling through the left side.

## Unified Combobox Search
When a user needs to pick an item from a huge list (e.g., Ingredients) inside a table:
- **DO NOT USE NATIVE `<select>`**.
- **DO USE an intelligent Combobox (InlineSearch)**: Acts as a text input that filters a custom dropdown menu.
- **Auto-flipping**: The dropdown must calculate available screen space and flip upwards (`bottom-full`) if it would be cut off by the bottom of the screen.

---

## Key Behavioral Rules

1. Sort icon ⇅ ALWAYS visible in all sortable headers (gray at rest, Crimson Rose active).
2. All tables sortable — every column, asc/desc on click. Cycle: none→asc→desc→none.
3. Default sort: A→Z by name. Exception: orders table → ascending delivery date.
4. Dropdowns and lists: sorted A→Z by default.
5. Numeric data: Always JetBrains Mono, right-aligned.
6. Unified Search: Use searchable comboboxes instead of native `<select>` for large lists.
7. Rounded Corners: Use `rounded-xl` for main panels and `rounded-lg` for interactive elements.
8. No plain #000000 or plain #ffffff outside defined contexts — use semantic tokens.
9. Ghost action buttons in tables: ALWAYS visible, not hidden behind hover.
10. Atomic UI panels: Do NOT build global panels with conditional sub-sections.
11. Complex Forms: Use the Odoo 2-column layout (main left, summary right) for full-page screens.

---

## Responsive & Mobile-First Directives (33 Core Rules)

Canonical reference: `docs/06_Interfaz_Grafica/08_Reglas_Responsive_y_Mobile_First.md`.

1. **Mobile-First Always**: Write base Tailwind classes for mobile. Use `sm:`, `md:`, `lg:`, `xl:`, `2xl:` ONLY to scale upwards.
2. **Meta Viewport**: Ensure `maximum-scale=5.0` in `index.html`. Never use `user-scalable=no`.
3. **Safe Areas**: Use `pt-safe`, `pb-safe`, `env(safe-area-inset-top/bottom)` for mobile notches and gesture bars.
4. **No Horizontal Scroll Leak**: Wrap root layout in `overflow-x-hidden`.
5. **No Hardcoded Absolute Dimensions**: Avoid fixed pixels for layouts; use `%`, fractions, or `vw`/`vh`.
6. **Adaptive Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` for card collections.
7. **Dynamic Flex Flow**: Shift direction per screen (`flex-col md:flex-row`).
8. **Max-Width Containers**: Enforce limits (`container mx-auto` or `max-w-screen-2xl`).
9. **Conditional Display**: Toggle controls via `hidden md:block` / `block md:hidden` (e.g. `Sidebar.tsx` drawer).
10. **Tiered Spacing**: Scale padding/margins (`p-4 md:p-8 lg:p-12`).
11. **Visual Order Alteration**: Reorder DOM visually using `order-last md:order-none`.
12. **Fluid Typography**: Scale fonts using responsive classes (`text-base md:text-lg lg:text-xl`).
13. **Text Overflow Protection**: Prevent layout breakage using `truncate`, `line-clamp-2`, or `break-words`.
14. **Contained Images**: Always style `<img>` with `w-full h-auto object-cover/contain`.
15. **Scalable Icons**: Use font-relative dimensions or Tailwind classes (`w-5 h-5`, `w-6 h-6`).
16. **Aspect Ratios**: Maintain proportions with `aspect-video` or `aspect-square`.
17. **Minimum Touch Targets**: Guarantee `44x44px` touch target areas on mobile (`min-h-[44px] min-w-[44px]`).
18. **Controlled Hover Effects**: Wrap hover styles under `@media (hover: hover)` or Tailwind `hover:` to avoid sticky touch states.
19. **Keyboard-Friendly Forms**: Apply `scroll-margin` (`scroll-m-20`) so virtual keyboards don't hide active inputs.
20. **No Native Mobile Tooltips**: Replace hover tooltips with static helper text or tap modals.
21. **Natural Gestures**: Support swipe gestures in mobile carousels/galleries.
22. **Unmount Heavy Components**: Use React responsive hooks (`useMediaQuery`) to unmount heavy charts/tables on mobile instead of hiding with CSS.
23. **Dense Data Tables with Frozen Column**: Wrap dense tables in `overflow-x-auto` and keep column 1 fixed with `sticky left-0 bg-surface z-10`.
24. **Adaptive Modals (`ModalShell`)**: Modals expand to full screen or Bottom Sheets on mobile (`< sm`).
25. **Sticky Action Bars**: Anchor primary CTAs ("Save", "Confirm") to the bottom (`sticky bottom-0 bg-surface z-20`) on mobile.
26. **Native Input Types**: Set `type="email"`, `type="tel"`, `type="number"`, `inputMode="decimal"` for virtual keyboards.
27. **Motion Reduced Motion Support**: Respect system `prefers-reduced-motion`.
31. **Odoo 2-Column Forms in Mobile (`RecipeFormModal`)**: Collapse right summary panel below the form (`flex-col lg:flex-row`) or into a sticky bottom summary.
32. **Anti-Keyboard Comboboxes (`InlineSearch`)**: Open inline search dropdowns as mini-bottom sheets on small screens.
33. **Print Isolation (`FichaTecnicaPrinter.tsx`)**: Fluid on screen, but force fixed A4 (`print:w-[210mm]`), hide nav (`print:hidden`), and prevent page breaks (`print:break-inside-avoid`) on `@media print`.

---

## Strict Zero-Animations Rule (Updated 2026-07-28)

**CRITICAL RULE:** The application must have **NO STRUCTURAL OR LAYOUT ANIMATIONS**. 
This is a direct instruction to ensure maximum application snappiness.
1. **NO Framer Motion:** Do not use `motion/react`, `<motion.div>`, or `<AnimatePresence>`. Modals, panels, and sidebars must appear and disappear instantly.
2. **NO Tailwind Layout Animations:** Do not use `animate-in`, `fade-in`, `slide-in-from-*`, or `animate-fade-in`.
3. **Allowed Animations (Only for State):** 
   - `animate-spin` is allowed ONLY for loading spinners (e.g., `<Loader2>`).
   - `animate-pulse` is allowed ONLY for skeleton loading placeholders.
   - CSS hover transitions (e.g., `transition-colors`, `transition-all`, `duration-200`) are allowed ONLY for interactive element feedback (like buttons changing color on hover).

---

## Reference Files

| Resource | Description |
|---|---|
| `docs/06_Interfaz_Grafica/` | **Canonical source** — full tokens, CSS, all design decisions |
| `docs/06_Interfaz_Grafica/08_Reglas_Responsive_y_Mobile_First.md` | **Responsive & Mobile-First Canonical Rules** |
| `src/hooks/useSortableData.ts` | Sorting hook used in all data tables |
| `src/components/` | Live component implementations |
| `docs/02_Manual_Tecnico/04_Componentes_Comunes.md` | Reusable component catalog |
