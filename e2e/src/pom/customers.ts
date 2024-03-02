import Chainable = Cypress.Chainable;
import { customer } from './customer';
import 'cypress-map';
import { recurse } from 'cypress-recurse';

export class Customers {
  visit() {
    cy.visit('/customer');
    cy.testid('row-customer');
  }

  clickCustomer(customer: string) {
    this.goTo(customer);

    cy.contains('[data-testid=row-customer]', customer)
      .find('[data-testid=btn-edit]')
      .click();
  }

  open() {
    cy.testid('btn-customers').click();
  }

  add() {
    cy.testid('btn-customers-add').click();
  }

  delete() {
    cy.log('**deleting the customer**');
    cy.on(
      'window:confirm',
      cy
        .stub()
        .returns(true)
        // @ts-expect-error
        .as('confirm')
    );
    cy.contains('button', 'Delete').click();
    cy.get('@confirm').should('have.been.calledOnceWith', 'Really delete?');
    cy.location('pathname').should('eq', '/customer');
  }

  submitForm(
    firstname: string,
    name: string,
    country: string,
    birthdate: Date
  ) {
    customer.setFirstname(firstname);
    customer.setName(name);
    customer.setCountry(country);
    customer.setBirthday(birthdate);
    customer.submit();
  }

  goTo(customer: string) {
    this.verifyCustomer(customer);
  }

  goToEnd() {
    const fn = (hasNextPage: boolean) => {
      if (hasNextPage) {
        this.nextPage().then(fn);
      }
    };
    this.nextPage().then(fn);
  }

  verifyCustomerDoesNotExist(customer: string) {
    recurse(
      () => {
        cy.testid('row-customer');
        cy.testid('row-customer', customer).should('not.exist');
        return cy.testid('btn-customers-next').invoke('prop', 'disabled');
      },
      Cypress._.identity,
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

  verifyCustomer(customer: string) {
    return recurse(
      () => {
        cy.testid('row-customer');
        return cy.testid('row-customer', customer).should(Cypress._.noop);
      },
      ($el) => $el.length > 0,
      {
        log: 'Found the customer element',
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

  private nextPage(): Chainable<boolean> {
    cy.testid('btn-customers-next').as('button');
    cy.get('[data-testid=row-customer]:first() p.name').as('firstCustomerName');

    return cy.get('@button').then(($button) => {
      const isDisabled = $button.prop('disabled');
      if (!isDisabled) {
        return cy.get('@firstCustomerName').then((firstName) => {
          const name = firstName.text();
          cy.get('@button').click();
          cy.get('@firstCustomerName').should('not.contain', name);
          return cy.wrap(true);
        });
      } else {
        return cy.wrap(false);
      }
    });
  }
}

export const customers = new Customers();
