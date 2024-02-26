describe('misc', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should count the holidays according to the API', () => {
    cy.request('https://api.eternal-holidays.net/holiday')
      .its('body.length')
      .should('be.greaterThan', 0)
      .then((holidaysCount) => {
        cy.openMenu('Holidays');
        cy.location('pathname').should('eq', '/holidays');
        cy.get('app-holiday-card').should('have.length', holidaysCount);
      });
  });
});
