describe('misc', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.request('https://api.eternal-holidays.net/holiday')
      .its('body.length')
      .should('be.greaterThan', 0)
      .as('holidaysCount');
  });

  it('should count the holidays according to the API', function () {
    cy.openMenu('Holidays');
    cy.location('pathname').should('eq', '/holidays');
    cy.get('app-holiday-card').should('have.length', this['holidaysCount']);
  });
});
