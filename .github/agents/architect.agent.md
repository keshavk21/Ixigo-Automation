You need to refactor the code in the following format


# Playwright + Cucumber Framework Architecture

## Purpose

This project follows a lightweight BDD automation framework using:

- Playwright
- Cucumber
- TypeScript
- Page Object Model (POM)

All developers and AI agents must follow this structure.

---

# Project Structure

```text
ixigo
│
├── features                # Gherkin feature files
├── hooks                   # Before/After hooks
├── pages                   # Page Objects
├── Prompts                 # Agent prompts and documentation
├── features
│   └── featureDefination   # Feature files and step definitions
├── support
│   └── world.ts            # Shared test context
├── tests                   # Utility or isolated tests
│
├── .env
├── cucumber.js
├── playwright.config.ts
└── tsconfig.json
```

---

# Automation Flow

```text
Feature File
      ↓
Step Definition
      ↓
Page Object
      ↓
Playwright Actions
      ↓
Validation
      ↓
Report
```

---

# Feature File Rules

Location:

```text
features/
```

Example:

```gherkin
@login

Feature: Login

  Scenario: Successful login

    Given the user is on login page
    When the user logs in with valid credentials
    Then the home page should be displayed
```

### Rules

- Business readable language only
- Follow Given → When → Then
- One scenario = One business behavior
- Use Scenario Outline for data-driven tests
- No Playwright code in feature files

---

# Step Definition Rules

Location:

```text
features/featureDefination/
```

Example:

```ts
Given(
  "the user is on login page",
  async function () {
    await loginPage.navigate();
  }
);
```

### Rules

✅ Call page methods

✅ Perform assertions

✅ Read test data

❌ No locators

❌ No long Playwright logic

❌ No business implementation

---

# Page Object Rules

Location:

```text
pages/
```

Example:

```ts
export class LoginPage {

  async login(
    username: string,
    password: string
  ) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

}
```

### Rules

- Keep all UI interactions here
- Reusable methods only
- One page = One page object
- Avoid assertions unless validating page state

---

# Hooks Rules

Location:

```text
hooks/
```

Responsibilities:

- Browser setup
- Context setup
- Page initialization
- Screenshot on failure
- Cleanup

Example:

```ts
Before(async function () {
  // Browser launch
});

After(async function () {
  // Cleanup
});
```

---

# World Context

Location:

```text
support/world.ts
```

Purpose:

- Share page
- Share browser context
- Share test data
- Share page objects

Keep common test state here.

---

# Environment Variables

Store all configurable values in:

```env
BASE_URL=
USERNAME=
PASSWORD=
HEADLESS=
```

Access using:

```ts
process.env.BASE_URL
```

Never hardcode:

- URLs
- Credentials
- Tokens

---

# Reporting

Generated artifacts:

```text
playwright-report/
test-results/
```

Store:

- HTML Reports
- Screenshots
- Traces
- Execution Logs

---

# Coding Standards

Always:

✅ Use async/await

✅ Use TypeScript typings

✅ Reuse page methods

✅ Keep code modular

✅ Add meaningful logs

✅ Handle dynamic waits properly

---

Never:

❌ Use fixed waits

```ts
waitForTimeout(5000)
```

❌ Duplicate code

❌ Hardcode test data

❌ Put Playwright code in feature files

❌ Create page objects for small reusable components

---

# AI Agent Rules

When generating code:

1. Check existing pages before creating new ones.
2. Reuse existing step definitions whenever possible.
3. Keep feature files business-readable.
4. Keep Playwright actions inside page objects.
5. Use environment variables.
6. Follow Given → When → Then.
7. Prefer reusable methods over duplicate code.
8. Generate production-ready TypeScript.

---

# Example Mapping

```text
features/login.feature
  ↓
features/featureDefination/login.steps.ts
        ↓
pages/LoginPage.ts
        ↓
Playwright Actions
        ↓
Assertions
        ↓
playwright-report/
```

This document is the source of truth for all developers, GitHub Copilot, MCP Agents, and AI-assisted code generation in this repository.
