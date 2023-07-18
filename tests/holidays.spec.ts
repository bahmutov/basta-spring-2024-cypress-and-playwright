import { expect, test } from '@playwright/test';

test('should verify holiday card', async ({ page, request }) => {
  await page.goto('');
  const response = await request.get(
    'https://api.eternal-holidays.net/holiday'
  );
  const holidays: unknown[] = await response.json();
  const holidaysCount = holidays.length;

  await page.getByTestId('btn-holidays').click();
  await expect(page.locator('app-holiday-card')).toHaveCount(holidaysCount);
});
