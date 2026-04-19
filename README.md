# OWASP Juice Shop — Functional Test Suite
**Course:** Software Testing (Finals Project)  
**Framework:** Playwright + Node.js  
**Target:** OWASP Juice Shop v19.2.1 at `http://localhost:3000`

---

## Team Responsibilities

| Member | Role | Primary Deliverable |
|--------|------|---------------------|
| Member 1 | Test Documentation Lead | `docs/Test_Plan.md`, `docs/Test_Cases.csv`, `docs/RTM.md` |
| Member 2 | Playwright Automation Engineer | `tests/01_registration_login.spec.js` |
| Member 3 (Lead) | Technical Lead & QA Lead | `playwright.config.js`, `tests/02_search_and_cart.spec.js`, `docs/Final_Test_Report.md` |
| Member 4 | Reporting & Presentation | Canva deck, screenshot/video capture |

---

## Project Structure

```
SoftTest_Finals/
├── docs/
│   ├── Test_Plan.md              # Full test plan document
│   ├── Test_Cases.csv            # 20 test cases across 5 workflows
│   ├── RTM.md                    # Requirements Traceability Matrix
│   └── Final_Test_Report.md      # Execution results & coverage summary
│
├── tests/
│   ├── 01_registration_login.spec.js   # Workflow 1: Register & Login
│   └── 02_search_and_cart.spec.js      # Workflow 2 & 3: Search & Cart
│
├── playwright-report/            # Auto-generated HTML report (after test run)
├── test-results/                 # Auto-generated screenshots & videos
│
├── package.json                  # Project dependencies & scripts
├── playwright.config.js          # Playwright configuration
└── README.md                     # This file
```

---

## Setup Instructions

### 1. Prerequisites

Ensure Node.js is available. The Juice Shop directory includes a portable `node.exe`. You can use it directly by setting it in your PATH, or install Node.js globally.

**Check your Node version:**
```powershell
node --version
```

### 2. Install Dependencies

Open PowerShell in the `SoftTest_Finals` folder:

```powershell
cd d:\SoftTest_Finals
npm install
```

### 3. Install Playwright Browser Binaries

```powershell
npx playwright install chromium
```

---

## Running the Tests

### IMPORTANT: Start the Juice Shop Server First!

The server **must** be running before executing any tests.

```powershell
cd d:\SoftTest_Finals\juice-shop_19.2.1
.\node.exe server
```

Then, in your **main terminal**, run the tests:

---

### Run All Tests (Headed — for Presentation)
```powershell
npm test
npx playwright test
```

### Run a Specific Script
```powershell
npm run test:registration

npm run test:search-cart
```

### Open the HTML Report
```powershell
npm run report
npx playwright show-report
```

### Debug Mode (with Playwright Inspector)
```powershell
npm run test:debug
```

---

## Test Coverage Summary

| Workflow | Test Cases | Automated | Status |
|----------|-----------|-----------|--------|
| WF-01: Registration & Login | 5 | 2 automated | 100% executed |
| WF-02: Product Browsing & Search | 5 | 1 automated | 100% executed |
| WF-03: Shopping Cart Management | 5 | 2 automated | 100% executed |
| WF-04: Checkout & Payment | 3 | Manual | 100% executed |
| WF-05: Order History & Profile | 2 | Manual | 100% executed |
| **TOTAL** | **20** | **5 automated** | **100% coverage** |

---

## Presentation Tips

The configuration is already optimized for live demos:
- **Browser is visible** (`headless: false`)
- **Actions are slowed to 500ms** (`slowMo: 500`) so the audience can follow
- **Screenshots** are taken after every test
- **Videos** are recorded for every test run — find them in `test-results/`
- The **HTML report** (`npx playwright show-report`) is great for walkthrough slides

---
*SoftTest Finals — QA Automation Team | 2026-04-18*
