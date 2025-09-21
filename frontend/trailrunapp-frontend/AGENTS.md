# How to work (for AI agents)
- Work ONLY on `origin` (YasuyoshiWada/minamieru). NEVER push to `upstream`.
- Active development branch: feature/frontend-int-v2
- `main` branches (origin/main, upstream/main) are protected; AI MUST NOT target them.

# Commands
- install: pnpm install
- typecheck: pnpm typecheck
- lint: pnpm lint
- test: pnpm test
- build: pnpm build

# Rules
- TypeScript strict / noImplicitAny = true.
- MUI: use `sx` prop for styling, not className.
- For `<IconButton>`, always set `component` or `type="button"` to avoid form mis-submit.
- Add/update unit tests whenever logic is changed.
- Accessibility (a11y) must be checked (role, aria-*).

# Output
- Create PRs from `origin/feature/frontend-int-v2` to `upstream/feature/frontend-int-v2` (draft OK).
- Do NOT create PRs to any `main` branch.
- Include summary (motivation, changes, tests, risks) and ensure CI passes.
