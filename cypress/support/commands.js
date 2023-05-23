Cypress.Commands.addQuery('getCy', (dataCy) => {
  const getFn = cy.now('get', `[data-cy="${dataCy}"]`);
  return () => {
    return getFn();
  };
});
