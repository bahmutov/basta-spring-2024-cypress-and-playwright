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
