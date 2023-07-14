import { Page } from '@playwright/test';

export class Sidemenu {
  constructor(private page: Page) {}

  async open(item: 'Customers' | 'Holidays') {
    await this.page.getByRole('link', { name: item }).click();
  }
}
