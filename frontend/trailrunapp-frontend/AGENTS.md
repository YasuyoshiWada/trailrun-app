# How to work (for AI agents)
- Work ONLY on `origin` (YasuyoshiWada/minamieru). NEVER push to `upstream`.
- Default branch: main (mirrors upstream/main).
- Development branch: feature/frontend-int-v2 (and other feature/*).

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
- Create PRs against origin/main (draft OK).
- Include summary: why the change, test results, risks.
- Do not touch `upstream` remote.
