/// <reference types="cypress" />
import chai from "chai";

import { PurchasePage } from "../pages/PurchasePage.js";

export function purchaseEndToEnd(deptCity, desCity, flightSeq) {
  const page = new PurchasePage();

  if (deptCity && desCity && deptCity === desCity) {
    throw new Error("Departure and destination cannot be the same!");
  }

  cy.visit("https://blazedemo.com/");

  cy.get("select[name='fromPort'] option").then($opts => {
    const allCities = [...$opts].map(o => o.text.trim());
    deptCity = deptCity || allCities[Math.floor(Math.random() * allCities.length)];

    const destOptions = ["Buenos Aires","Rome","London","Berlin","New York","Dublin","Cairo"];
    desCity = desCity || destOptions.filter(c => c !== deptCity)[Math.floor(Math.random() * (destOptions.length - 1))];

    page.selectDepartureCity(deptCity);
    page.selectDestinationCity(desCity);
  });

  page.clickFindFlights();

  cy.get("table tbody tr").should("have.length.greaterThan", 0);

  cy.get("table tbody tr").then($rows => {
    if (!flightSeq) flightSeq = Math.floor(Math.random() * $rows.length) + 1;
    if (flightSeq < 1 || flightSeq > $rows.length) {
      throw new Error("Invalid flight sequence number!");
    }
    page.chooseFlight(flightSeq);
  });

  cy.url().should("include", "purchase.php");

  const dummyData = {
    name: "Mustafa",
    address: "123 Street",
    city: "Riyadh",
    state: "State",
    zip: "12345",
    cardType: "American Express",
    cardNumber: "3774001111111115",
    month: "12",
    year: "2025",
    nameOnCard: "Mustafa"
  };

  page.fillPurchaseForm(dummyData);
  page.clickPurchase();

  page.validateStatus("PendingCapture");
  page.validateAmount(100);
}
