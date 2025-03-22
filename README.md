# PushingIT Playwright TypeScript POM

This project automates testing for the **PushingIT** web application using **Playwright** and **Cucumber** in **TypeScript**. It implements the Page Object Model pattern, generates random test data with **Faker**, and produces HTML reports for visual analysis of test results.

---

## Folder Structure

The project includes:

- Generation of random data (users and passwords).
- Automation of forms and random selection of values in dropdown fields.
- Test execution across multiple browsers (Chromium, Firefox, WebKit).
- Generation of custom HTML reports with execution details.

---

## Folder Structure

```plaintext
pushing-it-playwright-typescript-pom/
├── node_modules/
├── playwright/
│   ├── features/
│   │   └── register.feature
│   ├── pages/
│   │   └── RegisterPage.ts
│   ├── step-definitions/
│   │   └── register.steps.ts
│   └── utils/
│       └── userGenerator.ts
├── reports/
│   ├── html-report/
│   └── json/
├── .env
├── .gitignore
├── cucumber.js
├── generate-report.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

### Key Folders and Files

**`playwright/features`**
Contains the Gherkin .feature files defining test scenarios.

- **`register.feature`** Describes the successful user registration scenario.

**`playwright/pages`**
Contains Page Object Model classes that encapsulate interactions with the application pages.

- **`RegisterPage.ts`** Encapsulates interactions with the registration form, including field input, random selection of gender, day, month, and year, and verification of successful registration.

**`playwright/step-definitions`**
Contains step definitions that implement the Gherkin steps using Playwright.

- **`register.steps.ts`** Implements the steps for the registration flow.

**`playwright/utils`**
Shared utilities for the project.

- **`userGenerator.ts`** Generates random user credentials (username and password) using Faker. The password is ensured to include at least one special character and one digit.

**`reports`**
Contains generated reports: HTML reports for visual analysis **`(html-report/)`** and JSON files used for report generation **`(json/)`**.

**`Configuration Files`**
- **`.env`** Defines environment variables (e.g., base URL).
- **`cucumber.js`** Cucumber configuration (feature file paths, step definitions, report formats, etc.).
- **`tsconfig.json`** TypeScript configuration.
- **`generate-report.js`** Script to generate an HTML report from the JSON files produced by Cucumber.

---

## Execution Script

The **`package.json`** includes several scripts to simplify test execution and report generation:

- **`npm run all`** Runs all scenarios defined in the **`.feature`** files.
- **`npm run tag-regresion`** Runs only scenarios tagged with **`@regresion`**.
- **`npm run tag-happy-path`** Runs only scenarios tagged with **`@happy-path`**.
- **`npm run generar-reporte-html`** Executes the generate-report.js script to generate an HTML report from the JSON files in **`./reports/json.`** The report is saved in **`./reports/html-report/`**.
- **`npm run visualizar-reporte-html`** Opens the generated HTML report in the default browser, pointing to **`./reports/html-report/`**.

---

## Requirements and Setup

1. **`Node.js`** (LTS or later) and npm must be installed.
2. Install project dependencies:
```plaintext
npm install
```
3. Create or update the **`.env`** file with necessary variables (e.g., **`BASE_URL`**):
```plaintext
BASE_URL=https://pushing-it.vercel.app/
```
4. Verify configuration in **`cucumber.js`** and **`tsconfig.json`** as needed.

---

## Running the Tests

1. Run all test
```plaintext
npm run all
```
2. Run tests by tag (e.g., @happy-path):
```plaintext
npm run tag-happy-path
```
3. Generate HTML Report:
```plaintext
npm run generar-reporte-html
```
The report is generated in **`./reports/html-report/`**.
4. View HTML Report:
```plaintext
npm run visualizar-reporte-html
```
This opens the report in your default browser.

---

## Highlighted Workflow

1. Gherkin Scenario Definition

In **`register.feature`**, the successful registration flow is described in natural language:

- **`Background`**: Navigates to the homepage.
- **`Scenario`**: Successful registration of a new user.

2. Step Definitions

In **`register.steps.ts`**, steps are implemented using Playwright:

- Launching the browser.
- Navigating to the base URL (defined in **`.env`**).
- Filling out the registration form with randomly generated data (using **`userGenerator.ts`**).
- Verifying that a welcome message is displayed to confirm registration success.

3. Page Object Model

**`RegisterPage.ts`** centralizes page interactions:

- Methods to navigate, fill out the form, and verify successful registration.
- Random selection of elements (gender, day, month, year) directly from the DOM.

4. Data Generation

**`userGenerator.ts`** uses Faker to generate unique user credentials for each test run, ensuring secure passwords (with a special character and digit) and usernames without special characters.

5. Reporting

After test execution, results are stored in JSON format.
The **`generate-report.js`** script generates a detailed HTML report from these JSON files, saved in **`./reports/html-report/`**.

---

## Author

Created by Nicolás Ortiz.

Thank you for reviewing this project!

Please visit:

- [GitHub repository.](https://github.com/nicolasortiz1995?tab=repositories)
- [LinkedIn.](https://www.linkedin.com/in/ortiznicolas/)