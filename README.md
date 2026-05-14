# Playwright POM Framework

End-to-end test framework using **Playwright + TypeScript** following the
**Page Object Model (POM)** design pattern. Target application under test:
[practicetestautomation.com/practice-test-login](https://practicetestautomation.com/practice-test-login/).

## Project structure

```
.
├── fixtures/
│   └── pages.fixture.ts     # Custom fixtures injecting page objects
├── pages/
│   ├── BasePage.ts          # Abstract base with shared behaviour
│   ├── LoginPage.ts         # Page object for the login screen
│   ├── LoggedInPage.ts      # Page object for the post-login screen
│   └── index.ts             # Barrel re-exports
├── test-data/
│   └── users.ts             # Centralised test data (credentials)
├── tests/
│   └── login.spec.ts        # Login test suite (positive + negative)
├── playwright.config.ts     # Playwright runner configuration
├── tsconfig.json
└── package.json
```

### Why this layout?

- **`pages/`** keeps DOM selectors and UI flows isolated from tests.
- **`fixtures/`** uses Playwright's `test.extend` to inject page objects,
  removing per-test boilerplate.
- **`test-data/`** centralises test inputs so specs read as plain English.
- **`tests/`** contains only spec files; everything else is library code.

## Getting started

```bash
npm install
npx playwright install
```

## Running the tests

```bash
npm test                    # all browsers
npm run test:chromium       # Chromium only
npm run test:headed         # show the browser UI
npm run test:ui             # Playwright UI mode
npm run test:smoke          # only @smoke-tagged tests
npm run report              # open the last HTML report
```

## Test cases

| ID    | Description                                  | Credentials                                 |
| ----- | -------------------------------------------- | ------------------------------------------- |
| TC-01 | Positive login redirects to success page     | `student` / `Password123`                   |
| TC-02 | Negative login - invalid username error      | `incorrectUser` / `Password123`             |
| TC-03 | Negative login - invalid password error      | `student` / `incorrectPassword`             |

## Conventions

- Page objects expose **intent-revealing methods** (`login`, `expectLoggedIn`) rather than raw selectors.
- All locators are **private** to the page object.
- Assertions on UI state live in `expect*` methods on the page object, so specs read like a checklist.
- Specs use **custom fixtures** to receive ready-to-use page objects.
