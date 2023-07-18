import { expect, Page } from '@playwright/test';

export class CustomersPage {
  constructor(private page: Page) {}

  async add(): Promise<void> {
    await this.page.getByTestId('btn-add-customer').click();
  }

  async edit(name: string): Promise<void> {
    await this.page
      .locator('data-testid=row-customer', {
        hasText: name,
      })
      .getByTestId('btn-edit')
      .click();
  }

  async assertRowCount(count: number) {
    await expect(this.page.getByTestId('row-customer')).toHaveCount(count);
  }
}
