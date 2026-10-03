
# Playwright + Cucumber Framework Architecture

## Purpose

This repository uses a BDD-style test framework with Playwright, Cucumber, and TypeScript, organized to keep feature files, step definitions, page objects, hooks, and shared test context separate and easy to find.

---

## Current Project Structure (source of truth)

```text
cucumber.js
package.json
playwright.config.ts
tsconfig.json

features/
  one-way-flight-search.feature

steps/
  one-way-flight-search.steps.ts

hooks/
  hooks.ts

pages/
  FlightSearchPage.ts
  FlightResultsPage.ts

support/
  world.ts

Prompts/
  architecture.md
  project.md
  Report.md

data/
  23a49c116884994beb0f77eac596ab26357f591b.md

reports/
  cucumber-report.html
  cucumber-report.json

playwright-report/
  index.html

specs/
tests/
  seed.spec.ts

test-results/
  <run-specific-folders>
```

---

## Locations & Conventions

- Features: `features/` — place Gherkin `.feature` files here.
- Step definitions: `steps/` — TypeScript step files that implement the feature steps.
- Page objects: `pages/` — Playwright Page Object Model classes (`FlightSearchPage.ts`, `FlightResultsPage.ts`).
- Hooks: `hooks/` — global Cucumber hooks (setup, teardown, screenshots on failure).
- World / support: `support/world.ts` — shared test context (browser, page instances, test data).
- Test utilities / specs: `tests/` and `specs/` for any standalone Playwright or helper tests.
- Reports and artifacts: `playwright-report/`, `test-results/`, and `reports/` (Cucumber outputs).
- Prompts and docs: `Prompts/` — repository documentation used by humans and agents.
- Test data: `data/` — sample payloads, fixtures, or extracted traces.

---

## Recommended Practices

- Keep feature files business-readable and free of implementation details.
- Step definitions should call page object methods and perform assertions; avoid locators in steps.
- Page objects encapsulate Playwright interactions and selectors; prefer small, reusable methods.
- Hooks handle browser/session lifecycle and capture logs/screenshots on failures.
- Use `support/world.ts` to share browser, context, and page object instances between steps.
- Keep environment-specific values in environment variables or CI config (do not hardcode credentials or URLs).

---

## Automation Flow

Feature (.feature) → Steps (`steps/`) → Page Objects (`pages/`) → Playwright actions → Assertions → Reports

---

## Reporting and Artifacts

- Cucumber JSON/HTML: `reports/` (e.g. `cucumber-report.json`, `cucumber-report.html`)
- Playwright HTML trace/report: `playwright-report/`
- Per-run outputs: `test-results/` (contains run-specific folders and `error-context.md`)

---

## AI / Agent Guidelines

1. Inspect `pages/`, `steps/`, and `hooks/` before adding new files.
2. Reuse existing step definitions and page methods where appropriate.
3. Keep generated feature files business-readable and small.
4. Do not place Playwright selectors or implementation in feature files.

---

This file is the canonical architecture reference for the current repository layout and conventions.
