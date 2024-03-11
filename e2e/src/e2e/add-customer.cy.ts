// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from 'cypress-slow-down';
// slow each Cypress command by 100ms
slowCypressDown(100);

describe('Customers', { viewportHeight: 800 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds a customer', () => {
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
    // confirm the record is in the list
    cy.contains('Tom Lincoln')
      .should('exist')
      .invoke('css', 'border', '2px solid red');
  });
});
