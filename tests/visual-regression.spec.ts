import { expect, test } from '@playwright/test';

test('playwright check', async ({ page }) => {
  await page.goto(
    'http://localhost:4400/iframe.html?id=eternal-holiday-card--default&viewMode=story'
  );
  await expect(page).toHaveScreenshot('holiday-card.png');
});
