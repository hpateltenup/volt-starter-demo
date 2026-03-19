# Volt Starter Template

A production-ready Vue 3 starter template that integrates **PrimeVue (Volt)** unstyled components with **Tailwind CSS v4**, offering a rich library of pre-built UI components, multi-brand theming, dark mode support, and a live style guide — all wired up and ready to use.

---

## What Is This Project?

This template gives you a solid foundation for building modern web applications using:

- **Vue 3** with Composition API and `<script setup>`
- **PrimeVue v4 (Volt)** — unstyled headless components wrapped with Tailwind utility classes
- **Tailwind CSS v4** — utility-first CSS with `tailwindcss-primeui` token integration
- **Pinia** — Vue's official state management
- **Vue Router v4** — client-side routing
- **TypeScript** — full type safety across the entire project

The `src/components/volt/` folder contains 70+ ready-made component wrappers (Button, DataTable, Dialog, DatePicker, etc.) that bridge PrimeVue's headless API with Tailwind styling. You get fully functional, accessible components without writing them from scratch.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Vue | ^3.5 | UI framework |
| PrimeVue | ^4.5 | Headless component library (Volt) |
| Tailwind CSS | ^4.2 | Utility-first CSS |
| Pinia | ^3.0 | State management |
| Vue Router | ^4.6 | Client-side routing |
| Vite | ^7.3 | Build tool & dev server |
| TypeScript | ~5.9 | Type safety |
| PrimeIcons | ^7.0 | Icon set |

---

## Directory Structure

```
volt-starter-template/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── base.css           # Base CSS reset and Tailwind imports
│   ├── components/
│   │   └── volt/                  # 70+ PrimeVue component wrappers
│   │       ├── Button.vue         # Primary button (wraps PrimeVue Button)
│   │       ├── DangerButton.vue   # Danger-severity shorthand
│   │       ├── SecondaryButton.vue
│   │       ├── ContrastButton.vue
│   │       ├── Card.vue
│   │       ├── DataTable.vue
│   │       ├── Dialog.vue
│   │       ├── Select.vue
│   │       ├── InputText.vue
│   │       ├── DatePicker.vue
│   │       ├── Toast.vue
│   │       ├── Stepper.vue
│   │       ├── Tabs.vue
│   │       ├── Tree.vue
│   │       ├── utils.ts           # Shared Volt utility helpers
│   │       └── ...                # and 55+ more components
│   ├── layouts/
│   │   ├── ApplicationLayout.vue  # App shell: top nav, brand/theme switcher
│   │   └── GeneralLayout.vue      # Minimal content wrapper
│   ├── pages/
│   │   ├── HomePage.vue           # Landing page with PrimeBlocks demos
│   │   └── StyleGuide.vue         # Live component style guide
│   ├── router/
│   │   └── index.ts               # Route definitions (/, /style-guide)
│   ├── stores/
│   │   └── counter.ts             # Example Pinia store
│   ├── App.vue                    # Root component
│   ├── main.ts                    # App entry point
│   └── styles.css                 # Global styles + brand theme CSS variables
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
└── .prettierrc.json
```

---

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0`
- **npm** (comes with Node.js)

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Start the development server

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### 3. Other commands

```sh
# Type-check, compile and minify for production
npm run build

# Preview the production build locally
npm run preview

# Format source files with Prettier
npm run format
```

---

## What You Will See After Running

Once the dev server is running, open your browser to `http://localhost:5173`.

### Home Page (`/`)

The landing page showcases real-world UI patterns built with **PrimeBlocks** and **Volt components**:

- **Hero section** — full-page gradient hero with call-to-action buttons
- **Navigation bar** — responsive top nav with mobile hamburger menu
- **Brand & theme switcher** — a `Select` dropdown to switch between **Default**, **Jio** (blue), and **Vodafone** (red) brand themes in real time
- **Dark/Light mode toggle** — switches the entire UI to dark mode; preference is persisted in `localStorage`
- **Movie information card** — a structured detail card using `Chip`, `Button`, and layout primitives
- **Analytics dashboard block** — stat cards (Messages, Check-ins, Files Synced, Users Online) with colored icon tiles
- **Pricing plans** — three-tier pricing table (Basic / Premium / Enterprise)
- **Advanced Card** — a PrimeVue `Card` component with header image, subtitle, and action footer

### Style Guide (`/style-guide`)

Navigate to `http://localhost:5173/style-guide` to see an interactive component reference:

- **Sticky sidebar navigation** — jump-links to each section
- **Buttons section** — all button variants side by side:
  - Primary, Outlined, Text, Raised, Secondary, Contrast, Danger
  - Button with icon, Loading state, Disabled state
  - Full props reference table (label, icon, iconPos, severity, variant, size, loading, disabled, badge, type)
- **Form controls section** — `Select` dropdown wired to theme tokens

---

## Theming System

The template ships with three brand themes defined in [`src/styles.css`](src/styles.css):

| Theme | CSS Class | Primary Color |
|---|---|---|
| Default | *(none)* | Indigo / Purple |
| Jio | `p-theme-jio` | Blue (`#3b82f6`) |
| Vodafone | `p-theme-vodafone` | Red (`#ef4444`) |

Themes are toggled by adding/removing CSS classes on `<html>`. The selected brand and dark/light preference are both saved to `localStorage` so they persist across page reloads.

To add your own brand theme, add a new `:root.p-theme-<name>` block to `src/styles.css` overriding the `--p-primary-*` CSS variables, then register the option in `src/layouts/ApplicationLayout.vue`.

---

## Key Things to Check

After the app loads, verify the following work correctly:

- [ ] Dev server starts without TypeScript or build errors
- [ ] Home page renders the hero, nav, and PrimeBlocks sections
- [ ] Brand dropdown switches primary colors instantly (Default → Jio → Vodafone)
- [ ] Dark/Light toggle flips the entire UI and persists on refresh
- [ ] `/style-guide` route loads and all button variants render
- [ ] Sticky sidebar in Style Guide scrolls smoothly to each section
- [ ] All icons (`pi pi-*`) render correctly from PrimeIcons

---

## IDE Setup

- **VS Code** with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur if installed)
- Recommended extensions are listed in [`.vscode/extensions.json`](.vscode/extensions.json)

### Browser DevTools

- Chrome/Edge: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) + [enable Custom Object Formatters](http://bit.ly/object-formatters)
- Firefox: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) + [enable Custom Object Formatters](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

---

## Further Reading

- [PrimeVue Volt docs](https://primevue.org/volt/)
- [PrimeBlocks free components](https://primeblocks.org/free)
- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [Vite configuration reference](https://vite.dev/config/)
- [Vue 3 docs](https://vuejs.org/)
