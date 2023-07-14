it('should rename Latitia to Laetita', () => {
  cy.visit('').then(() => {
    const now = new Date();
  });
  cy.get('[data-testid=btn-customers]').click();
  cy.contains('[data-testid=row-customer]', 'Latitia')
    .find('[data-testid=btn-edit]')
    .click();

  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get('[data-testid=inp-firstname]').clear().type('Laetitia');
  cy.get('[data-testid=btn-submit]').click();

  cy.get('[data-testid=row-customer]').should(($rows) => {
    console.log($rows);
    expect($rows).to.have.length(11);
  });
});
