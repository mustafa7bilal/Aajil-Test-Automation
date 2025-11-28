const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports", // folder for reports
    overwrite: false,              // do not overwrite previous reports
    html: true,                    // generate HTML report
    json: true,                    // generate JSON report (optional)
    charts: true                   // include charts in the report
  },
  e2e: {
    setupNodeEvents(on, config) {
      // you can add node event listeners here if needed
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
