export class PurchasePage {
  // Locators
  fromPortSelect = "select[name='fromPort']";
  toPortSelect = "select[name='toPort']";
  findFlightsBtn = "input[type='submit'][value='Find Flights']";
  flightsTableRows = "table tbody tr";

  nameInput = "#inputName";
  addressInput = "#address";
  cityInput = "#city";
  stateInput = "#state";
  zipInput = "#zipCode";
  cardTypeSelect = "#cardType";
  cardNumberInput = "#creditCardNumber";
  cardMonthInput = "#creditCardMonth";
  cardYearInput = "#creditCardYear";
  nameOnCardInput = "#nameOnCard";
  rememberMeCheckbox = "#rememberMe";
  purchaseBtn = "input[type='submit'][value='Purchase Flight']";

  // Methods
  selectDepartureCity(city) {
    cy.get(this.fromPortSelect).select(city);
  }

  selectDestinationCity(city) {
    cy.get(this.toPortSelect).select(city);
  }

  clickFindFlights() {
    cy.get(this.findFlightsBtn).click();
  }

  chooseFlight(flightIndex) {
    cy.get(this.flightsTableRows).eq(flightIndex - 1).contains("Choose This Flight").click();
  }

  fillPurchaseForm(data) {
    cy.get(this.nameInput).type(data.name);
    cy.get(this.addressInput).type(data.address);
    cy.get(this.cityInput).type(data.city);
    cy.get(this.stateInput).type(data.state);
    cy.get(this.zipInput).type(data.zip);
    cy.get(this.cardTypeSelect).select(data.cardType);
    cy.get(this.cardNumberInput).type(data.cardNumber);
    cy.get(this.cardMonthInput).clear().type(data.month);
    cy.get(this.cardYearInput).clear().type(data.year);
    cy.get(this.nameOnCardInput).type(data.nameOnCard);
    cy.get(this.rememberMeCheckbox).check();
  }

  clickPurchase() {
    cy.get(this.purchaseBtn).click();
  }

  validateStatus(expectedStatus) {
    cy.contains('td', 'Status').next().should('have.text', expectedStatus);
  }

  validateAmount(minAmount) {
    cy.contains('td', 'Amount').next().invoke('text').then(text => {
      const amount = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (amount <= minAmount) {
        throw new Error(`Price validation failed: ${amount} <= ${minAmount}`);
      }
    });
  }
}
