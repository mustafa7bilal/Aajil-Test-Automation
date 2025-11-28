/// <reference types="cypress" />

import { purchaseEndToEnd } from "../functions/purchaseEndToEnd.js";

describe("BlazeDemo Purchase Flight Tests", () => {
  it("Test 1: Boston → Berlin, Flight 2", () => {
    purchaseEndToEnd("Boston", "Berlin", 2);
  });

  it("Test 2: Random inputs", () => {
    purchaseEndToEnd();
  });

  it("Test 3: Boston → Boston (should fail)", () => {
    cy.on('fail', (err) => {
      expect(err.message).to.include("Departure and destination cannot be the same!");
      return false;
    });
    purchaseEndToEnd("Boston", "Boston", 1);
  });

  it("Test 4: Paris → Berlin, Flight 0 (invalid)", () => {
    cy.on('fail', (err) => {
      expect(err.message).to.include("Invalid flight sequence number!");
      return false;
    });
    purchaseEndToEnd("Paris", "Berlin", 0);
  });

  it("Test 5: Random valid inputs of choice", () => {
    purchaseEndToEnd("Philadelphia", "Rome", 1);
  });
});
