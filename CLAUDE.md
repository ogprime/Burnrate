# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Developer Constraints

- **No local dev environment**: Do not create code or tests that require running commands locally.
- **Prefer web tools**: Do not build custom functions for things (like SVG-to-PNG conversion) when a free web tool already exists.

## Commands

```bash
npm i          # Install dependencies
npm run dev    # Start Vite dev server
npm run build  # Production build
```

No test runner or linter is configured.

## Architecture

This is a React + TypeScript PWA built with Vite. It's a real-time meeting cost calculator with a humorous theme.

### Screen State Machine

`App.tsx` is the single state container and router. It manages all state via React hooks and routes between 4 screens:

1. **setup** → `SetupView` — configure attendees & hourly rate (with "vibe level" presets)
2. **timer** → `TimerView` — live cost display updating via `requestAnimationFrame`
3. **receipt** → `ReceiptView` — final cost summary with share/screenshot capability
4. **history** → `HistoryView` — past meeting logs from localStorage

### Key Data Flows

- **Cost calculation**: `(attendees × hourlyRate) / 3600` per second, updated every animation frame
- **Persistence**: `burn_rate_history` (past receipts) and `burn_rate_active_session` (survives refresh) in localStorage
- **PWA**: Service worker at `public/sw.js`, manifest at `public/manifest.json`
- **Mobile**: Capacitor is installed for potential Android/iOS native wrapping; Wake Lock API prevents screen sleep during active timer; haptic feedback triggers at $100 cost milestones

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (handles PostCSS automatically — no separate postcss config needed)
- Dark theme with neon green primary (`#26D962` / `hsl(142, 70%, 50%)`)
- Custom fire/ember/smoke CSS animations defined in `src/styles/theme.css`
- Path alias: `@/` → `src/`

### UI Components

`src/app/components/ui/` contains 50+ shadcn/ui components (Radix UI wrappers). Add new shadcn components there following the same pattern. Icons come from both Lucide React and Material-UI Icons.

### Token Efficiency & Cost Control

1. #### Reasoning & Planning
- For complex tasks, use `<claude_thinking>` blocks to reason through approach before generating output
- Avoid verbose explanations unless explicitly requested; assume I understand context
- For multi-step problems, outline the plan first, then execute — don't iterate blindly

2. #### Output Control
- **Prefer conciseness:** One-liners and bullet points over prose when appropriate
- **Skip boilerplate:** Don't include docstrings, comments, or explanations in generated code unless the code is confusing or you specifically ask
- **Minimize iterations:** Be clear about requirements upfront to avoid back-and-forth refinement

3. #### Search & Context
- Only use web_search when information is time-sensitive or beyond my knowledge cutoff
- For Spoolio/TensionLab work, assume I know the current codebase state — don't have me re-read files unless explicitly needed
- If working from GitHub, fetch specific files or diffs, not entire repos

3. #### Claude Code CLI
- Structure prompts to get it right the first time (explicit requirements, edge cases, test cases)
- Use `--no-execute` for review before running automated changes
- Keep incremental commits to avoid massive context bloat

4. #### When to Be Verbose
- Physics/math explanations (TensionLab calculations, amp circuits, fishing strategy)
- Security-critical code (auth, payment flows, RLS policies)
- Architecture decisions (database migrations, infrastructure)
