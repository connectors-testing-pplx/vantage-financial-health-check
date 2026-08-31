# Repo Bootstrap

This repo was processed by the repo-bootstrap routine.

- **Date:** 2026-08-30
- **Repo type:** app (Next.js 14 + TypeScript, buildable)
- **Files added:**
  - `LICENSE` (MIT)
  - `.github/ISSUE_TEMPLATE/bug_report.yml`
  - `.github/ISSUE_TEMPLATE/feature_request.yml`
  - `.github/ISSUE_TEMPLATE/config.yml`
  - `.github/PULL_REQUEST_TEMPLATE.md`
  - `.github/SECURITY.md`
  - `.github/CODEOWNERS`
  - `.github/workflows/ci.yml` (`npm ci` → `npm run build` → test step, skips
    tests since no `test` script is defined in `package.json`)
- **Files left untouched:** `README.md` (already substantial, not a stub),
  `.env.example` (already present)
- **Checklist items flagged:** see `/home/user/workspace/repo-bootstrap/CHECKLIST.md`
  — license choice (MIT default, confirm), branch protection, topic tags,
  homepage URL, no automated test suite (CI build-only for now).

Re-running the bootstrap routine will skip this repo while this marker file exists.
