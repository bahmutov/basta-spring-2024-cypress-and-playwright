import { customers } from '../pom/customers';

describe('Customers', { viewportHeight: 800 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('adds a customer via UI', () => {
    const firstname = 'Test';
    const name = `Smith ${Cypress._.random(1e6)}`;
    const fullName = `${firstname} ${name}`;

    customers.visit();
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
    cy.window().then((win) => {
      // @ts-expect-error
      win.ngZone.run(() => {
        // @ts-expect-error
        win.store.dispatch(addCustomer);
        // @ts-expect-error
        win.store.dispatch({ type: '[Customer] load' });
      });
    });

    customers.clickCustomer(fullName);
    cy.location('pathname').should('match', /\/customer\/\d+$/);
  });
});
