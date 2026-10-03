# Ixigo Flight Automation

End-to-end automation for the Ixigo flights module using Playwright, Cucumber, and TypeScript. The suite is organized around Gherkin features, Cucumber step definitions, page objects, and shared browser hooks.

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

```bash
npm ci
npx playwright install chromium
```

## Run tests

Run the Cucumber suite with the default configuration (up to four workers):

```bash
npm run test:bdd
```

Run Cucumber scenarios in parallel with four workers:

```bash
npm run test:bdd:parallel
```

Run the Cucumber suite in headed mode:

```bash
npm run test:headed
```

Run the standalone Playwright specs in `tests/`:

```bash
npx playwright test
```

The end-to-end scenarios exercise the live Ixigo website, so results can depend on site availability and changes to its UI.

## Reports

Cucumber runs write HTML and JSON reports to `reports/`. The standalone Playwright suite uses the HTML reporter configured in `playwright.config.ts` and writes its report to `playwright-report/`.

## Project layout

- `features/featureDefination/` - Gherkin feature files
- `features/stepDefinitions/` - TypeScript implementations of feature steps
- `pages/` - Playwright page objects
- `hooks/` - Cucumber browser lifecycle and scenario hooks
- `support/` - Shared Cucumber world and test context
- `data/` - Test data
- `tests/` - Standalone Playwright specs
- `specs/` - Additional test specifications
- `config/` - Test configuration
- `Prompts/` - Project and test architecture notes
- `ixigo_report.xlsx` - Flight-module test planning workbook
