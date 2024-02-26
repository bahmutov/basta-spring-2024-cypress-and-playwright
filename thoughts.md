init spec

- nothing major, could make it shorter using custom commands
- verify page urls to make the tests solid
  holidays spec
- verify page urls
- you don't see the number fetched at all
- first refactor

```js
describe('misc', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should count the holidays according to the API', () => {
    cy.request('https://api.eternal-holidays.net/holiday')
      .its('body.length')
      .should('be.greaterThan', 0)
      .then((holidaysCount) => {
        cy.openMenu('Holidays');
        cy.location('pathname').should('eq', '/holidays');
        cy.get('app-holiday-card').should('have.length', holidaysCount);
      });
  });
});
```

second refactor

```js
describe('misc', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.request('https://api.eternal-holidays.net/holiday').its('body.length').should('be.greaterThan', 0).as('holidaysCount');
  });

  it('should count the holidays according to the API', function () {
    cy.openMenu('Holidays');
    cy.location('pathname').should('eq', '/holidays');
    cy.get('app-holiday-card').should('have.length', this['holidaysCount']);
  });
});
```

customers spec

- use https://github.com/bahmutov/cypress-each
- for test "should add a new custome" and POM. I really don't like tiny POM methods for entering each field. Just have a single `Customer.enter(...)` method
- the final "enter customer and delete and check"
  - use https://github.com/bahmutov/cypress-recurse
  - read https://glebbahmutov.com/blog/cypress-pagination-challenge/ on how to solve it
    refactor the POM methods, first checking if the element exists, then that it does not

```js
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
            cy.wrap($next).click();
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
```

test with name `Paul Sullivan` that is on the last page

```js
customers.clickCustomer('Paul Sullivan');
```

Refactor the query `testid`

```js
Cypress.Commands.add('testid', (selector: string) => {
  return cy.get(`[data-testid=${selector}]`);
});
```

- checking if the elements are NOT there is tricky. Show how our initial implementation suffers from checking _before_ the list is rendered!!!
- then show how the page is still showing the old list, even if the page number has changed. We can check if the first element has different text

```js
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
```

The final test

```js
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
```
