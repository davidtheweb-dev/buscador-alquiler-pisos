/// <reference types="cypress" />

describe('housing tests', () => {
  it('should render the home page and load the housing list with their title, rate, contact btn and see more btn', () => {
    cy.visit('/');

    cy.getCy('housing-item').then((item) => {
      cy.getCy('housing-item-title').should(
        'have.length.at.least',
        item.length
      );
      cy.getCy('housing-item-rate').should('have.length.at.least', item.length);
      cy.getCy('housing-item-contact-btn').should(
        'have.length.at.least',
        item.length
      );
      cy.getCy('housing-item-show-btn').should(
        'have.length.at.least',
        item.length
      );
    });

    cy.getCy('housing-filter');
    cy.getCy('housing-reload-btn');
    cy.getCy('housing-login-btn');
    // cy.getCy('housing-upload-btn');
  });
});
