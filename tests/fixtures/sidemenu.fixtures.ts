import { SidemenuPage } from '../page-objects/sidemenu-page';

export interface SidemenuFixtures {
  sidemenuPage: SidemenuPage;
}

export const sidemenuFixtures = {
  sidemenuPage: async ({ page }, use) => {
    const sidemenuPage = new SidemenuPage(page);
    await use(sidemenuPage);
  },
};
