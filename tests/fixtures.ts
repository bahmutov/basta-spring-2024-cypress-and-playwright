import { Sidemenu } from './sidemenu';

export interface SidemenuFixtures {
  sidemenu: Sidemenu;
}

export const sidemenuFixtures = {
  sidemenu: async ({ page }, use) => {
    await use(new Sidemenu(page));
  },
};
