// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from 'cypress-slow-down';
// slow each Cypress command by 100ms
slowCypressDown(100);

describe('Customers', { viewportHeight: 800 }, () => {
  it('deletes a customer', () => {
    cy.visit('/customer');
    cy.contains('a', 'Customers').click();
    cy.location('pathname').should('eq', '/customer');
    cy.contains('a', 'Add Customer').click();
    cy.location('pathname').should('eq', '/customer/new');
    cy.get('input[formcontrolname=firstname]').type('Tom');
    cy.get('input[formcontrolname=name]').type('Lincoln');
    cy.contains('mat-label', 'Country').click();
    cy.contains('mat-option', 'USA').click();
    cy.contains('mat-label', 'Birthdate').click();
    cy.get('input[formcontrolname=birthdate]').type('12.09.1995');
    cy.contains('button', 'Save').click();
    cy.location('pathname').should('eq', '/customer');
    // delete the customer
    cy.contains('[data-testid=row-customer]', 'Tom Lincoln')
      .contains('a', 'edit')
      .click();
    cy.location('pathname').should('match', /\/customer\/\d+$/);
    cy.contains('button', 'Delete').click();
    cy.location('pathname').should('eq', '/customer');
    cy.get('[data-testid=row-customer]');
    cy.contains('Tom Lincoln').should('not.exist');
  });

  it.only('deletes a customer (app action)', () => {
    const firstname = 'Tom';
    const name = 'Lincoln';
    const fullName = `${firstname} ${name}`;

    const addCustomer = {
      customer: {
        id: 0,
        firstname,
        name,
        country: 'AT',
        birthdate: '1985-12-12T05:00:00.000Z',
      },
      type: '[Customer] add',
    };
    cy.visit('/customer');
    cy.window().should('have.property', 'store');
    cy.window().then((win) => {
      win.ngZone!.run(() => {
        win.store!.dispatch(addCustomer);
        win.store!.dispatch({ type: '[Customer] load' });
      });
    });
    // delete the customer
    cy.contains('[data-testid=row-customer]', 'Tom Lincoln')
      .contains('a', 'edit')
      .click();
    cy.location('pathname').should('match', /\/customer\/\d+$/);
    cy.contains('button', 'Delete').click();
    cy.location('pathname').should('eq', '/customer');
    cy.get('[data-testid=row-customer]');
    cy.contains('Tom Lincoln').should('not.exist');
  });
});
