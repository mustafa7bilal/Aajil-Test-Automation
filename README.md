# Aajil Test Automation

This repository contains Cypress automation tests for the BlazeDemo Flight Purchase website: [https://blazedemo.com/](https://blazedemo.com/).  
The project demonstrates end-to-end test automation including flight selection, purchase, and validation using Cypress with the Page Object Model (POM) pattern.

---

## **Project Structure**

cypress/
├── e2e/
│ └── purchaseTests.cy.js # Test cases
├── functions/
│ └── purchaseEndToEnd.js # Reusable function for end-to-end purchase
├── pages/
│ └── PurchasePage.js # Page Object Model class
├── reports/ # Test reports generated (HTML/JSON)
└── support/
└── e2e.js # Cypress support file
cypress.config.js # Cypress configuration
package.json # Project dependencies and scripts
jsconfig.json # VS Code IntelliSense configuration

yaml
Copy code

---

## **Prerequisites**

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- Git (to clone the repository)
- Chrome or Firefox browser installed (Cypress default)

---

## **Setup Instructions**

1. **Clone the repository**

```bash
git clone https://github.com/your-username/aajil-test-automation.git
cd aajil-test-automation
Install dependencies

bash
Copy code
npm install
Verify Cypress installation

bash
Copy code
npx cypress open
This should open the Cypress Test Runner.

Running Tests
1. Run tests in interactive mode:
bash
Copy code
npx cypress open
Click the test file (purchaseTests.cy.js) to run it in the Cypress GUI.

2. Run tests in headless mode (for CI/CD):
bash
Copy code
npx cypress run
Test results will appear in the console.

JSON reports will be generated in cypress/reports/.

Generating HTML Report
Install Mochawesome (already in dependencies)

bash
Copy code
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
Run tests to generate JSON reports

bash
Copy code
npx cypress run
Merge reports (if multiple spec files)

bash
Copy code
npx mochawesome-merge "cypress/reports/*.json" > cypress/reports/report.json
Generate HTML report

bash
Copy code
npx mochawesome-report-generator "cypress/reports/report.json" -o "cypress/reports/html"
Open the report: cypress/reports/html/index.html

Test Scenarios Covered
Purchase flight with specific departure, destination, and flight sequence.

Randomized purchase when no parameters are provided.

Validation for same departure and destination.

Price validation (greater than $100).

Status validation (PendingCapture).

Assumptions & Notes
Login/Registration not required for BlazeDemo.

Dummy data is used for purchase form.

Explicit waits are handled automatically by Cypress commands.

Page Object Model (POM) design pattern is used for better maintainability.

Repository Link
https://github.com/your-username/aajil-test-automation

Commands Summary
Command	Description
npm install	Install dependencies
npx cypress open	Open Cypress Test Runner (GUI)
npx cypress run	Run all tests in headless mode
npx mochawesome-merge "cypress/reports/*.json" > cypress/reports/report.json	Merge JSON reports
npx mochawesome-report-generator "cypress/reports/report.json" -o "cypress/reports/html"	Generate HTML report
