import ViewportPreset = Cypress.ViewportPreset;
import { sidemenu } from '../pom/sidemenu';
import { customer } from '../pom/customer';
import { customers } from '../pom/customers';

describe('customers', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  (
    ['ipad-2', 'ipad-mini', 'iphone-6', 'samsung-s10'] as ViewportPreset[]
  ).forEach((preset) => {
    // use https://github.com/bahmutov/cypress-each here
    it(`should count the entries in ${preset}`, () => {
      cy.viewport(preset);
      cy.visit('');
      cy.testid('btn-customers').click();
      cy.testid('row-customer').should('have.length', 10);
    });
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

  it(
    'should create and delete a customer in an intelligent way',
    { viewportHeight: 1000 },
    () => {
      const name = String(Cypress._.random(1e6, 1e7));
      const fullName = `Max ${name}`;

      customers.open();
      cy.testid('row-customer');
      customers.add();
      customers.submitForm('Max', name, 'Austria', new Date(1985, 11, 12));
      cy.testid('row-customer');
      customers.clickCustomer(fullName);
      customers.delete();
      cy.testid('row-customer');
      customers.verifyCustomerDoesNotExist(fullName);
    }
  );
});
