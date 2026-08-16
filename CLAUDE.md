# CLAUDE.md — Figma MCP Integration Rules

Rules for using the Figma MCP server (`get_design_context`, `get_metadata`, `get_screenshot`, `download_assets`, etc.) to turn Figma designs into code in this repo. This is a small Vite + React 19 + Tailwind CSS v4 app (a login/auth flow for "VaultNet Systems"). There is **no token system, no component library, and no Storybook** — every screen is a single hand-written file with inline Tailwind classes and hardcoded values. Read this before generating or editing anything from a Figma design so new code matches the existing (unusual) conventions instead of inventing new ones.

## 1. Token Definitions

**There is no token layer.** No `tailwind.config.*`, no `@theme` block in CSS, no `:root` custom properties for color/spacing/type.

- `src/index.css:1` is just `@import "tailwindcss";` plus a handful of native input-appearance resets (autofill/reveal/spinner buttons). Tailwind v4 is zero-config here (config normally lives via `@theme` in CSS, but this project doesn't define one).
- `vite.config.ts` wires in `@tailwindcss/vite` — no PostCSS config file.
- Every color, font size, radius, and spacing value from Figma is dropped straight into JSX as a Tailwind **arbitrary value**: `text-[#1b1b21]`, `bg-[#0073ff]`, `text-[0.875rem]`, `rounded-[0.625rem]`, `leading-5.25`, `shadow-[0rem_0.625rem_0.46875rem_rgb(0_115_255/0.2)]`.
- Figma px values are hand-converted to `rem` (÷16) inline, e.g. Figma `30px` → `text-[1.875rem]`.

**Consequence — known drift:** the same semantic color already has multiple slightly different hex values across files because each screen was built independently from its own Figma frame:
  - Body/secondary text: `#6b7280` (BrandPanel, ForgotPassword, ResetMail, SetPassword) vs `#6b7380` (login.tsx) — likely unintentional drift, not two real tokens.
  - Heading/primary text: `#1c1c1c` (most files) vs `#1b1b21` (login.tsx headings).
  - Brand blue: `#0073ff` (login button) vs `#1d6ef5` (reset/forgot-password buttons) — these may be a genuinely different Figma variable or another drift instance.

**Rule for new Figma imports:**
1. Before hardcoding a new hex value, `grep -rn "#" src/component` for near-identical existing values (see table above) and reuse the existing one unless the Figma variable is genuinely distinct.
2. Call `get_variable_defs` / `get_design_context` and check whether the node is bound to a Figma variable. If it is, treat that variable name as the source of truth for whether two visually-close colors are meant to be identical.
3. Do not introduce a `tailwind.config`/`@theme` token system unilaterally to "fix" this — if you think the project should move to real tokens (CSS variables in `@theme`, e.g. `--color-ink`, `--color-brand`), propose it to the user first; don't do it as a side effect of one screen's import.
4. Always emit spacing/type/radius as `rem` arbitrary values (not `px`), matching existing style, and prefer reusing an existing arbitrary value already in the codebase over a very close new one (e.g. don't add `leading-5.3` next to existing `leading-5.25`).

## 2. Component Library

**There is no shared component library.** No `components/ui`, no button/input/card primitives, no Storybook, no `.mdx` docs.

- `src/component/` (singular, not `components/`) contains one file per **screen**, not per reusable UI element:
  - `login.tsx` (default export `LoginForm`)
  - `ForgotPassword.tsx`
  - `ResetMail.tsx`
  - `SetPassword.tsx`
  - `BrandPanel.tsx` — the only actually-shared piece: the left-side marketing panel reused across all four auth screens.
- Every button, input, card, badge, etc. is written inline as raw `<div>/<button>/<input>` with Tailwind classes, repeated per-screen with copy-pasted (and slightly drifted) styling rather than extracted into a component.
- Naming is inconsistent: the file is `login.tsx` (lowercase) while everything else is `PascalCase.tsx`; the default export inside it is named `LoginForm`, not `Login` (App.tsx imports it as `Login`).

**Rule for new Figma imports:**
1. When a Figma design reuses a component that already exists in a *previous* screen (e.g. the pill-shaped icon+input field, the primary blue button, the bordered secondary button, the rounded card container), **copy the existing screen's markup/class pattern** rather than re-deriving styling from Figma's raw output, unless Figma shows it has genuinely changed.
2. If asked to build a **new, distinct screen**, add a new file to `src/component/` in PascalCase, default-exporting a component named after the screen, and wire it into the `View` union + conditional render chain in `src/App.tsx:7-46` (this project routes screens via local `useState`, not a router).
3. Do not add a routing library, component library, or Storybook unless the user explicitly asks — this is intentionally a flat, single-state-machine prototype.
4. If the same interactive element (icon-prefixed text input, primary CTA button, back-link button) needs to be built or edited in 3+ places, flag to the user that extracting a shared component (e.g. `TextField`, `PrimaryButton`) would reduce drift — but don't do the extraction unprompted mid-task.

## 3. Frameworks & Libraries

- **React 19.2** (`react`, `react-dom`) with `StrictMode`, function components, hooks only (`useState`) — no class components, no Redux/Zustand/Context providers currently.
- **TypeScript** (`~6.0.2`), strict-ish config: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `jsx: react-jsx` (no need to `import React`). See `tsconfig.app.json`.
- **Vite 8** as build tool/dev server, via `@vitejs/plugin-react` (Babel-based Fast Refresh, not SWC).
- **Tailwind CSS v4** via the first-party `@tailwindcss/vite` plugin (no PostCSS/autoprefixer config file needed).
- **react-icons** (`^5.7.0`) — used for the *only* two non-Figma-asset icons in the app: `MdVisibility`/`MdVisibilityOff` (password show/hide toggle) from `react-icons/md`, in `login.tsx`. Every other icon comes from Figma as an SVG asset (see §5).
- **oxlint** for linting (`npm run lint`), config at `.oxlintrc.json` — plugins `react`, `typescript`, `oxc`; only two rules enabled (`react/rules-of-hooks: error`, `react/only-export-components: warn`). No ESLint, no Prettier config present — don't assume Prettier formatting rules beyond what oxlint enforces.
- No test runner is configured (no Jest/Vitest/Playwright). Don't invent test files unless asked.
- Path aliases: none configured (no `@/*` in `tsconfig.app.json`) — all imports are relative (`../assets/...`, `./BrandPanel`).

## 4. Asset Management

- All Figma-exported assets live under `src/assets/`, **one subfolder per screen/flow**, matching the screen name:
  - `src/assets/login/*.svg`
  - `src/assets/forgot-password/*.svg`
  - `src/assets/reset-mail/*.svg`
  - `src/assets/set-password/*.svg`
  - Shared/global assets sit directly in `src/assets/` (not in a subfolder): `nms_logo.svg`, `sheild.svg` (note: misspelled "shield" — keep the existing filename, don't silently rename it), `stripes.svg`.
- Assets are downloaded straight from Figma's MCP asset endpoint via `curl` into these folders — see `.claude/settings.local.json` for the exact prior pattern, e.g.:
  ```bash
  curl -sL "https://www.figma.com/api/mcp/asset/<uuid>.svg" -o src/assets/<flow-name>/<icon-name>.svg
  ```
- All assets are imported as ES modules and used as `<img src="">` — **no inline SVG components, no SVGR, no `import { ReactComponent }`**:
  ```tsx
  import iconUser from '../assets/login/user.svg'
  // ...
  <img src={iconUser} alt="" className="size-4.5 shrink-0" />
  ```
- Decorative icons always get `alt=""`; only meaningful/branded images get real `alt` text (e.g. `alt="NMS"` on the logo in `BrandPanel.tsx:48`). Preserve this pattern for accessibility.
- No image optimization pipeline, no CDN config, no `public/` usage beyond the default Vite `favicon.svg`. Vite serves everything from `src/assets` through its default asset pipeline (hashed filenames on build) — don't add a separate asset CDN/config unless asked.

**Rule for new Figma imports:** when pulling assets for a new screen "Foo", create `src/assets/foo/` (kebab-case, matching `forgot-password`/`reset-mail`/`set-password` convention) and name files descriptively in kebab-case (`back-arrow.svg`, `check-circle.svg`, `mail-outline.svg`), not by Figma's generated node name/UUID.

## 5. Icon System

- **No dedicated icon system/sprite/registry.** Icons are just SVG files exported per-screen from Figma (see §4) plus two `react-icons` components for the password-visibility toggle.
- Convention when adding a react-icons icon: import only the specific icons needed from the specific sub-package (`react-icons/md`), never a barrel/whole-library import.
- Sizing convention: icons are sized with Tailwind `size-*` utilities matching the adjacent text scale (commonly `size-4`, `size-4.5`, `size-5`, `size-5.5`) — match the existing icon's size in a given context rather than defaulting to a fixed value.
- No naming convention beyond "describe what it visually is" (`arrow-icon.svg`, `back-arrow.svg`, `check-circle.svg`, `lock-icon.svg`, `mail-icon.svg` vs `mail-outline.svg` — two visually distinct mail icons coexist in `reset-mail/`, so check screenshots, don't assume interchangeability).

## 6. Styling Approach

- **Tailwind CSS v4 utility classes inline in JSX** — this is the only styling mechanism. No CSS Modules, no styled-components/emotion, no Sass. `src/index.css` only holds the Tailwind import and native-input pseudo-element resets.
- No responsive breakpoints are used anywhere in the four screens (no `sm:`/`md:`/`lg:` prefixes found) — layouts are fixed/desktop-oriented using flexbox (`flex`, `flex-2`, `flex-3`, `min-h-dvh`, `w-dvw`) rather than a mobile-first responsive system. **Do not assume responsive variants exist** — if a Figma design includes a mobile breakpoint, that would be new territory for this codebase; flag it rather than silently bolting on `sm:`/`md:` classes that nothing else uses.
- Layout pattern for every auth screen: a two-pane flex row — `BrandPanel` (`flex-3`) on the left, a centered form/content pane (`flex-2`) on the right, e.g. `src/component/login.tsx:17-20`.
- Values are consistently expressed as rem via arbitrary values rather than Tailwind's default scale, because the Figma frame's exact px values rarely land on Tailwind's default spacing/type scale. Follow the same conversion approach (`px / 16 = rem`) for new values instead of rounding to the nearest default Tailwind class.
- No dark mode / theming support (no `dark:` variants, no theme toggle).
- Class ordering is not enforced by tooling (no `prettier-plugin-tailwindcss` configured) — match the loose ordering already used in sibling components (layout → sizing → spacing → color/border → typography) rather than imposing a stricter order.

## 7. Project Structure

```
greenPower/
├── src/
│   ├── assets/                 # Figma-exported SVGs, grouped per screen/flow
│   │   ├── login/
│   │   ├── forgot-password/
│   │   ├── reset-mail/
│   │   ├── set-password/
│   │   └── *.svg               # shared assets (logo, shield, stripes)
│   ├── component/               # one file per SCREEN (not per UI primitive)
│   │   ├── BrandPanel.tsx       # shared left-side marketing panel
│   │   ├── login.tsx            # exports `LoginForm`
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetMail.tsx
│   │   └── SetPassword.tsx
│   ├── App.tsx                  # local `useState<View>` state machine, no router
│   ├── main.tsx                 # ReactDOM root + StrictMode
│   └── index.css                # Tailwind import + input pseudo-element resets
├── public/favicon.svg
├── vite.config.ts               # react() + tailwindcss() plugins only
├── tsconfig*.json
└── .oxlintrc.json
```

- **Feature organization = one file per auth-flow screen**, imported and switched between in `App.tsx` via a hand-rolled state machine (`type View = "login" | "forgot-password" | "reset-mail" | "set-password"`, `src/App.tsx:7`). There is no file-based routing, no `pages/` directory, no React Router.
- When Figma adds a new screen to this flow, follow the existing pattern exactly: new `src/component/<ScreenName>.tsx`, new `src/assets/<screen-name>/` folder, new entry added to the `View` union and to the if-chain in `App.tsx`, callback props (`onBack`, `onResetPassword`, etc.) passed down the same way sibling screens do it.

## Summary — when implementing a new Figma design here

1. `get_metadata`/`get_screenshot` the frame, then `get_design_context` for structure + variables.
2. Reuse `BrandPanel` unmodified if the frame is another auth screen with the same left panel.
3. Reuse existing hex/rem values from sibling files (§1) before inventing new arbitrary values; only introduce a new value if Figma's variable is genuinely different.
4. Download new icons into a matching kebab-case folder under `src/assets/` (§4), import as `<img>`, never inline SVG/SVGR.
5. Write the new screen as a single flat component file in `src/component/`, PascalCase, wired into `App.tsx`'s `View` union — don't add routing, state libraries, or a component-library abstraction unless the user asks.
6. Run `npm run lint` (oxlint) and `npm run build` (`tsc -b && vite build`) before calling the work done — there is no test suite to run.
