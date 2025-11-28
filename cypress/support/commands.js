// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('purchaseEndToEnd', (deptCity = null, desCity = null, flightSeq = null) => {
    cy.log(`Starting purchase flow with: ${deptCity || 'random'}, ${desCity || 'random'}, ${flightSeq || 'random'}`);
    
    // Input validation
    if (deptCity && desCity && deptCity === desCity) {
        throw new Error('Departure and destination cities cannot be the same');
    }
    
    if (flightSeq !== null && flightSeq < 1) {
        throw new Error('Flight sequence must be 1 or greater');
    }

    const homePage = new HomePage();
    const flightSelectionPage = new FlightSelectionPage();
    const purchasePage = new PurchasePage();
    const confirmationPage = new ConfirmationPage();

    homePage.visit();

    // Handle city selection (random or provided)
    cy.wrap(Promise.all([
        deptCity ? deptCity : homePage.getRandomCity('select[name="fromPort"]'),
        desCity ? desCity : homePage.getRandomCity('select[name="toPort"]')
    ])).then(([finalDeptCity, finalDesCity]) => {
        cy.log(`Selected cities: ${finalDeptCity} -> ${finalDesCity}`);
        
        homePage.selectDepartureCity(finalDeptCity)
                .selectDestinationCity(finalDesCity)
                .findFlights();

        // Handle flight sequence selection (random or provided)
        return flightSeq ? 
            flightSeq : 
            flightSelectionPage.getRandomFlightIndex();
    }).then((finalFlightSeq) => {
        cy.log(`Selected flight sequence: ${finalFlightSeq}`);
        
        flightSelectionPage.selectFlightByIndex(finalFlightSeq);

        // Fill purchase form with random data
        const userData = purchasePage.generateRandomUserData();
        purchasePage.fillPurchaseForm(userData);
        purchasePage.purchaseFlight();

        // Validate purchase
        confirmationPage.validatePurchase();
        
        return cy.wrap({
            departureCity: deptCity,
            destinationCity: desCity,
            flightSequence: finalFlightSeq,
            status: 'Success'
        });
    }).catch((error) => {
        cy.log(`❌ Test failed: ${error.message}`);
        throw error;
    });
});