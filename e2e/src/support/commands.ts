// eslint-disable-next-line @typescript-eslint/no-namespace
import Chainable = Cypress.Chainable;

declare namespace Cypress {
  interface Chainable<Subject> {
    testid(selector: string): Chainable<JQuery<HTMLElement>>;
    openMenu(item: 'Customers' | 'Holidays'): void;
    findByRole(role: string, textMatch: string | RegExp): Chainable<JQuery>;
  }
}

Cypress.Commands.addQuery('testid', (selector: string) => {
  const getFn = cy.now('get', `[data-testid=${selector}]`) as () => Promise<
    Chainable<JQuery>
  >;

  return () => getFn();
});

Cypress.Commands.add('openMenu', (item: 'Customers' | 'Holidays') => {
  cy.findByRole('link', { name: item }).click();
});
