import { Page } from '@playwright/test';

interface CustomerData {
  firstname?: string;
  lastname?: string;
  birthday?: Date;
  country?: string;
}

export class CustomerPage {
  constructor(private page: Page) {}

  async fillIn(customerData: CustomerData) {
    if (customerData.firstname !== undefined) {
      await this.page.getByTestId('inp-firstname').fill(customerData.firstname);
    }

    if (customerData.lastname !== undefined) {
      await this.page.getByTestId('inp-name').fill(customerData.lastname);
    }

    if (customerData.birthday !== undefined) {
      const day = customerData.birthday.getDate();
      const month = customerData.birthday.getMonth() + 1;
      const year = customerData.birthday.getFullYear();
      await this.page
        .getByTestId('inp-birthdate')
        .fill(`${day}.${month}.${year}`);
    }

    if (customerData.country !== undefined) {
      await this.page.getByTestId('sel-country').click();
      await this.page
        .locator('[data-testid=opt-country] >> text=Greece')
        .click();
    }
  }

  async submit() {
    await this.page.getByTestId('btn-submit').click();
  }

  async remove() {
    await this.page.getByTestId('btn-delete').click();
  }
}
