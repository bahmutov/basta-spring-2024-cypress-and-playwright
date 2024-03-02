import { customers } from '../pom/customers';

describe('init', { viewportHeight: 800 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create and delete a customer in an intelligent way', () => {
    const name = `Smith ${Cypress._.random(1e6)}`;
    const fullName = `Max ${name}`;

    customers.open();
    customers.add();
    customers.submitForm('Max', name, 'Austria', new Date(1985, 11, 12));
    customers.clickCustomer(fullName);
    customers.delete();
    customers.verifyCustomerDoesNotExist(fullName);
  });
});
