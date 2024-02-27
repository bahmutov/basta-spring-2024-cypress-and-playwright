// https://github.com/bahmutov/cypress-each
import 'cypress-each';
import ViewportPreset = Cypress.ViewportPreset;

describe('init', () => {
  const viewports: ViewportPreset[] = [
    'ipad-2',
    'ipad-mini',
    'iphone-6',
    'samsung-s10',
  ];

  it.each(viewports)(
    `should count the entries in %s`,
    (preset: ViewportPreset) => {
      cy.viewport(preset);
      cy.visit('/');
      cy.testid('btn-customers').click();
      cy.testid('row-customer').should('have.length', 10);
    }
  );
});
