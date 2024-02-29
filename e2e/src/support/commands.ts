// eslint-disable-next-line @typescript-eslint/no-namespace
import Chainable = Cypress.Chainable;

declare namespace Cypress {
  interface Chainable<Subject> {
    testid(selector: string, text?: string): Chainable<JQuery<HTMLElement>>;
    openMenu(item: 'Customers' | 'Holidays'): void;
    findByRole(role: string, textMatch: string | RegExp): Chainable<JQuery>;
  }
}

Cypress.Commands.add('testid', (selector: string, text?: string) => {
  if (text) {
    return cy.contains(`[data-testid=${selector}]`, text);
  } else {
    return cy.get(`[data-testid=${selector}]`);
  }
});

Cypress.Commands.add('openMenu', (item: 'Customers' | 'Holidays') => {
  cy.findByRole('link', { name: item }).click();
});
