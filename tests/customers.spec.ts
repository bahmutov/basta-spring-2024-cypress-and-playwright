import { test, expect } from '@playwright/test';

test.describe('customers', () => {
  test.beforeEach(async ({ page }) => {
    page.goto('');
  });

  test.describe('Viewports', () => {
    for (const viewport of [
      { width: 820, height: 1180 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 412, height: 915 },
    ]) {
      test.use({ viewport });
      test(`should count the entries with viewport of ${viewport.width}x${viewport.height}`, async ({
        page,
      }) => {
        await page.getByTestId('btn-customers').click();
        await expect(page.getByTestId('row-customer')).toHaveCount(10);
      });
    }
  });

  test('rename Latitia to Laetitia', async ({ page }) => {
    await page.goto('');
    await page.getByTestId('btn-customers').click();
    await page
      .locator('data-testid=row-customer', { hasText: 'Latitia' })
      .getByTestId('btn-edit')
      .click();

    await page.getByTestId('inp-firstname').fill('Laetitia');
    await page.getByTestId('btn-submit').click();

    await expect(
      page.locator('data-testid=row-customer', { hasText: 'Laetitia' })
    ).toBeVisible();
  });

  it('should add a new customer', () => {
    sidemenu.open('Customers');
    cy.testid('btn-customers-add').click();
    customer.setFirstname('Tom');
    customer.setName('Lincoln');
    customer.setCountry('USA');
    customer.setBirthday(new Date(1995, 9, 12));
    customer.submit();
    cy.testid('btn-customers-next').click();

    cy.testid('row-customer').should('contain.text', 'Tom Lincoln');
  });
});
