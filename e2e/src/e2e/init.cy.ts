describe('init', () => {
  it('should rename Latitia to Laetita', () => {
    cy.visit('');
    cy.get('[data-testid=btn-customers]').click();
    cy.contains('[data-testid=row-customer]', 'Latitia')
      .find('[data-testid=btn-edit]')
      .click();

    cy.get('[data-testid=inp-firstname]').clear();
    cy.get('[data-testid=inp-firstname]').type('Laetitia');
    cy.get('[data-testid=btn-submit]').click();

    cy.get('[data-testid=row-customer]').should(($rows) => {
      console.log($rows);
      expect($rows).to.have.length(10);
    });
  });
});
