import { CustomerPage } from '../page-objects/customer-page';
import { CustomersPage } from '../page-objects/customers-page';

export interface CustomersFixtures {
  customersPage: CustomerPage;
  customerPage: CustomerPage;
}

export const customersFixtures = {
  customersPage: async ({ page }, use) => {
    const customersPage = new CustomersPage(page);
    await use(customersPage);
  },
  customerPage: async ({ page }, use) => {
    const customerPage = new CustomerPage(page);
    await use(customerPage);
  },
};
