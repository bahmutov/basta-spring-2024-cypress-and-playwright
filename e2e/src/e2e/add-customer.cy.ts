import { customers } from '../pom/customers';

describe('Customers', { viewportHeight: 800 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('adds a customer via UI', () => {
    const name = `Smith ${Cypress._.random(1e6)}`;
    const fullName = `Max ${name}`;

    customers.visit();
    const addCustomer = {
      customer: {
        id: 0,
        firstname: 'Max',
        name: 'Smith 999999',
        country: 'AT',
        birthdate: '1985-12-12T05:00:00.000Z',
      },
      type: '[Customer] add',
    };
    cy.window().its('store').invoke('dispatch', addCustomer);
    cy.reload();
  });
});
