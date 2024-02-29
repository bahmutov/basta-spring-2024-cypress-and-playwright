import ViewportPreset = Cypress.ViewportPreset;
import { sidemenu } from '../pom/sidemenu';
import { customer } from '../pom/customer';
import { customers } from '../pom/customers';

import 'cypress-map';
import { recurse } from 'cypress-recurse';

describe('init', () => {
  beforeEach(() => {
    cy.visit('');
  });

  (
    ['ipad-2', 'ipad-mini', 'iphone-6', 'samsung-s10'] as ViewportPreset[]
  ).forEach((preset) => {
    it(`should count the entries in ${preset}`, () => {
      cy.viewport(preset);
      cy.visit('');
      cy.testid('btn-customers').click();
      cy.testid('row-customer').should('have.length', 10);
    });
  });

  it('should rename Latitia to Laetitia', () => {
    cy.get('[data-testid=btn-customers]').click();
    cy.contains('[data-testid=row-customer]', 'Latitia')
      .find('[data-testid=btn-edit]')
      .click();
    cy.get('[data-testid=inp-firstname]')
      .should('have.value', 'Latitia')
      .clear()
      .type('Laetitia');
    cy.get('[data-testid=btn-submit]').click();

    cy.get('[data-testid=row-customer]').should(
      'contain.text',
      'Laetitia Bellitissa'
    );
  });

  it('should add a new customer', () => {
    sidemenu.open('Customers');
    cy.testid('btn-customers-add').click();
    customer.setFirstname('Tom');
    customer.setName('Lincoln');
    customer.setCountry('USA');
    customer.setBirthday(new Date(1995, 9, 12));
    customer.submit();
    cy.testid('btn-customers-next').click();

    cy.testid('row-customer').should('contain.text', 'Tom Lincoln');
  });

  it.only(
    'should create and delete a customer in an intelligent way',
    { viewportHeight: 800 },
    () => {
      const name = `Smith ${Cypress._.random(1e6)}`;
      const fullName = `Max ${name}`;

      cy.visit('');
      customers.open();
      customers.add();
      customers.submitForm('Max', name, 'Austria', new Date(1985, 11, 12));
      customers.clickCustomer(fullName);
      customers.delete();
      // customers.verifyCustomerDoesNotExist('Hugo Brandt');

      recurse(
        () => {
          cy.testid('row-customer');
          cy.testid('row-customer', fullName).should('not.exist');
          return cy.testid('btn-customers-next').invoke('prop', 'disabled');
        },
        (disabled) => disabled,
        {
          log: 'Finished checking the pages',
          timeout: 10_000,
          delay: 500,
          post() {
            cy.testid('row-customer').first().asEnv('firstRow');
            cy.testid('btn-customers-next').click();
            cy.detaches('@firstRow');
          },
        }
      );
    }
  );
});
