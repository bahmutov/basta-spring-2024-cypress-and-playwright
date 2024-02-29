import { sidemenu } from '../pom/sidemenu';
import { customer } from '../pom/customer';
import { customers } from '../pom/customers';
import { recurse } from 'cypress-recurse';
import 'cypress-map';

describe('customers', () => {
  beforeEach(() => {
    cy.visit('/');
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

  it.only(
    'should create and delete a customer in an intelligent way (cypress-recurse)',
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

      cy.log('**confirm customer does not exist**');
      recurse(
        () => {
          cy.get('[data-testid=row-customer]');
          cy.contains('[data-testid=row-customer] p.name', fullName).should(
            'not.exist'
          );
          return cy.testid('btn-customers-next').invoke('prop', 'disabled');
        },
        Cypress._.identity,
        {
          timeout: 10_000,
          limit: 10,
          log: 'checked all pages',
          post() {
            cy.get('[data-testid=row-customer]').first().asEnv('firstRow');
            cy.testid('btn-customers-next').click();
            cy.detaches('@firstRow');
          },
        }
      );
    }
  );
});
