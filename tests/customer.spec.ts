import { test, expect } from '@playwright/test';

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
