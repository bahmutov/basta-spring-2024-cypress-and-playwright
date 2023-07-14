describe('init', () => {
  it('should rename Latitia to Laetita', () => {
    cy.visit('').then(() => {
      const now = new Date();
    });
    // cy.get('[data-testid=btn-customers]').click();
    cy.findByRole('link', { name: 'Customers' }).click();
    cy.findByLabelText(/Latitia/)
      .findByRole('link', { name: 'Edit Customer' })
      .click();

    cy.findByLabelText('Firstname').clear();
    cy.findByLabelText('Firstname').type('Laetitia');
    cy.get('[data-testid=btn-submit]').click();

    cy.get('[data-testid=row-customer]').should(($rows) => {
      console.log($rows);
      expect($rows).to.have.length(10);
    });
  });

  it('should fail because of query and assertion', () => {
    cy.visit('');
    cy.get('a').should('have.attr', 'href').contains('Customers').click();
  });

  it('should fail', () => {
    cy.visit('');
    cy.get('[data-testid=btn-click]').as('button');
    cy.get('@button').click();
    cy.get('@button').should('contain.text', 'Unclick me');
  });

  it('should fail because of covered element', () => {
    cy.visit('');
    cy.get('button[role=switch]').first().click();
  });

  it.only('should go to holidays', () => {
    let holidaysCount = 0;
    cy.request('https://api.eternal-holidays.net/holiday').then(
      (res) => (holidaysCount = res.body.length)
    );

    cy.visit('');
    cy.openMenu('Holidays');

    cy.task('log', holidaysCount);
    cy.get('app-holiday-card').should(($cards) => {
      expect($cards).to.have.length(holidaysCount);
    });
  });
});
