/* eslint-disable no-undef */
/// <reference types="cypress" />
import { mount } from "@cypress/react";
import PricingPage from "./PricingPage";
import products from "mocks/products.json";

describe("Pricing Page", () => {
  beforeEach(() => {
    mount(<PricingPage />);
  });

  it("Should render all health-care services", () => {
    products.forEach((product) => {
      cy.get(`div[id=${product.id}]`);
    });
  });

  it("Should have display correct price for each package", () => {
    products.forEach((product) => {
      cy.get(`p[id=price-for-${product.id}]`).contains(
        `${product.currency} ${product.retailPrice}`
      );
    });
  });
});
