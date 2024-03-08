import { sidemenu } from '../pom/sidemenu';
import { customer } from '../pom/customer';
import { customers } from '../pom/customers';

describe('Customers', { viewportHeight: 800 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds a customer via UI', () => {
    sidemenu.open('Customers');
    cy.testid('btn-customers-add').click();
    customer.setFirstname('Tom');
    customer.setName('Lincoln');
    customer.setCountry('USA');
    customer.setBirthday(new Date(1995, 9, 12));
    customer.submit();

    customers.goTo('Tom Lincoln').invoke('css', 'border', '2px solid red');
  });

  it('adds a customer via app action', () => {
    const firstname = 'Tom';
    const name = 'Lincoln';
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
      win.ngZone!.run(() => {
        win.store!.dispatch(addCustomer);
        win.store!.dispatch({ type: '[Customer] load' });
      });
    });

    customers.goTo(fullName).invoke('css', 'border', '2px solid red');
  });

  it.skip('adds a customer via app action using app source code', () => {
    // cannot import due to syntax errors
    // import { customerActions } from '@app/customer/+state/customer.actions';
    const firstname = 'Tom';
    const name = 'Lincoln';
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
      win.ngZone!.run(() => {
        win.store!.dispatch(addCustomer);
        // @ts-expect-error
        win.store!.dispatch(customerActions.load());
      });
    });

    customers.goTo(fullName).invoke('css', 'border', '2px solid red');
  });
});
