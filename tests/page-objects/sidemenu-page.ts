import { Page } from '@playwright/test';

export class SidemenuPage {
  constructor(private page: Page) {}

  async select(menu: 'customers' | 'holidays') {
    await this.page.getByTestId(`btn-${menu}`).click();
  }
}
