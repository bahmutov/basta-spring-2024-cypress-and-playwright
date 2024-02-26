import Chainable = Cypress.Chainable;
import { customer } from './customer';

export class Customers {
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
    cy.get('button').contains('Delete').click();
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
    function checkPage(): void {
      cy.contains('[data-testid=row-customer] p.name', customer).should(
        'not.exist'
      );
      cy.testid('btn-customers-next')
        .should(Cypress._.noop)
        .then(($next) => {
          const isDisabled = $next.prop('disabled');
          if (isDisabled) {
            cy.log('All pages checked');
          } else {
            // confirm the page _loads_ new data
            // to make sure the click has finished
            cy.testid('row-customer')
              .first()
              .find('p.name')
              .invoke('text')
              .invoke('trim')
              .then((firstName) => {
                cy.wrap($next).click();
                cy.testid('row-customer')
                  .first()
                  .should('not.include.text', firstName);
              });
            checkPage();
          }
        });
    }
    return checkPage();
  }

  verifyCustomer(customer: string) {
    function findMaybe(): void {
      cy.contains('[data-testid=row-customer] p.name', customer)
        .should(Cypress._.noop)
        .then(($el) => {
          if ($el.length) {
            cy.wrap($el);
          } else {
            cy.log('**going to the next page**');
            cy.testid('btn-customers-next').click().then(findMaybe);
          }
        });
    }
    findMaybe();
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
