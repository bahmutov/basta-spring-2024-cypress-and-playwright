describe('init', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should count the entries', () => {
    cy.get('[data-testid=btn-customers]').click();
    cy.get('[data-testid=row-customer]').should('have.length', 10);
  });

  it('should rename Latitia to Laetitia', () => {
    cy.get('[data-testid=btn-customers]').click();
    cy.contains('[data-testid=row-customer]', 'Latitia').find('[data-testid=btn-edit]').click();
    cy.get('[data-testid=inp-firstname]').should('have.value', 'Latitia').clear().type('Laetitia');
    cy.get('[data-testid=btn-submit]').click();

    cy.get('[data-testid=row-customer]').should('contain.text', 'Laetitia Bellitissa');
  });

  it('should add a new customer', () => {
    cy.get('[data-testid=btn-customers]').click();
    cy.get('[data-testid=btn-customers-add]').click();
    cy.get('[data-testid=inp-firstname]').type('Tom');
    cy.get('[data-testid=inp-name]').type('Lincoln');
    cy.get('[data-testid=sel-country]').click();
    cy.get('[data-testid=opt-country]').contains('USA').click();
    cy.get('[data-testid=inp-birthdate]').type('12.10.1995');
    cy.get('[data-testid=btn-submit]').click();
    cy.get('[data-testid=btn-customers-next]').click();

    cy.get('[data-testid=row-customer]').should('contain.text', 'Tom Lincoln');
  });
});
