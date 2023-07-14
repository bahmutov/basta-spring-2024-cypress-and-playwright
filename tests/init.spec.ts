import { expect, test as base } from '@playwright/test';
import { sidemenuFixtures, SidemenuFixtures } from './fixtures';

const test = base.extend<SidemenuFixtures>(sidemenuFixtures);
test.describe('init', () => {
  test('rename Latitia to Laetitia', async ({ page, sidemenu }) => {
    await page.goto('');
    const firstname = page.getByLabel('Firstname');
    await sidemenu.open('Customers');
    await page
      .getByLabel(/Latitia/)
      .getByRole('link')
      .click();
    await firstname.fill('Laetitia');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(
      page.locator('data-testid=row-customer', { hasText: 'Latitia' })
    ).toBeVisible();
  });

  test('flakiness', async ({ page }) => {
    await page.goto('');
    await page
      .locator('a')
      .filter({ has: page.locator(':not([href=""])') })
      .filter({ hasText: 'Customers' })
      .click();
  });
});
